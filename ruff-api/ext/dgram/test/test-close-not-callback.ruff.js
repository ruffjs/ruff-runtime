'use strict';
var assert = require('assert');
var dgram = require('../');

exports['test should not callback close argument when it is not function'] = function() {
    var buf = new Buffer(1024);
    buf.fill(42);

    var socket = dgram.createSocket();
    var closeEvents = 0;
    socket.send(buf, 0, buf.length, 7914, '127.0.0.1');

    // if close callback is not function, ignore the argument.
    socket.close('bad argument');

    socket.on('close', function() {
        ++closeEvents;
    });

    process.on('exit', function() {
        assert.equal(closeEvents, 1);
    });
}