'use strict';
var assert = require('assert');
var net = require('../src/index.js');

exports['test dns lookup'] = function() {
    require('../../dns/test/utils').doTest(function () {
        var connectTimerObject, hostname = 'ruff.io';

        var client = net.connect({
            host: hostname, port: 80, family: 4
        }, function() {
            clearTimeout(connectTimerObject);
            assert.ok(true);
            client.end();
        });

        connectTimerObject = setTimeout(function () {
            throw Error('cannot connect to \"' + hostname + '\"');
        }, 10 * 1000);
    });
};
