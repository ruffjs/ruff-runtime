var timer = require('./timer.js');

var Timer = timer.Timer;
var TIMEOUT_MAX = timer.TIMEOUT_MAX;
var _getCallback = timer._getCallback;
var _toArrayArgs = timer._toArrayArgs;
var _stopTimer   = timer._stopTimer;

function setInterval(callback, repeat) {
    repeat *= 1; // coalesce to number or NaN

    if (!repeat || repeat < 1 || repeat > TIMEOUT_MAX) {
        repeat = 1; // schedule on next tick, follows browser behaviour
    }

    var ontimeout = _getCallback(callback, _toArrayArgs(arguments).slice(2));
    var timer = new Timer();
    timer.start(ontimeout, repeat, repeat);
    return timer;
}

function clearInterval(timer) {
    _stopTimer(timer);
}

exports.setInterval = setInterval;
exports.clearInterval = clearInterval;
