'use strict';
var common = require('./common.js');
var http = require('../src/index.js');
var assert = require('assert');

http.createServer(function(req, res) {
  res.end('ok\n');
  this.close();
}).listen(common.PORT, test);

function test() {
  http.request({
    port: common.PORT,
    encoding: 'utf8'
  }, function(res) {
    res.pipe();
  }).end();
}
