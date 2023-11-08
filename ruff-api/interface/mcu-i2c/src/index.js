'use strict';

var driver = require('ruff-driver');
var util = require('util');

function SysI2cInterface(bus, options) {
    this._bus = bus;
    this._address = options.address;
    this._handle = ruff.i2c.open(this._bus, this._address);
}

/**
 * @param {number} command
 * @param {Function} callback
 */
SysI2cInterface.prototype.readByte = function (command, callback) {
    if (command === undefined) {
        command = -1;
    }

    if (typeof command !== 'number') {
        throw new TypeError('Argument `command` should be a number');
    }

    util.assertCallback(callback);
    var value = ruff.i2c.read(this._handle, command, ruff.i2c.I2C_SMBUS_BYTE_DATA);
    util.invokeCallbackAsync(callback, undefined, value);
};

/**
 * @param {number} command
 * @param {Function} callback
 */
SysI2cInterface.prototype.readWord = function (command, callback) {
    if (command === undefined) {
        command = -1;
    }

    if (typeof command !== 'number') {
        throw new TypeError('Argument `command` should be a number');
    }

    util.assertCallback(callback);
    var value = ruff.i2c.read(this._handle, command, ruff.i2c.I2C_SMBUS_WORD_DATA);
    util.invokeCallbackAsync(callback, undefined, value);
};

/**
 * @param {number} command
 * @param {number} length
 * @param {Function} callback
 */
SysI2cInterface.prototype.readBytes = function (command, length, callback) {
    if (command === undefined) {
        command = -1;
    }

    if (typeof command !== 'number') {
        throw new TypeError('Argument `command` should be a number');
    }

    if (length > 512 || length <= 0) {
        throw new RangeError('Argument `length` should be greater than 0 and less than or equal to 512');
    }

    util.assertCallback(callback);
    var value = ruff.i2c.read(this._handle, command, ruff.i2c.I2C_SMBUS_BLOCK_DATA, length);
    util.invokeCallbackAsync(callback, undefined, value);
};

/**
 * @param {number} command
 * @param {number} value
 * @param {Function} [callback]
 */
SysI2cInterface.prototype.writeByte = function (command, value, callback) {
    if (command === undefined) {
        command = -1;
    }

    if (typeof command !== 'number') {
        throw new TypeError('Argument `command` should be a number');
    }

    if (command === -1) {
        ruff.i2c.write(this._handle, value, ruff.i2c.I2C_SMBUS_BYTE);
    } else {
        ruff.i2c.write(this._handle, command, ruff.i2c.I2C_SMBUS_BYTE_DATA, value);
    }

    util.invokeCallbackAsync(callback);
};

/**
 * @param {number} command
 * @param {number} value
 * @param {Function} [callback]
 */
SysI2cInterface.prototype.writeWord = function (command, value, callback) {
    if (command === undefined) {
        command = -1;
    }

    if (typeof command !== 'number') {
        throw new TypeError('Argument `command` should be a number');
    }

    ruff.i2c.write(this._handle, command, ruff.i2c.I2C_SMBUS_WORD_DATA, value);
    util.invokeCallbackAsync(callback);
};

/**
 * @param {number} command
 * @param {number[]} values
 * @param {Function} [callback]
 */
SysI2cInterface.prototype.writeBytes = function (command, values, callback) {
    if (command === undefined) {
        command = -1;
    }

    if (typeof command !== 'number') {
        throw new TypeError('Argument `command` should be a number');
    }

    ruff.i2c.write(this._handle, command, ruff.i2c.I2C_SMBUS_BLOCK_DATA, values);
    util.invokeCallbackAsync(callback);
};

/**
 * @param {Function} [callback]
 */
SysI2cInterface.prototype.close = function (callback) {
    ruff.i2c.close(this._handle);
    util.invokeCallbackAsync(callback);
};

module.exports = driver({
    attach: function (inputs) {
        this._bus = inputs['bus'].bus;
        this._interfaceMap = Object.create(null);
    },
    detach: function () {
        var interfaceMap = this._interfaceMap;

        for (var address in interfaceMap) {
            var i2cInterface = interfaceMap[address];
            i2cInterface.close();
        }

        this._interfaceMap = undefined;
    },
    getInterface: function (name, options) {
        if (name !== 'i2c') {
            throw new Error('Interface name is expected to be "i2c"');
        }

        var address = options.address;

        if (typeof address !== 'number') {
            throw new TypeError('Option `address` is expected to be a number');
        }

        var interfaceMap = this._interfaceMap;

        if (!(address in interfaceMap)) {
            interfaceMap[address] = new SysI2cInterface(this._bus, options);
        }

        return interfaceMap[address];
    }
});
