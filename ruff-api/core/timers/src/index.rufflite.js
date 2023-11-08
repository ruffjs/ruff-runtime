/* globals uv: false */

'use strict';
var timer = require('./timer.js');
var interval = require('./interval.js');

var Timer = timer.Timer;
var _getCallback = timer._getCallback;
var _toArrayArgs = timer._toArrayArgs;
var _closeAfterCallback = timer._closeAfterCallback;
var _stopTimer = timer._stopTimer;

function setImmediate(callback) {
    var ontimeout = _getCallback(callback, _toArrayArgs(arguments).slice(1));
    var timer = new Timer();
    timer.start(_closeAfterCallback(timer, ontimeout), 1, 0);
    return timer;
}

function clearImmediate(timer) {
    _stopTimer(timer);
}

exports.setTimeout = timer.setTimeout;
exports.clearTimeout = timer.clearTimeout;
exports.setInterval = interval.setInterval;
exports.clearInterval = interval.clearInterval;
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;
