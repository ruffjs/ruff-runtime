var assert = require('assert');
var timers = require('../src/index.js');

exports['test should not run callback before interval'] = function() {
    var num = 0;
    var int = timers.setInterval(function() {
        num ++;
    }, 100);
    timers.setTimeout(function() {
        timers.clearInterval(int);
        assert.equal(num, 0);
    }, 50);
};

exports['test should run callback at each interval'] = function() {
    var num = 0;
    var int = timers.setInterval(function() {
        num ++;
    }, 30);
    timers.setTimeout(function() {
        timers.clearInterval(int);
        assert.equal(num, 3);
    }, 100);
};

exports['test should run interval with invalid interval'] = function() {
    var TIMEOUT_MAX = 2147483647; // 2^31-1
    var sum = 0;
    var int1 = timers.setInterval(function() { // interval < 0
        sum += 1;
    }, -1);
    var int2 = timers.setInterval(function() { // interval = 0
        sum += 2;
    }, 0);
    var int3 = timers.setInterval(function() { // no interval
        sum += 3;
    });
    var int4 = timers.setInterval(function() { // interval exceeds max value
        sum += 4;
    }, TIMEOUT_MAX + 1);
    timers.setTimeout(function() {
        timers.clearInterval(int1);
        timers.clearInterval(int2);
        timers.clearInterval(int3);
        timers.clearInterval(int4);
        assert.equal(sum, 10);
    }, 1);
};

exports['test should run interval with multiple arguments'] = function() {
    var sum = 0;
    var int = timers.setInterval(function(a, b, c) {
        sum += (a + b + c);
    }, 80, 1, 2, 3);
    timers.setTimeout(function() {
        timers.clearInterval(int);
        assert.equal(sum, 6);
    }, 100);
};

exports['test should run with multiple intervals'] = function() {
    var sum = 0;
    var int1 = timers.setInterval(function() {
        sum += 1;
    }, 80);
    var int2 = timers.setInterval(function() {
        sum += 2;
    }, 80);
    timers.setTimeout(function() {
        timers.clearInterval(int1);
        timers.clearInterval(int2);
        assert.equal(sum, 3);
    }, 100);
};

exports['test should remove partial intervals'] = function() {
    var sum = 0;
    var imm1 = timers.setInterval(function() {
        sum += 1;
    }, 80);
    var imm2 = timers.setInterval(function() {
        sum += 2;
    }, 80);
    var imm3 = timers.setInterval(function() {
        sum += 3;
    }, 80);
    timers.clearInterval(imm2);
    timers.clearInterval(imm3);
    timers.setTimeout(function() {
        timers.clearInterval(imm1);
        assert.equal(sum, 1);
    }, 100);
};

exports['test should remove all intervals'] = function() {
    var sum = 0;
    var imm1 = timers.setInterval(function() {
        sum += 1;
    }, 80);
    var imm2 = timers.setInterval(function() {
        sum += 2;
    }, 80);
    var imm3 = timers.setInterval(function() {
        sum += 3;
    }, 80);
    timers.clearInterval(imm1);
    timers.clearInterval(imm2);
    timers.clearInterval(imm3);
    timers.setTimeout(function() {
        assert.equal(sum, 0);
    }, 100);
};

exports['test should be robust if feeding misc to clearInterval'] = function() {
    timers.clearInterval(null);
    timers.clearInterval(undefined);
    timers.clearInterval('string');
};

require('test').run(exports);
