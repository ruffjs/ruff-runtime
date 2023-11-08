'use strict';
var net = require('../src/index.js');
var assert = require('assert');

exports['test shoud throw better error when connect error'] = function () {
    var haveCalled = false;
    var c        = net.createConnection(7914, '0.2.3.4');

    c.on('connect', function () {
        throw new Error();
    });

    c.on('error', function (e) {
        haveCalled = true;
        assert.equal(e.port, 7914);
        assert.equal(e.address, '0.2.3.4');
    });

    process.on('exit', function () {
        assert(haveCalled);
    });
};