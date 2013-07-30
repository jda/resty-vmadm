#!/usr/node/bin/node --abort_on_uncaught_exception

// System-provided packages
var async = require('/usr/node/node_modules/async');
var fs = require('fs');
var fwLog = require('/usr/fw/lib/util/log');
var VM = require('/usr/vm/node_modules/VM');
var nopt = require('/usr/vm/node_modules/nopt');
var onlyif = require('/usr/node/node_modules/onlyif');
var panic = require('/usr/node/node_modules/panic');
var sprintf = require('/usr/node/node_modules/sprintf').sprintf;
var tty = require('tty');
var util = require('util');

// Bundled packages
var restify = require('/opt/resty-vmadm/node_modules/restify');

// Load config
var cfg_file = '/opt/resty-vmadm/etc/resty-vmadm.json';
var cfg_data = fs.readFileSync(cfg_file, 'utf8');
var cfg = JSON.parse(cfg_data);
console.log(cfg);

var restify_cfg = {
	name: 'resty-vmadm'
}

// prep ssl stuff
if ("ssl_cert" in cfg && "ssl_key" in cfg) {
	if (cfg.ssl_cert != "" && cfg.ssl_key != "") {
		restify_cfg.ssl_cert = cfg.ssl_cert;
		restify_cfg.ssl_key = cfg.ssl_key;
	}
}

// sort out port for server
if ("port" in cfg) {} else {
	cfg.port = 8080
}

// list of zones (just uuid)
function lookup(req, res, next) {
	VM.lookup({}, 
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}		
		}
	);
}

// kvm info by uuid
function info(req, res, next) {
	VM.info(req.params.uuid, VM.INFO_TYPES,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				if ("subset" in req.params) {
					if (req.params.subset in vmobjs) {
						res.send(vmobjs[req.params.subset]);
					} else {
						res.status(404);
						res.send("Subset " + req.params.subset + " not found");	
					}
				} else {	
					res.send(vmobjs);
				}	
			}
		}
	);
}

// settings for zone by uuid
function get(req, res, next) {
	VM.load(req.params.uuid,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}
		}
	);
}

// start zone
function start_vm(req, res, next) {
	VM.start(req.params.uuid,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}
		}
	);
}

// stop zone
function stop_vm(req, res, next) {
	VM.stop(req.params.uuid,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}
		}
	);
}

// delete zone
function delete_vm(req, res, next) {
	VM.delete(req.params.uuid,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}
		}	
	);
}

// create zone
function new_vm(req, res, next) {
	props = {};	
	VM.create(props,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}
		}
	);
}


// Start server
var server = restify.createServer(restify_cfg);
server.use(restify.authorizationParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());

// check if we are using auth
if ("username" in cfg && "password" in cfg) {
	console.log("Requiring authentication");
	
	server.use(function auth(req, res, next) {
		console.log(req.authorization);
		if ("basic" in req.authorization) {
			if (req.authorization.basic.username == cfg.username && 
			    req.authorization.basic.password == cfg.password) {
				return next();
			} else {
				return next(new restify.NotAuthorizedError());
			}
		} else {
			return next(new restify.NotAuthorizedError());
		}
	});
}

server.get('/zones', lookup);
server.get('/zones/:uuid', get);
server.get('/zones/:uuid/info', info);
server.get('/zones/:uuid/info/:subset', info);
server.put('/zones/:uuid/start', start_vm);
server.put('/zones/:uuid/stop', stop_vm);
server.del('/zones/:uuid', delete_vm);
server.post('/zones', new_vm);

server.listen(cfg.port);
