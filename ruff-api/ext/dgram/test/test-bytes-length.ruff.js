'use strict';
var assert = require('assert');
var dgram = require('../');
var mustCall = require('./test-util.js').mustCall;

exports['test should pass buffer length in callback when send message'] = function() {
    var message = new Buffer('Some bytes');
    var client = dgram.createSocket();
    client.send(message, 0, message.length, 41234, '127.0.0.1',
        mustCall(function(err, bytes) {
            assert.strictEqual(bytes, message.length);
            client.close();
        }));
}