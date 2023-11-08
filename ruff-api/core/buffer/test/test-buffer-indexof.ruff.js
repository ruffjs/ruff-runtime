'use strict';
var assert = require('assert');

var Buffer = require('../').Buffer;

var b = Buffer.from('abcdef');
var buf_a = Buffer.from('a');
var buf_bc = Buffer.from('bc');
var buf_f = Buffer.from('f');
var buf_z = Buffer.from('z');
var utf8_s = Buffer.from('南潮', 'utf8');
var buf_empty = Buffer.from('');

assert.equal(b.slice(1).indexOf('b'), 0);
assert.equal(b.indexOf('a'), 0);
assert.equal(b.indexOf(97), 0);
assert.equal(b.indexOf('a', 1), -1);
assert.equal(b.indexOf('a', -1), -1);
assert.equal(b.indexOf('a', -4), -1);
assert.equal(b.indexOf('a', -b.length), 0);
assert.equal(b.indexOf('a', NaN), 0);
assert.equal(b.indexOf('a', -Infinity), 0);
assert.equal(b.indexOf('a', Infinity), -1);
assert.equal(b.indexOf('bc'), 1);
assert.equal(b.indexOf('bc', 2), -1);
assert.equal(b.indexOf('bc', -1), -1);
assert.equal(b.indexOf('bc', -3), -1);
assert.equal(b.indexOf('bc', -5), 1);
assert.equal(b.indexOf('bc', NaN), 1);
assert.equal(b.indexOf('bc', -Infinity), 1);
assert.equal(b.indexOf('bc', Infinity), -1);
assert.equal(b.indexOf('f'), b.length - 1);
assert.equal(b.indexOf('z'), -1);
assert.equal(b.indexOf(buf_a), 0);
assert.equal(b.indexOf(buf_a, 1), -1);
assert.equal(b.indexOf(buf_a, -1), -1);
assert.equal(b.indexOf(buf_a, -4), -1);
assert.equal(b.indexOf(buf_a, -b.length), 0);
assert.equal(b.indexOf(buf_a, NaN), 0);
assert.equal(b.indexOf(buf_a, -Infinity), 0);
assert.equal(b.indexOf(buf_a, Infinity), -1);
assert.equal(b.indexOf(buf_bc), 1);
assert.equal(b.indexOf(buf_bc, 2), -1);
assert.equal(b.indexOf(buf_bc, -1), -1);
assert.equal(b.indexOf(buf_bc, -3), -1);
assert.equal(b.indexOf(buf_bc, -5), 1);
assert.equal(b.indexOf(buf_bc, NaN), 1);
assert.equal(b.indexOf(buf_bc, -Infinity), 1);
assert.equal(b.indexOf(buf_bc, Infinity), -1);
assert.equal(b.indexOf(buf_f), b.length - 1);
assert.equal(b.indexOf(buf_z), -1);

assert.equal(Buffer.from(b.toString('base64'), 'base64')
           .indexOf('ZA==', 0, 'base64'),
                3);

assert.equal(utf8_s.indexOf('南', 'utf8'), 0);
assert.equal(utf8_s.indexOf('潮', 'utf8'), 3);

var buf = Buffer.from('this is a test');
assert.strictEqual(buf.indexOf(0x6973), 2);
assert.strictEqual(buf.indexOf(0xff), -1);
