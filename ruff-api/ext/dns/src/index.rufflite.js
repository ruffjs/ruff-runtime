'use strict';
var dns = require('./dns.js');

exports.lookup = dns.udplookup;
exports.getServers = dns.getServers;
exports.setServers = dns.setServers;

exports.ADDRCONFIG = dns.ADDRCONFIG;
exports.V4MAPPED = dns.V4MAPPED;
