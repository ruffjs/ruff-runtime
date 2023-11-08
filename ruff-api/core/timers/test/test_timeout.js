var assert = require('assert');
var timers = require('../src/index.js');

exports['test should run callback with valid timeout'] = function() {
    var flag = false;
    timers.setTimeout(function() {
        flag = true;
    }, 50);
    timers.setTimeout(function() {
        assert.ok(flag);
    }, 100);
};

exports['test should run callback with invalid timeout'] = function() {
    var TIMEOUT_MAX = 2147483647; // 2^31-1
    var sum = 0;
    timers.setTimeout(function() { // timeout < 0
        sum += 1;
    }, -1);
    timers.setTimeout(function() { // no timeout
        sum += 2;
    });
    timers.setTimeout(function() { // timeout exceeds max value
        sum += 3;
    }, TIMEOUT_MAX + 1);
    timers.setTimeout(function() {
        assert.equal(sum, 6);
    }, 100);
};

exports['test should run multilevel timeouts'] = function() {
    var sum = 0;
    timers.setTimeout(function() {
        sum += 1;
        timers.setTimeout(function() {
            sum += 2;
            timers.setTimeout(function() {
                sum += 3;
            }, 50);
        }, 50);
    }, 50);
    timers.setTimeout(function() {
        assert.equal(sum, 6);
    }, 200);
};

exports['test should run timeout with multiple arguments'] = function() {
    var array;
    timers.setTimeout(function(a, b, c) {
        array = [a, b, c];
    }, 50, 1, 2, 3);
    timers.setTimeout(function() {
        assert.deepEqual(array, [1, 2, 3]);
    }, 100);
};

exports['test should run with multiple timeouts'] = function() {
    var sum = 0;
    timers.setTimeout(function() {
        sum += 1;
    }, 50);
    timers.setTimeout(function() {
        sum += 2;
    }, 50);
    timers.setTimeout(function() {
        assert.equal(sum, 3);
    }, 100);
};

exports['test should remove partial timeouts'] = function() {
    var sum = 0;
    var imm1 = timers.setTimeout(function() {
        sum += 1;
    }, 50);
    var imm2 = timers.setTimeout(function() {
        sum += 2;
    }, 50);
    var imm3 = timers.setTimeout(function() {
        sum += 3;
    }, 50);
    timers.clearTimeout(imm2);
    timers.clearTimeout(imm3);
    timers.setTimeout(function() {
        assert.equal(sum, 1);
    }, 100);
};

exports['test should remove all timeouts'] = function() {
    var sum = 0;
    var imm1 = timers.setTimeout(function() {
        sum += 1;
    }, 50);
    var imm2 = timers.setTimeout(function() {
        sum += 2;
    }, 50);
    var imm3 = timers.setTimeout(function() {
        sum += 3;
    }, 50);
    timers.clearTimeout(imm1);
    timers.clearTimeout(imm2);
    timers.clearTimeout(imm3);
    timers.setTimeout(function() {
        assert.equal(sum, 0);
    }, 100);
};

exports['test should be robust if feeding misc to clearTimeout'] = function() {
    timers.clearTimeout(null);
    timers.clearTimeout(undefined);
    timers.clearTimeout('string');
};

require('test').run(exports);
