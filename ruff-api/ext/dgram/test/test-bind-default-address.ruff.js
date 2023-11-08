'use strict';

var assert = require('assert');
var dgram = require('../');
var mustCall = require('./test-util.js').mustCall;

exports['test should bind default address'] = mustCall(function() {
    dgram.createSocket().bind(7914, function() {
        assert.equal(this.address().port, 7914);
        assert.equal(this.address().address, '0.0.0.0');
        this.close();
    });
});