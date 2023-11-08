'use strict';

var driver = require('ruff-driver');
var nativeQei = ruff.qei;
var util = require('util');

function SysQeiInterface(id, options) {
    if (typeof id !== 'number') {
        throw new TypeError('Argument `id` should be a number');
    }
    this._handle = nativeQei.open(id);
}

SysQeiInterface.prototype.reset = function (callback) {
    nativeQei.reset(this._handle);
    util.invokeCallbackAsync(callback);
};

SysQeiInterface.prototype.getPosition = function (callback) {
    util.assertCallback(callback);

    var position = nativeQei.get_position(this._handle);
    util.invokeCallbackAsync(callback, undefined, position);
};

SysQeiInterface.prototype.getDirection = function (callback) {
    util.assertCallback(callback);

    var direction = nativeQei.get_direction(this._handle);
    util.invokeCallbackAsync(callback, undefined, direction);
};

SysQeiInterface.prototype.getVelocity = function (callback) {
    util.assertCallback(callback);

    var velocity = nativeQei.get_velocity(this._handle);
    util.invokeCallbackAsync(callback, undefined, velocity);
};

SysQeiInterface.prototype.setPPR = function (ppr, callback) {
    if (typeof ppr !== 'number') {
        throw new TypeError('Argument `ppr` should be a number');
    }

    if (ppr <= 0) {
        throw new Error('Argument `ppr` should be greater than 0');
    }

    nativeQei.set_ppr(this._handle, ppr);
    util.invokeCallbackAsync(callback);
};

SysQeiInterface.prototype.close = function (callback) {
    nativeQei.close(this._handle);
    this._handle = null;
};

module.exports = driver({
    attach: function (inputs) {
        this._id = inputs.device.id;
    },
    detach: function (callback) {
        if (this._interface) {
            this._interface.close(callback);
            this._interface = undefined;
        } else {
            callback();
        }
    },
    getInterface: function (name, options) {
        if (name !== 'qei') {
            throw new Error('Interface name is expected to be `qei`');
        }

        if (!this._interface) {
            this._interface = new SysQeiInterface(this._id, options);
        }

        return this._interface;
    }
});
