/* globals uv: false */

'use strict';
var TIMEOUT_MAX = 2147483647; // 2^31-1

function _getCallback(callback, args) {
    return function () {
        callback.apply(null, args);
    };
}

function _closeAfterCallback(timer, callback) {
    return function () {
        callback.call();
        timer.close();
    };
}

function _toArrayArgs(argsJson) {
    var len = argsJson.length;
    var args = new Array(len);
    for (var i = 0; i < len; i++) {
        args[i] = argsJson[i];
    }
    return args;
}

function Timer() {
    this._timer = uv.new_timer(); // jshint ignore:line
}

Timer.prototype.start = function (callback, after, repeat) {
    if (!this._timer) {
        throw new Error('timer has closed!');
    }
    uv.timer_start(this._timer, after, repeat, callback); // jshint ignore:line
};

Timer.prototype.stop = function () {
    if (this._timer) {
        uv.timer_stop(this._timer); // jshint ignore:line
        this.close();
    }
};

Timer.prototype.close = function () {
    if (this._timer) {
        uv.close(this._timer);
        this._timer = null;
    }
};

function _stopTimer(timer) {
	if (timer && timer instanceof Timer) {
		timer.stop();
	}
}

function setTimeout(callback, after) {
	after *= 1; // coalesce to number or NaN

	if (!after || after < 0 || after > TIMEOUT_MAX) {
		after = 0;
	}

	after++; // 0 is conflict with process.nextTick?

	var ontimeout = _getCallback(callback, _toArrayArgs(arguments).slice(2));
	var timer = new Timer();
	timer.start(_closeAfterCallback(timer, ontimeout), after, 0);
	return timer;
}

function clearTimeout(timer) {
	_stopTimer(timer);
}

exports.Timer = Timer;
exports.setTimeout = setTimeout;
exports.clearTimeout = clearTimeout;
exports._getCallback = _getCallback;
exports._closeAfterCallback = _closeAfterCallback;
exports._toArrayArgs = _toArrayArgs;
exports._stopTimer = _stopTimer;
exports.TIMEOUT_MAX = TIMEOUT_MAX;
