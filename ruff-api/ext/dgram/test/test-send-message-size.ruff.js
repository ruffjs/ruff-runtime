'use strict';
var assert = require('assert');
var dgram = require('../');

exports['test should get message size when send callback run'] = function() {
    var callbacks = 0;
    var client, timer, buf, len, offset;
    client = dgram.createSocket();

    buf = new Buffer(256);
    offset = 20;

    len = buf.length - offset;

    client.send(buf, offset, len, 7914, '127.0.0.1', function(err, bytes) {
        assert.notEqual(bytes, buf.length);
        assert.equal(bytes, buf.length - offset);
        clearTimeout(timer);
        client.close();
    });

    timer = setTimeout(function() {
        assert.fail('Timeout');
    }, 2000);
}