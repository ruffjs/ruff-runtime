'use strict';

var driver = require('ruff-driver');
var nativeUART = ruff.uart;
var uart = require('uart');
var util = require('util');
var EventEmitter = require('events');

var Parity = uart.Parity;
var FlowControl = uart.FlowControl;

function SysUartInterface(path, features, options) {
    EventEmitter.call(this);
    this._baudRate = options.baudRate || 57600;
    this._stopBits = options.stopBits || 1;
    this._dataBits = options.dataBits || 8;
    this._parity = Parity[options.parity || 'none'];
    this._flowControl = FlowControl[options.flowControl || 'none'];

    this._fd = nativeUART.open(path);
    this._handle = uv.new_tty(this._fd, 1); // readable

    this._features = features;

    if (this._features.indexOf(uart.Features.rs485) >= 0) {
        if (options.rs485Enable) {
            nativeUART.rs485_config(this._fd,
                                    true,
                                    options.rs485IsMaster,
                                    options.rs485Gpio,
                                    options.rs485GpioPolarity,
                                    options.rs485TxTimeout,
                                    options.rs485RxTimeout);
        }
    }

    nativeUART.setup(
        this._fd,
        this._baudRate,
        this._stopBits,
        this._dataBits,
        this._parity,
        this._flowControl
    );
}

util.inherits(SysUartInterface, EventEmitter);

Object.defineProperties(SysUartInterface.prototype, {
    baudRate: {
        get: function () {
            return this._baudRate;
        }
    },
    stopBits: {
        get: function () {
            return this._stopBits;
        }
    },
    dataBits: {
        get: function () {
            return this._dataBits;
        }
    },
    parity: {
        get: function () {
            return this._parity;
        }
    },
    flowControl: {
        get: function () {
            return this._flowControl;
        }
    }
});

SysUartInterface.prototype.setup = function (options, callback) {
    // update uart options
    this._baudRate = options.baudRate || this._baudRate;
    this._stopBits = options.stopBits !== undefined ? options.stopBits : this._stopBits;
    this._dataBits = options.dataBits || this._dataBits;
    this._parity = options.parity !== undefined ? Parity[options.parity] : this._parity;
    this._flowControl = options.flowControl !== undefined ? FlowControl[options.flowControl] : this._flowControl;

    try {
        nativeUART.setup(
            this._fd,
            options.baudRate || this._baudRate,
            options.stopBits !== undefined ? options.stopBits : this._stopBits,
            options.dataBits || this._dataBits,
            options.parity !== undefined ? Parity[options.parity] : this._parity,
            options.flowControl !== undefined ? FlowControl[options.flowControl] : this._flowControl·
        );
        util.invokeCallbackAsync(callback);
    } catch (error) {
        util.invokeCallbackAsync(callback, error);
    }
};

// inherit from EventEmitter
var EventEmitterOn = SysUartInterface.prototype.on;
SysUartInterface.prototype.on = function (event, callback) {
    if (this.listeners('data').length === 0) {
        var that = this;
        uv.read_start(this._handle, function (error, data) {
            if (error) {
                // should we stop read here ?
                that.emit('error', error);
            } else {
                that.emit('data', Buffer.from(data));
            }
        });
    }

    EventEmitterOn.call(this, event, callback);
};

SysUartInterface.prototype.read = function (callback) {
    uv.read_start(this._handle, function (error, data) {
        callback(error, Buffer.from(data));
    });
};

SysUartInterface.prototype.write = function (data, callback) {
    if (typeof data !== 'Buffer') {
        data = Buffer.from(data);
    }
    if (callback === undefined) {
        callback = function () {};
    }

    /* the third parameter must be callback */
    uv.write(this._handle, data._ruffBuffer, callback);
};

SysUartInterface.prototype.close = function (callback) {
    uv.close(this._handle, callback);
    this._fd = null;
    this._handle = null;
};

module.exports = driver({
    attach: function (inputs, context) {
        this._path = inputs.device.path;
        this._gpio = inputs.gpio && inputs.gpio.name || '';
        this._gpioPolarity = inputs.gpio && inputs.gpio.polarity || true;
        this._features = [];

        var args = context.args || {};
        this._features = args.features || [];
        this._type = args.type || 'uart';
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
        if (name !== this._type) {
            throw new Error('Interface name is expected to be "' + this._type + '"');
        }

        if (this._type === 'rs485') {
            options.rs485Enable = true;
            options.rs485Gpio = this._gpio;
            options.rs485GpioPolarity = this._gpioPolarity;
        }
        if (!this._interface) {
            this._interface = new SysUartInterface(this._path, this._features, options);
        }

        return this._interface;
    },
    exports: {}
});
