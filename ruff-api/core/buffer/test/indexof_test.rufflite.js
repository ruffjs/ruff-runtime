'use strict';

var assert = require('assert');

var b = Buffer.from('abcdef');
var buf_a = Buffer.from('a');
var buf_bc = Buffer.from('bc');
var buf_f = Buffer.from('f');
var buf_z = Buffer.from('z');
var buf_empty = Buffer.from('');

exports['test should fail if not found'] = function () {
    assert.equal(b.indexOf('a'), 0);
		assert.equal(b.indexOf(97), 0);
		assert.equal(b.indexOf('a', 1), -1);
		assert.equal(b.indexOf('a', -1), -1);
		assert.equal(b.indexOf('a', -4), -1);
		assert.equal(b.indexOf('bc', -5), 1);
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
};

require('test').run(exports);
