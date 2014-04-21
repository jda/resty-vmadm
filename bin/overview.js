#!/usr/bin/env node
// shows a overview of hypervisors and VMs

var fs = require('fs');
var path = require('path');
var http = require('http');

// @breck7   https://github.com/breck7
function resolvePath (string) {
  if (string.substr(0,1) === '~')
    string = process.env.HOME + string.substr(1)
  return path.resolve(string)
}

var fields = ['host', 'uuid', 'type', 'ram', 'state', 'alias'];

// SmartOS/CDDL: https://github.com/joyent/smartos-live/blob/master/src/vm/sbin/vmadm.js
var LIST_FIELDS = {
    alias: {header: 'ALIAS', width: 10},
    autoboot: {header: 'AUTOBOOT', width: 8},
    billing_id: {header: 'BILLING_ID', width: 36},
    brand: {header: 'BRAND', width: 14},
    cpu_cap: {header: 'CPU_CAP', width: 7},
    cpu_shares: {header: 'CPU_SHARE', width: 9},
    cpu_type: {header: 'CPU_TYPE', width: 8},
    create_timestamp: {header: 'CREATE_TIMESTAMP', width: 24},
    dns_domain: {header: 'DOMAIN', width: 32},
    do_not_inventory: {header: 'DNI', width: 5},
    firewall_enabled: {header: 'FIREWALL_ENABLED', width: 16},
    hostname: {header: 'HOSTNAME', width: 32},
    image_uuid: {header: 'IMAGE_UUID', width: 36},
    indestructible_delegated: {header: 'INDESTR_DATA', width: 12},
    indestructible_zoneroot: {header: 'INDESTR_ROOT', width: 12},
    ram: {header: 'RAM', width: 7},
    max_locked_memory: {header: 'MAX_LOCKED', width: 10},
    max_lwps: {header: 'MAX_LWP', width: 7},
    max_physical_memory: {header: 'MAX_PHYS', width: 8},
    max_swap: {header: 'MAX_SWAP', width: 8},
    owner_uuid: {header: 'OWNER_UUID', width: 36},
    package_name: {header: 'PACKAGE_NAME', width: 32},
    package_version: {header: 'PACKAGE_VER', width: 11},
    pid: {header: 'PID', width: 6},
    qemu_extra_opts: {header: 'QEMU_EXTRA_OPTS', width: 15},
    quota: {header: 'QUOTA', width: 5},
    zone_state: {header: 'ZONE_STATE', width: 10},
    state: {header: 'STATE', width: 16},
    tmpfs: {header: 'TMPFS', width: 5},
    type: {header: 'TYPE', width: 4},
    uuid: {header: 'UUID', width: 36},
    vcpus: {header: 'VCPUS', width: 5},
    zfs_io_priority: {header: 'IO_PRIORITY', width: 11},
    zpool: {header: 'ZPOOL', width: 12},
    zonename: {header: 'ZONENAME', width: 12},
    zonepath: {header: 'ZONEPATH', width: 40},
    zoneid: {header: 'ZONEID', width: 6},
    host: {header: 'HOST', width: 15}
};

function header(fields) {
	var header = "";
	for (i in fields) {
		fname = fields[i];
		field = LIST_FIELDS[fname];
		header += padString(field.header, field.width) + ' ';

	}
	console.log(header);
}

function padString(str, len) {
	if (str.length === len) {
		return str;
	}

	if (str.length > len) {
		return str.slice(0, len);
	}

	var newstr = str;
	for (var i = len - str.length; i>0; i--) {
		newstr += ' ';
	}
	return newstr;
}

function getZoneInfo(conn, zones) {
	for (i in zones) {
		var zi = {};
		zi.uuid = zones[i];
		zi.host = conn['host'];

		var out = "";
		// format output
		for (i in fields) {
			ename = fields[i];
			field = LIST_FIELDS[ename];
			elem = zi[ename];

			if (elem === undefined) {
				elem = "";
			}

			out += padString(elem, field.width) + ' ';
		}

		console.log(out);
	}
}

function getZones(host) {
	var addrparts = h['name'].split(':');

	var username = config['default_username'];
	if (h['username'] !== undefined) {
		username = h['username'];
	}

	var password = config['default_password'];
	if (h['password'] !== undefined) {
		password = h['password'];
	}

	var options = {
		host: addrparts[0],
		port: addrparts[1],
		path: '/zones',
		method: 'GET',
		auth: username + ':' + password
	}

	http.request(options, function(res) {
		if (res.statusCode !== 200) {
			console.log("Error communicating with " + options['host'] + ": Code " + res.statusCode);
			res.on('data', function (chunk) {});
			return;
		}
		// why options overwritten by the time we get here?
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			var res = JSON.parse(chunk);
			getZoneInfo(options, res['zones']);
		});
	}).end();
}

Troll = require('troll-opt').Troll
opts = (new Troll()).options(function(troll) {
  troll.banner('Get status of SmartOS hypervisor(s) via resty-vmadm');
  troll.opt('config',   'config file', { short: 'c', default: "~/.resty-vmadm-client.json" });
  troll.opt('host',     'resty-vmadm host', { short: 'H', type: 'string' });
  troll.opt('user',	    'username', {short: 'u', type: 'string'});
  troll.opt('password', 'password', {short: 'p', type: 'string'});
});

var fileContents = fs.readFileSync(resolvePath(opts['config']),'utf8'); 
var config = JSON.parse(fileContents); 

// handle config overrides
if (opts['user'] !== undefined) {
	config['default_username'] = opts['user'];
}

if (opts['password'] !== undefined) {
	config['default_password'] = opts['password'];
}

header(fields);

// async fetch urls & print
for (i in config['hosts']) {
	var h = config['hosts'][i];
	getZones(h);
}

