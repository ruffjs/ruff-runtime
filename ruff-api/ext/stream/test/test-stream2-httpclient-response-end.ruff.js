'use strict';
var common = require('../common');
var assert = require('assert');
var http = require('http');
var msg = 'Hello';
var readable_event = false;
var end_event = false;
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(msg);
}).listen(common.PORT, function() {
    http.get({port: common.PORT}, function(res) {
        var data = '';
        res.on('readable', function() {
            readable_event = true;
            data += res.read();
        });
        res.on('end', function() {
            end_event = true;
            assert.strictEqual(msg, data);
            server.close();
        });
    });
});

process.on('exit', function() {
    assert(readable_event);
    assert(end_event);
});

