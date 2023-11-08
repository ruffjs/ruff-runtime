'use strict';
const common = require('./common.js');
const assert = require('assert');
const http = require('../src/index.js');
const Agent = require('../src/_http_agent.js').Agent;

const agent = new Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 5,
  maxFreeSockets: 5
});

const server = http.createServer(function(req, res) {
  if (req.url === '/error') {
    res.destroy();
    return;
  } else if (req.url === '/remote_close') {
    // cache the socket, close it after a short delay
    const socket = res.connection;
    setImmediate(function() {
      socket.end();
    });
  }
  res.end('hello world');
});

function get(path, callback) {
  return http.get({
    host: 'localhost',
    port: common.PORT,
    agent: agent,
    path: path
  }, callback);
}

const name = 'localhost:' + common.PORT + ':';

function checkDataAndSockets(body) {
  assert.equal(body.toString(), 'hello world');
  assert.equal(agent.sockets[name].length, 1);
  assert.equal(agent.freeSockets[name], undefined);
}

function second() {
  // request second, use the same socket
  get('/second', function(res) {
    assert.equal(res.statusCode, 200);
    res.on('data', checkDataAndSockets);
    res.on('end', function() {
      assert.equal(agent.sockets[name].length, 1);
      assert.equal(agent.freeSockets[name], undefined);
      process.nextTick(function() {
        assert.equal(agent.sockets[name], undefined);
        assert.equal(agent.freeSockets[name].length, 1);
        remoteClose();
      });
    });
  });
}

function remoteClose() {
  // mock remote server close the socket
  get('/remote_close', function(res) {
    assert.deepStrictEqual(res.statusCode, 200);
    res.on('data', checkDataAndSockets);
    res.on('end', function() {
      assert.equal(agent.sockets[name].length, 1);
      assert.equal(agent.freeSockets[name], undefined);
      process.nextTick(function() {
        assert.equal(agent.sockets[name], undefined);
        assert.equal(agent.freeSockets[name].length, 1);
        // waitting remote server close the socket
        setTimeout(function() {
          assert.equal(agent.sockets[name], undefined);
          assert.equal(agent.freeSockets[name], undefined,
                       'freeSockets is not empty');
          remoteError();
        }, 200);
      });
    });
  });
}

function remoteError() {
  // remove server will destroy ths socket
  const req = get('/error', function(res) {
    throw new Error('should not call this function');
  });
  req.on('error', function(err) {
    assert.ok(err);
    assert.equal(err.message, 'socket hang up');
    assert.equal(agent.sockets[name].length, 1);
    assert.equal(agent.freeSockets[name], undefined);
    // Wait socket 'close' event emit
    setTimeout(function() {
      assert.equal(agent.sockets[name], undefined);
      assert.equal(agent.freeSockets[name], undefined);
      done();
    }, 1);
  });
}

function done() {
  console.log('http keepalive agent test success.');
  process.exit(0);
}

server.listen(common.PORT, function() {
  // request first, and keep alive
  get('/first', function(res) {
    assert.equal(res.statusCode, 200);
    res.on('data', checkDataAndSockets);
    res.on('end', function() {
      assert.equal(agent.sockets[name].length, 1);
      assert.equal(agent.freeSockets[name], undefined);
      process.nextTick(function() {
        assert.equal(agent.sockets[name], undefined);
        assert.equal(agent.freeSockets[name].length, 1);
        second();
      });
    });
  });
});
