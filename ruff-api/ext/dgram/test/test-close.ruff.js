'use strict';

var assert = require('assert'),
    dgram = require('../');

exports['test should callback when close'] = function() {
    var buf = new Buffer(1024);
    buf.fill(42);

    var socket = dgram.createSocket();
    var handle = socket._handle;
    var closeEvents = 0;
    var closeCallbacks = 0;
    socket.send(buf, 0, buf.length, 7914, '127.0.0.1');
    assert.strictEqual(socket.close(function() {
        ++closeCallbacks;
    }), socket);
    socket.on('close', function() {
        assert.equal(closeCallbacks, 1);
        ++closeEvents;
    });

    process.on('exit', function() {
        assert.equal(closeEvents, 1);
        assert.equal(closeCallbacks, 1);
    });
}