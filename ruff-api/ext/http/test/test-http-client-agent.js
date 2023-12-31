'use strict';

var common = require('./common.js');
var http = require('../src/index.js');
var assert = require('assert');

var name = http.globalAgent.getName({ port: common.PORT });
var max = 3;
var count = 0;

var server = http.Server(function(req, res) {
  if (req.url === '/0') {
    setTimeout(function() {
      res.writeHead(200);
      res.end('Hello, World!');
    }, 100);
  } else {
    res.writeHead(200);
    res.end('Hello, World!');
  }
});
server.listen(common.PORT, function() {
  for (var i = 0; i < max; ++i) {
    request(i);
  }
});

function request(i) {
  var req = http.get({
    port: common.PORT,
    path: '/' + i
  }, function(res) {
    var socket = req.socket;
    socket.on('close', function() {
      ++count;
      if (count < max) {
        assert.equal(http.globalAgent.sockets[name].indexOf(socket), -1);
      } else {
        assert(!http.globalAgent.sockets.hasOwnProperty(name));
        assert(!http.globalAgent.requests.hasOwnProperty(name));
        server.close();
      }
    });
    res.resume();
  });
}

process.on('exit', function() {
  assert.equal(count, max);
});
