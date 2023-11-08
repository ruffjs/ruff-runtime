'use strict';

var util = require('util');

function Console(stdout, stderr) {
	if (!(this instanceof Console)) {
		return new Console(stdout, stderr);
	}
	if (!stdout || typeof stdout.write !== 'function') {
		throw new TypeError('Console expects a writable stream instance');
	}
	if (!stderr) {
		stderr = stdout;
	}

	Object.defineProperties(this, {
		'_stdout': {
			value: stdout,
			writable: true,
			configurable: true
		},
		'_stderr': {
			value: stderr,
			writable: true,
			configurable: true
		},
		'_times': {
			value: Object.create(null),
			writable: true,
			configurable: true
		}
	});

	// bind the prototype functions to this Console instance
	var keys = Object.keys(Console.prototype);
	for (var v = 0; v < keys.length; v++) {
		var k   = keys[v];
		this[k] = this[k].bind(this);
	}
}

function formatBuffer (buf) {
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

Console.prototype.log = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (Buffer.isBuffer(arguments[i])) {
            arguments[i] = formatBuffer(arguments[i]);
        }
    }
    this._stdout.write(util.format.apply(this, arguments));
};

Console.prototype.info = Console.prototype.log;

Console.prototype.warn = function () {
	this._stderr.write(util.format.apply(this, arguments));
};

Console.prototype.error = Console.prototype.warn;

Console.prototype.dir = function (object, options) {
	options               = options || {};
	options.customInspect = options.customInspect || false;
	this._stdout.write(util.inspect(object, options));
};

Console.prototype.time = function (label) {
	this._times[label] = uv.hrtime();
};

Console.prototype.timeEnd = function (label) {
	var time = this._times[label];

    if (!time) {
        throw new Error('No such label: ' + label);
    }

    var duration = uv.hrtime() - time;
    var ms = duration / 1e6;
    this.log('%s: %sms', label, ms.toFixed(3));

    delete this._times[label];
};

Console.prototype.trace = function trace() {
	var err     = new Error();
	err.name    = 'Trace';
	err.message = util.format.apply(this, arguments);
	this.error(err.stack);
};

Console.prototype.assert = function (expression) {
	if (!expression) {
		var arr = Array.prototype.slice.call(arguments, 1);
		require('assert').ok(false, util.format.apply(this, arr));
	}
};

// for now, use print method as the stdout & stderr's write method.
var printStream = {
	write: function (message) {
		print(message); // jshint ignore:line
	}
};

exports.console = new Console(printStream, printStream);
