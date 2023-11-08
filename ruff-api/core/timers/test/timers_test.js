var assert = require('assert');
var timers = require('../src/index.js');

var run = false;

var original_uv_timer_start;
var original_uv_timer_stop;
var original_uv_new_timer;
exports.beforeEach = function() {
    original_uv_timer_start = uv.timer_start;
    uv.timer_start = function(timer, start, loopInterval, callback) {
        timer.callback = callback;
    };

    original_uv_timer_stop = uv.timer_stop;
    uv.timer_stop = function(timer) {
        timer.callback.call(this);
    };

    original_uv_new_timer = uv.new_timer;
    uv.new_timer = function() {
        return {};
    };

    original_uv_close = uv.close;
    uv.close = function() {};
};

exports.afterEach = function() {
    uv.timer_start = original_uv_timer_start;
    uv.timer_stop = original_uv_timer_stop;
    uv.new_timer = original_uv_new_timer;
    uv.close = original_uv_close;
    run = false;
};

exports['test should run nextTick four args'] = function() {
    process.nextTick(function(a, b, c, d) {
        assert.equal(a, 'first');
        assert.equal(b, 'second');
        assert.equal(c, 'third');
        assert.equal(d, 'forth');
    }, 'first', 'second', 'third', 'forth');
};

exports['test should run timeout'] = function() {
    var timeout = timers.setTimeout(function() {
        run = true;
    }, 3000);
    timers.clearTimeout(timeout);
    assert(run);
};

exports['test should run immediate when timeout less 1'] = function() {
    var timeout = timers.setTimeout(function() {
        run = true;
    }, 0);
    timers.clearTimeout(timeout);
    assert(run);
};

exports['test should run interval'] = function() {
    var interval = timers.setInterval(function() {
        run = true;
    }, 500);

    timers.clearInterval(interval);
    assert(run);
};

exports['test should not throw error when stop after clear'] = function() {
    var timeout = timers.setTimeout(function() {
        run = true;
    }, 0);
    timers.clearTimeout(timeout);
    timeout.stop();
};

exports['test should throw error when timer has closed'] = function() {
    var timeout = timers.setTimeout(function() {
        run = true;
    }, 0);
    timers.clearTimeout(timeout);
    assert.throws(function() {
        timeout.start(function() {}, 0, 0);
    }, Error);
};

exports["test should run setTimeout accurately after long time consuming operation"] = function() {
    var start;
    var end;
    var err;

    for (var i = 0; i < 10000000; i++) {}

    start = Date.now();

    setTimeout(function() {
        end = Date.now();
        err = end - start - 200;

        assert(err <= 10);
        assert(err >= -10);
    }, 200);
}

exports.testTimerPriority = require('./test_timer_priority.js');

require('test').run(exports);
