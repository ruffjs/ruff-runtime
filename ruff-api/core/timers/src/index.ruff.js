/* globals uv: false */

'use strict';
var timer = require('./timer.js');
var interval = require('./interval.js');

var _getCallback = timer._getCallback;
var _toArrayArgs = timer._toArrayArgs;

function idleDummy() {
    // Nothing to do
}

function Check() {
    this._idle = uv.idle_init(); // jshint ignore:line
    this._check = uv.check_init(); // jshint ignore:line
}

Check.prototype.start = function (callback) {
    if (!this._check) {
        throw new Error('check has closed!');
    }
    uv.idle_start(this._idle, idleDummy); // jshint ignore:line
    uv.check_start(this._check, callback); // jshint ignore:line
};

Check.prototype.stop = function () {
    if (!this._check) {
        throw new Error('check has closed!');
    }
    uv.idle_stop(this._idle); // jshint ignore:line
    uv.check_stop(this._check); // jshint ignore:line
};

Check.prototype.close = function () {
    if (this._check) {
        uv.close(this._idle);
        uv.close(this._check);
        this._idle = null;
        this._check = null;
    }
};

var immediateQueue = [];
var needImmediateCallback = false;
var check;

function setImmediate(callback) {
    var immediateCallback = _getCallback(callback, _toArrayArgs(arguments).slice(1));
    immediateQueue.push(immediateCallback);
    if (!needImmediateCallback) {
        needImmediateCallback = true;
        if (!check) {
            check = new Check();
        }
        check.start(processImmediate);
    }
    return immediateCallback;
}

function clearImmediate(callback) {
    var index = immediateQueue.indexOf(callback);
    if (index >= 0) {
        immediateQueue.splice(index, 1);
        if (immediateQueue.length === 0) {
            needImmediateCallback = false;
            check.stop();
        }
    }
}

function processImmediate() {
    var immediateCallback;
    while (immediateQueue.length !== 0) {
        immediateCallback = immediateQueue.shift();
        immediateCallback();
    }
    needImmediateCallback = false;
    check.stop();
}

exports.setTimeout = timer.setTimeout;
exports.clearTimeout = timer.clearTimeout;
exports.setInterval = interval.setInterval;
exports.clearInterval = interval.clearInterval;
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;
