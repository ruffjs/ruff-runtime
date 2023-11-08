'use strict';
var common = require('./common.js');
var assert = require('assert');
var http = require('../src/index.js');

assert.throws(function() {
  // Path with spaces in it should throw.
  http.get({ path: 'bad path' }, common.fail);
}, /contains unescaped characters/);
