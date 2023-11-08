'use strict';

var timers = require('timers');
var EventEmitter = require('events');
var path = require('path');

function handleFatal(error) {
    var exiting = false;

    function next(e) {
        var handled;
        try {
            handled = process.emit('uncaughtException', e);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            process.exit(1, 1);
        }

        if (!handled) {
            try {
                // eslint-disable-next-line no-console
                console.error(e);

                if (!exiting) {
                    exiting = true;
                    process.exit(1);
                } else {
                    // by pass emit exit event, for alreay in it
                    process.exit(1, 1);
                }
            } catch (er) {
                // nothing to be done about it at this point.
            }
        }

        try {
            uv.run();
            return undefined;
        } catch (error) {
            return error;
        }
    }

    while (error) {
        error = next(error);
    }
}

function startup(_this, process) {
    exportAsGlobal('console');
    exportAsGlobal('buffer');

    // Prepare global items.

    process._handleFatal = handleFatal;
    Object.defineProperty(global, 'process', {
        value: process,
        writable: false
    });

    global.setTimeout = timers.setTimeout;
    global.clearTimeout = timers.clearTimeout;
    global.setInterval = timers.setInterval;
    global.clearInterval = timers.clearInterval;
    global.setImmediate = timers.setImmediate;
    global.clearImmediate = timers.clearImmediate;

    // Prepare process.

    var kCallback = 0;
    var kArguments = 1;
    var nextTickQueue = [];

    process.umask = uv.umask;

    process.nextTick = function (callback) {
        var narg = arguments.length;
        var args = null;
        if (narg > 1) {
            args = new Array(narg - 1);
            for (var i = 1; i < narg; ++i) {
                args[i - 1] = arguments[i];
            }
        }
        nextTickQueue.push([callback, args]);
    };

    process._tickCallback = function () {
        var tickObject;

        while (tickObject = nextTickQueue.shift()) {
            var callback = tickObject[kCallback];
            var args = tickObject[kArguments];
            callback.apply(null, args);
        }
    };

    Object.setPrototypeOf(process, EventEmitter.prototype);
    EventEmitter.call(process);

    uv.update_loop_time();

    hackProcessSignals(process);

    require(path.resolve(process.argv[1]));
    process._tickCallback();
}

module.exports = startup;

function exportAsGlobal(module, readOnly) {
    if (typeof module === 'string') {
        module = require(module);
    }

    Object
        .keys(module)
        .forEach(function (key) {
            var item = module[key];

            Object.defineProperty(global, key, {
                get: function () {
                    return item;
                }
            });
        });
}

function hackProcessSignals(process) {
    var oldOn = process.on;
    process.on = function (eventName, listener) {
        oldOn.call(process, eventName, listener);

        var signal = ({
            'SIGINT' : 2,
            'SIGQUIT': 3,
            'SIGILL' : 4,
            'SIGABRT': 6,
            'SIGFPE' : 8,
            'SIGKILL': 9,
            'SIGSEGV': 11,
            'SIGPIPE': 13,
            'SIGALRM': 14,
            'SIGTERM': 15
        })[eventName];

        if (signal) {
            var pipeSignal = uv.signal_init();
            uv.signal_start(pipeSignal, signal, function () {
                process.emit(eventName);
            });
            uv.unref(pipeSignal);
        }
    };
}
