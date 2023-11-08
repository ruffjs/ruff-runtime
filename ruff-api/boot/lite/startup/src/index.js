'use strict';
var LOG_ONCE_LEN = 512;
var EventEmitter = require('events');
var util = require('util');

Object.defineProperty(global, 'process', {
    value: process,
    writable: false
});

util.mixin({ prototype: process }, [EventEmitter.prototype]);

process._handleFatal = function (error) {
    var handled;
    try {
        handled = process.emit('uncaughtException', error);
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
    if (!handled) {
        log.error(error);
        process.exit(1);
    }
}

Object.defineProperties(ruff.versions, {
    'app': {
        enumerable: true,
        get: function () {
            var json = require('package.json');
            return json.version;
        }
    }
});

// setup buffer
global.Buffer = require('buffer').Buffer;

// setup timers
var Timers = require('timers');
global.setTimeout = Timers.setTimeout;
global.clearTimeout = Timers.clearTimeout;
global.setInterval = Timers.setInterval;
global.clearInterval = Timers.clearInterval;
global.setImmediate = Timers.setImmediate;
global.clearImmediate = Timers.clearImmediate;

// setup `nextTick`
var kCallback = 0;
var kArguments = 1;
var threshold = 1e4;
var nextTickQueue = [];
process.nextTick = function (callback) {
    var narg = arguments.length;
    var args = null;
    if (narg > 1) {
        args = new Array(narg - 1);
        for (var i = 1; i < narg; ++i) {
            args[i-1] = arguments[i];
        }
    }
    nextTickQueue.push([callback, args]);
};
process._tickCallback = function () {
    for (var i = 0; i < nextTickQueue.length; ++i) {
        // free processed callbacks
        if (i > threshold) {
            nextTickQueue.splice(0, i);
            i = 0;
        }
        var tickObject = nextTickQueue[i];
        var callback = tickObject[kCallback];
        var args = tickObject[kArguments];
        callback.apply(null, args);
    }
    nextTickQueue = [];
};

function formatBuffer(buf) {
    var str = '<Buffer';
    var max = 64;
    var len = buf.length <= max ? buf.length : max;
    for (var i = 0; i < len; ++i) {
        var val = buf.readUInt8(i);
        str += (val >= 16 ? ' ' : ' 0') + val.toString(16);
    }
    if (buf.length > len) {
        str += ' ... ';
    }
    str += '>';
    return str;
}

// rebind console.log
console.log = function () {
    for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        try {
            var ctor = arg.constructor;
            switch (ctor) {
                case Buffer:
                    arguments[i] = formatBuffer(arg);
                    break;
                default:
                    break;
            }
        } catch (_) {
        }
    }
    print.apply(undefined, arguments);
};

// bind log
log.upStartPos = ruff.log.getPosition();
log.erase = ruff.log.erase;
log.dump = ruff.log.dump;
log.setLevel = ruff.log.setLevel;
log.getLength = ruff.log.getLength;
log.getPosition = ruff.log.getPosition;
log.read = function (pos, len) {
    return Buffer.from(ruff.log.read(pos, len));
};
function ruffLogWrite() {
    var str = '';
    var len = arguments.length;

    for (var i = 1; i < len; ++i) {
        var arg = arguments[i];
        try {
            var ctor = arg.constructor;
            switch (ctor) {
                case Buffer:
                    str += formatBuffer(arg);
                    break;
                default:
                    str += arg.toString();
                    break;
            }
        } catch (_) {
        }

        if (i < len - 1) {
            str += ' ';
        }
    }

    var start = 0;
    var logLen = str.length;
    if (logLen < LOG_ONCE_LEN) {
        // likely
        ruff.log.write(arguments[0], str);
    } else {
        // in case of a long long log
        while (logLen > LOG_ONCE_LEN) {
            ruff.log.write(arguments[0], str.substring(start, start + LOG_ONCE_LEN));
            start += LOG_ONCE_LEN;
            logLen -= LOG_ONCE_LEN;
        }
        if (logLen > 0) {
            ruff.log.write(arguments[0], str.substring(start, start + logLen));
        }
    }
}
log.debug = ruffLogWrite.bind(undefined, 4);
log.info = ruffLogWrite.bind(undefined, 3);
log.warn = ruffLogWrite.bind(undefined, 2);
log.error = ruffLogWrite.bind(undefined, 1);

var script = '';
if (process.platform === 'nuttx' || process.platform === 'freertos') {
    script = 'launcher';
} else if (process.argv.length >= 2) {
    script = process.argv[1];
} else {
    log.error('Please specify an entry file!');
}

if (script !== '') {
    try {
        require(script);
    } catch (error) {
        log.error(error);
        process._handleFatal(error);
    }
}

process._tickCallback();

