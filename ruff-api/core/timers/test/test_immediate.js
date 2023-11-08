var assert = require('assert');
var timers = require('../src/index.js');

exports['test should run one immediate'] = function() {
    var flag = false;
    timers.setImmediate(function() {
        flag = true;
    });
    timers.setTimeout(function() {
        assert.ok(flag);
    }, 100);
};

exports['test should run multilevel immediates'] = function() {
    var sum = 0;
    timers.setImmediate(function() {
        sum += 1;
        timers.setImmediate(function() {
            sum += 2;
            timers.setImmediate(function() {
                sum += 3;
            });
        });
    });
    timers.setTimeout(function() {
        assert.equal(sum, 6);
    }, 100);
};

exports['test should run immediate with multiple arguments'] = function() {
    var array;
    timers.setImmediate(function(a, b, c) {
        array = [a, b, c];
    }, 1, 2, 3);
    timers.setTimeout(function() {
        assert.deepEqual(array, [1, 2, 3]);
    }, 100);
};

exports['test should run multiple immediates'] = function() {
    var sum = 0;
    timers.setImmediate(function() {
        sum += 1;
    });
    timers.setImmediate(function() {
        sum += 2;
    });
    timers.setTimeout(function() {
        assert.equal(sum, 3);
    }, 100);
};

exports['test should run immediate before interval'] = function() {
    var sum = 0;
    var flag = false;
    timers.setImmediate(function() {
        flag = !flag;
        assert.ok(flag);
    });
    var int = timers.setInterval(function() {
        flag = !flag;
        timers.clearInterval(int);
    }, 100);
};

exports['test should remove partial immediates'] = function() {
    var sum = 0;
    var imm1 = timers.setImmediate(function() {
        sum += 1;
    });
    var imm2 = timers.setImmediate(function() {
        sum += 2;
    });
    var imm3 = timers.setImmediate(function() {
        sum += 3;
    });
    timers.clearImmediate(imm2);
    timers.clearImmediate(imm3);
    timers.setTimeout(function() {
        assert.equal(sum, 1);
    }, 100);
};

exports['test should remove all immediates'] = function() {
    var sum = 0;
    var imm1 = timers.setImmediate(function() {
        sum += 1;
    });
    var imm2 = timers.setImmediate(function() {
        sum += 2;
    });
    var imm3 = timers.setImmediate(function() {
        sum += 3;
    });
    timers.clearImmediate(imm1);
    timers.clearImmediate(imm2);
    timers.clearImmediate(imm3);
    timers.setTimeout(function() {
        assert.equal(sum, 0);
    }, 100);
};

exports['test should remove itself in immediate callback'] = function() {
    var sum = 0;
    var imm1 = timers.setImmediate(function() {
        timers.clearImmediate(imm1);
        sum += 1;
    });
    timers.setTimeout(function() {
        assert.equal(sum, 1);
    }, 100);
};

exports['test should be robust if feeding misc to clearImmediate'] = function() {
    timers.clearImmediate(null);
    timers.clearImmediate(undefined);
    timers.clearImmediate('string');
};

require('test').run(exports);
