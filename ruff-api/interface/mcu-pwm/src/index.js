'use strict';

var driver = require('ruff-driver');
var nativePwm = ruff.pwm;
var util = require('util');

function SysPwmInterface(channel, options) {
    if (typeof channel !== 'number') {
        throw new TypeError('Argument `channel` should be a number');
    }

    var duty = 0.5;
    if (options.duty !== undefined) {
        if (typeof options.duty !== 'number') {
            throw new TypeError('Argument `duty` should be a number');
        }
        if (options.duty < 0 || options.duty > 1) {
            throw new TypeError('Argument `duty` should be [0, 1]');
        }
        duty = options.duty;
    }

    var frequency = 1000;
    if (options.frequency !== undefined) {
        if (typeof options.frequency !== 'number') {
            throw new TypeError('Argument `frequency` should be a number');
        }
        // check frequency range inside PWM driver
        frequency = options.frequency;
    }

    this._handle = nativePwm.open(channel, duty, frequency);
}

SysPwmInterface.prototype.start = function (callback) {
    nativePwm.close(this._handle);
    this._handle = null;
};

SysPwmInterface.prototype.close = function (callback) {
    nativePwm.close(this._handle);
    this._handle = null;
};

SysPwmInterface.prototype.setDuty = function (duty, callback) {
    if (typeof duty !== 'number') {
        throw new TypeError('Argument `duty` should be a number');
    }

    if (duty > 1 || duty < 0) {
        throw new Error('Argument `duty` should be [0, 1]');
    }

    nativePwm.set_duty(this._handle, duty);
    util.invokeCallbackAsync(callback);
};

SysPwmInterface.prototype.getDuty = function (callback) {
    util.assertCallback(callback);

    var duty = nativePwm.get_duty(this._handle);
    util.invokeCallbackAsync(callback, undefined, duty.toPrecision(2));
};

SysPwmInterface.prototype.setFrequency = function (frequency, callback) {
    if (typeof frequency !== 'number') {
        throw new TypeError('Argument `frequency` should be a number');
    }

    if (frequency <= 0) {
        throw new Error('Argument `frequency` should be greater than 0');
    }

    nativePwm.set_frequency(this._handle, frequency);
    util.invokeCallbackAsync(callback);
};

SysPwmInterface.prototype.getFrequency = function (callback) {
    util.assertCallback(callback);

    var frequency = nativePwm.get_frequency(this._handle);
    util.invokeCallbackAsync(callback, undefined, frequency);
};

SysPwmInterface.prototype.setCount = function (count, callback) {
    if (typeof count !== 'number') {
        throw new TypeError('Argument `count` should be a number');
    }

    if (count < 0) {
        throw new Error('Argument `count` should NOT be less than 0');
    }

    nativePwm.set_count(this._handle, count);
    util.invokeCallbackAsync(callback);
};

SysPwmInterface.prototype.getCount = function (callback) {
    util.assertCallback(callback);

    var count = nativePwm.get_count(this._handle);
    util.invokeCallbackAsync(callback, undefined, count);
};

module.exports = driver({
    attach: function (inputs) {
        this._channel = inputs.device.channel;
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
        if (name !== 'pwm') {
            throw new Error('Interface name is expected to be `pwm`');
        }

        if (!this._interface) {
            this._interface = new SysPwmInterface(this._channel, options);
        }

        return this._interface;
    }
});
