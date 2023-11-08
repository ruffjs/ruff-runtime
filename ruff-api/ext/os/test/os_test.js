var assert = require('assert');
var os = require('../src/index.js');

exports['test should get homedir'] = function() {
    var homedir = os.homedir();
    assert(homedir.length > 0);
}

exports['test should get tmpdir'] = function() {
    var homedir = os.homedir();
    var tmpdir = os.tmpdir();
    assert.equal(tmpdir, homedir + '/tmp');
}

exports['test should get hostname'] = function() {
    var hostname = os.hostname();
    assert(hostname.length > 0);
}

exports['test should get uptime'] = function() {
    var uptime = os.uptime();
    assert(uptime > 0);
}

exports['test should get loadavg'] = function() {
    var loadavg = os.loadavg();
    assert(loadavg.length > 0);
}

exports['test should get totalmem'] = function() {
    var totalmem = os.totalmem();
    assert(totalmem > 0);
}

exports['test should get freemem'] = function() {
    var freemem = os.freemem();
    assert(freemem > 0);
}

exports['test should get cpus'] = function() {
    var cpuInfo = os.cpus();
    assert(cpuInfo.length > 0);
}

exports['test should get networkInterfaces'] = function() {
    var interfaces = os.networkInterfaces();
    assert(interfaces instanceof Object);
}


require('test').run(exports);