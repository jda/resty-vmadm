#!/usr/node/bin/node --abort_on_uncaught_exception

// System-provided packages
var async = require('/usr/node/node_modules/async');
var fs = require('fs');
var fwLog = require('/usr/fw/lib/util/log');
var VM = require('/usr/vm/node_modules/VM');
var system = require('/usr/node/node_modules/system');
var zfs = require('/usr/node/node_modules/zfs');
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
	VM.start(req.params.uuid, {},
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
	VM.stop(req.params.uuid, req.params,
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
	VM.create(req.params,
		function(err, vmobjs) {
			if (err) {
				res.send(err);
			} else {
				res.send(vmobjs);
			}
		}
	);
}

// Given a array of fields and a array of arrays of values
// convert to a array of objects values keyed by name
function flatten_fields(header, data) {
	var res = new Array();

	for (var i=0; i<data.length; i++) {
		var entry = {};
		for (var j=0; j<header.length; j++) {
			entry[header[j]] = data[i][j];
		}
		res.push(entry);
	}

	return res;
}

// List zpools
function list_zpools(req, res, next) {
	zfs.zpool.list(function(err, fields, data) {
		if (err) {
			res.send(err);
		} else {
			res.send(flatten_fields(fields, data));
		}
	});	
}

// Get zpool status
function get_zpool_status(req, res, next) {
	zfs.zpool.status(req.params.pool, function(err, st) {
		res.send(st);		
	});
}

// Get provisionable memory
function get_prov_mem(req, res, next) {
	system.getProvisionableMemory(function(err, mem) {
		if (err) {
			res.send(err);
		} else {
			res.send(mem + ' MiB');
		}	
	});
}

// Start server
var server = restify.createServer(restify_cfg);
server.use(restify.authorizationParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// check if the ui is ineabled
if ("ui" in cfg) {
	if (cfg.ui == "true") {
		console.log("UI Enabled");
		server.get(/\/ui\/?.*/, restify.serveStatic({
			directory: '/opt/resty-vmadm',
			default: 'ui/index.html'
		}));
	}
}

// check if we are using auth
if ("username" in cfg && "password" in cfg) {
	console.log("Requiring authentication");
	
	server.use(function auth(req, res, next) {
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

server.get('/memory', get_prov_mem);
server.get('/storage', list_zpools);
server.get('/storage/:pool', get_zpool_status);
server.get('/zones', lookup);
server.get('/zones/:uuid', get);
server.get('/zones/:uuid/info', info);
server.get('/zones/:uuid/info/:subset', info);
server.put('/zones/:uuid/start', start_vm);
server.put('/zones/:uuid/stop', stop_vm);
server.del('/zones/:uuid', delete_vm);
server.post('/zones', new_vm);

server.listen(cfg.port);
