'use strict';
var Readable = require('../src/readable.js');
var assert = require('assert');

var buf = '';
var euro = new Buffer([0xE2, 0x82, 0xAC]);
var cent = new Buffer([0xC2, 0xA2]);
var source = Buffer.concat([euro, cent]);

var readable = Readable({ encoding: 'utf8' });
readable.push(source.slice(0, 2));
readable.push(source.slice(2, 4));
readable.push(source.slice(4, 6));
readable.push(null);

readable.on('data', function(data) {
    buf += data;
});

process.on('exit', function() {
    assert.strictEqual(buf, '€¢');
});
