'use strict';
var assert = require('assert');
var dgram = require('../');

exports['test should send empty packet'] = function() {
    var callbacks = 0;
    var client;
    var timer;

    client = dgram.createSocket();

    client.bind(7916);

    function callback() {
        callbacks++;
        if (callbacks == 2) {
            clearTimeout(timer);
            client.close();
        } else if (callbacks > 2) {
            assert.fail('the callbacks should be called only two times');
        }
    }

    client.on('message', function(buffer, bytes) {
        callback();
    });

    client.send(new Buffer(1), 0, 0, 7916, '127.0.0.1', function(err, len) {
        callback();
    });

    timer = setTimeout(function() {
        assert.fail('Timeout');
    }, 2000);
}