'use strict';
var common = require('./common.js');
var http = require('../src/index.js');
var assert = require('assert');

var server = http.createServer(function(req, res) {
  res.end('Hello');
});

server.listen(common.PORT, function() {
  var req = http.get({port: common.PORT}, function(res) {
    res.on('data', function(data) {
      req.abort();
      server.close();
    });
  });
});

