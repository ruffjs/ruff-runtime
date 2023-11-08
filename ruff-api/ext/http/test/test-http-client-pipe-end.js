'use strict';
// see https://github.com/joyent/node/issues/3257

var common = require('./common.js');
var http = require('../src/index.js');

var server = http.createServer(function(req, res) {
  req.resume();
  req.once('end', function() {
    res.writeHead(200);
    res.end();
    server.close();
  });
});

// common.refreshTmpDir();
common.PIPE = "./test.sock";

server.listen(common.PIPE, function() {
  var req = http.request({
    socketPath: common.PIPE,
    headers: {'Content-Length': '1'},
    method: 'POST',
    path: '/'
  });

  req.write('.');

  sched(function() { req.end(); }, 5);
});

// schedule a callback after `ticks` event loop ticks
function sched(cb, ticks) {
  function fn() {
    if (--ticks)
      setImmediate(fn);
    else
      cb();
  }
  setImmediate(fn);
}
