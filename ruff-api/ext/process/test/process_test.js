var assert = require('assert');

if (process.platform != 'win32') {
    exports['test should get default umask'] = function() {
        assert.equal(18, process.umask());
    };

    exports['test should get old umask'] = function() {
        process.umask(parseInt(0666));
        assert.equal(parseInt(0666), process.umask());
    };
}

exports['test should trigger exit event and code should be 0'] = function() {
    var callTimes = 0;

    process.on('exit', function(code) {
        callTimes++;
    });
    process.on('exit', function(code) {
        assert.equal(code, 0);
        assert.equal(callTimes, 1);
    });
};

exports['test should happen before setTimeout'] = function() {
    var hit = false;
    setTimeout(function () {
        assert.ok(hit);
    }, 0);
    process.nextTick(function () {
        hit = true;
    });
};

exports['test should happen before setImmediate'] = function() {
    var hit = false;
    setImmediate(function () {
        assert.ok(hit);
    });
    process.nextTick(function () {
        hit = true;
    });
};

exports['test should throw'] = function() {
    process.nextTick(function() {
        process.nextTick(function() {
            process.nextTick(function() {
                process.nextTick(function() {
                    assert.throws(function () {
                        undefined_reference_error_maker;
                    });
                });
            });
        });
    });
};

// TODO: monitor memory usage
exports['test should not oom'] = function() {
    var complete = 0;
    (function runner() {
        if (1e5 > ++complete) {
            process.nextTick(runner);
        } else {
            assert.ok(true, '1e5 next ticks completed');
        }
    }());
};

if (process.platform != 'win32') {
    exports['test should tigger spawn callback '] = function() {
        var code = false;
        uv.spawn('ls', ['/'], function(exit_status, signal_num) {
            code = exit_status;
        });

        process.on('exit', function() {
            assert.equal(code, 0);
        });
    };
}

if (process.platform != 'win32') {
    exports['test should tigger signal callback '] = function() {
        var getSignal = false;
        var handle = uv.signal_init();

        uv.signal_start(handle, 2, function(signalNum) {
            assert.equal(signalNum, 2);
            getSignal = true;
            uv.close(handle);
        });

        uv.kill(uv.getpid(), 2);
        process.on('exit', function() {
            assert.equal(getSignal, true);
        });
    };
}


require('test').run(exports);
