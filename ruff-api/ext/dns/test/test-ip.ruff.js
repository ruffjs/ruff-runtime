var assert = require('assert');
var path = require('path');
var test = require('test');

var ip = require('../src/ip');

module.exports = {
    'test should convert to buffer IPv4 address': function () {
        var buf = ip.toBuffer('127.0.0.1');
        assert.equal(buf.toString('hex'), '7f000001');
        assert.equal(ip.toString(buf), '127.0.0.1');
    },
    'test should convert to buffer IPv4 address in-place': function () {
        var buf = new Buffer(128);
        var offset = 64;
        ip.toBuffer('127.0.0.1', buf, offset);
        assert.equal(buf.toString('hex', offset, offset + 4), '7f000001');
        assert.equal(ip.toString(buf, offset, 4), '127.0.0.1');
    },
    'test should convert to buffer IPv6 address': function() {
      var buf = ip.toBuffer('::1');
      assert(/(00){15,15}01/.test(buf.toString('hex')));
      assert.equal(ip.toString(buf), '::1');
      assert.equal(ip.toString(ip.toBuffer('1::')), '1::');
      assert.equal(ip.toString(ip.toBuffer('abcd::dcba')), 'abcd::dcba');
    },
    'test should convert to buffer IPv6 address in-place': function() {
      var buf = new Buffer(128);
      var offset = 64;
      ip.toBuffer('::1', buf, offset);
      assert(/(00){15,15}01/.test(buf.toString('hex', offset, offset + 16)));
      assert.equal(ip.toString(buf, offset, 16), '::1');
      assert.equal(ip.toString(ip.toBuffer('1::', buf, offset),
                               offset, 16), '1::');
      assert.equal(ip.toString(ip.toBuffer('abcd::dcba', buf, offset),
                               offset, 16), 'abcd::dcba');
    },
    'test should convert to buffer IPv6 mapped IPv4 address': function() {
      var buf = ip.toBuffer('::ffff:127.0.0.1');
      assert.equal(buf.toString('hex'), '00000000000000000000ffff7f000001');
      assert.equal(ip.toString(buf), '::ffff:7f00:1');

      buf = ip.toBuffer('ffff::127.0.0.1');
      assert.equal(buf.toString('hex'), 'ffff000000000000000000007f000001');
      assert.equal(ip.toString(buf), 'ffff::7f00:1');

      buf = ip.toBuffer('0:0:0:0:0:ffff:127.0.0.1');
      assert.equal(buf.toString('hex'), '00000000000000000000ffff7f000001');
      assert.equal(ip.toString(buf), '::ffff:7f00:1');
    }
};

test.run(module.exports);