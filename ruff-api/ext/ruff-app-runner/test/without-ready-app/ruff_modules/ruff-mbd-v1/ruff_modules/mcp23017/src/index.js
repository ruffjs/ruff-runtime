'use strict';
var driver = require('ruff-driver');
var Gpio = require('gpio');
var outputsKey =
    [
        'gpio0', 'gpio1', 'gpio2',  'gpio3',  'gpio4',  'gpio5',  'gpio6',  'gpio7',
        'gpio8', 'gpio9', 'gpio10', 'gpio11', 'gpio12', 'gpio13', 'gpio14', 'gpio15'
    ];

var McpGpio = function(inputs, adapter, pin) {
    this._pin     = pin;
    this._adapter = adapter;
    var dirStr    = inputs.getOptional('direction', 'in');

    this._direction = Gpio.toDirection(dirStr);
    if (this._direction === Gpio.IN) {
        this._adapter.setGpioInput(this._pin);
    } else {
        this._adapter.setGpioOutput(this._pin);
    }
};

McpGpio.prototype.setDirection = function(direction) {
    if (direction === Gpio.IN) {
        this._adapter.setGpioInput(this._pin);
    } else {
        this._adapter.setGpioOutput(this._pin);
    }
};

McpGpio.prototype.setEdge = function(edge) { // jshint ignore:line
    //todo: implement
};

McpGpio.prototype.read = function() {
    return this._adapter.readPin(this._pin);
};

McpGpio.prototype.write = function(value) {
    if (value === 1) {
        return this._adapter.setPinHigh(this._pin);
    } else {
        return this._adapter.setPinLow(this._pin);
    }
};

McpGpio.prototype.setActiveLow = function(isActiveLow) { // jshint ignore:line
    //todo: implement
};

module.exports = driver({
    attach: function (inputs) {
        this._i2c  = inputs.getRequired('i2c');
        this._HIGH = inputs.getOptional('HIGH', 1);
        this._LOW  = 1 - this._HIGH;
        this._IN   = inputs.getOptional('IN', 1);
        this._OUT  = 1 - this._IN;

        this._cacheDirA  = 0xFF;
        this._cacheDirB  = 0xFF;
        this._cacheAOut  = 0;
        this._cacheBOut  = 0;

        this._IODIR_A = 0x00;
        this._IODIR_B = 0x01;

    // GPIO port reg
        this._GPIO_A = 0x12;
        this._GPIO_B = 0x13;

    // Output LAT reg
        this._OLAT_A = 0x14;
        this._OLAT_B = 0x15;

        this._GPINTEN_A = 0x4;
        this._GPINTEN_B = 0x5;

        this._INTCON_A  = 0x8;
        this._INTCON_B  = 0x9;

        this._IOCON_A = 0xA;
        this._IOCON_B = 0xB;

        this.reset();
    },

    getDevice: function(key, inputs) {
        var index = outputsKey.indexOf(key);
        inputs.setValue('pin', index);
        var GpioClass = Gpio.driver({
            attach: function(inputs, adapter, index) {
                McpGpio.call(this, inputs, adapter, index);
            },

            exports: McpGpio.prototype
        });

        return new GpioClass(inputs, this, index);
    },

    exports : {
        write: function(offset, value) {
            return this._i2c.writeByte(offset, value);
        },

        read: function (offset) {
            return this._i2c.readByte(offset);
        },

        // reset all pins to output and pull them down.
        reset: function() {
            this._cacheDirA = 0x0;
            this._cacheDirB = 0x0;
            this._cacheAOut = 0x0;
            this._cacheBOut = 0x0;

            this.write(this._IODIR_A, this._cacheDirA);
            this.write(this._OLAT_A,  this._cacheAOut);
            this.write(this._IODIR_B, this._cacheDirB);
            this.write(this._OLAT_B,  this._cacheBOut);
        },

        enableIntMirror: function(isEnable) {
            var data;

            data = this._i2c.readByte(this._IOCON_A);
            if (isEnable) {
                data |= 1 << 6;
            } else {
                data &= ~ (1 << 6);
            }
            data &= ~6;
            this._i2c.writeByte(this._IOCON_A, data);

            data = this._i2c.readByte(this._IOCON_B);
            if (isEnable) {
                data |= 1 << 6;
            } else {
                data &= ~ (1 << 6);
            }
            data &= ~6;
            this._i2c.writeByte(this._IOCON_B, data);
        },

        _setGpioDir: function (pin, dir) {
            var gpDir = pin < 8 ? this._cacheDirA : this._cacheDirB;
            var mask = 1 << (pin < 8 ? pin : pin - 8);

            //0 -> output, 1 -> input
            if ( (dir === this.OUT && (gpDir & mask) === mask) ||
                 (dir === this.IN  && (gpDir & mask) !== mask)) {
                if (pin < 8) {
                    this._cacheDirA = (gpDir ^ mask);
                    this.write(this._IODIR_A, this._cacheDirA);
                } else {
                    this._cacheDirB = (gpDir ^ mask);
                    this.write(this._IODIR_B, this._cacheDirB);
                }
            }
        },

        _setGpioData: function (pin, value) {
            var gp = pin < 8 ? this._cacheAOut : this._cacheBOut;
            var mask = 1 << (pin < 8 ? pin : pin - 8);

            if ((value === this._LOW  && (gp & mask) === mask) ||
                (value === this._HIGH && (gp & mask) !== mask)) {
                if (pin < 8) {
                    this._cacheAOut = gp ^ mask;
                    this.write(this._OLAT_A, this._cacheAOut);
                } else {
                    this._cacheBOut = gp ^ mask;
                    this.write(this._OLAT_B, this._cacheBOut);
                }
            }
        },

        // public methods and members
        setGpioOutput: function(pin) {
            this._setGpioDir(pin, this._OUT);
        },

        setGpioInput: function(pin) {
            this._setGpioDir(pin, this._IN);
        },

        setPinLow: function(pin) {
            this._setGpioData(pin, this._LOW);
        },

        setPinHigh: function(pin) {
            this._setGpioData(pin, this._HIGH);
        },

        readPin: function(pin) {
            var offset =  pin < 8 ? this._GPIO_A : this._GPIO_B;
            var mask = 1 << (pin < 8 ? pin : pin -8);

            if (this._i2c.readByte(offset) & mask) {
                return 1;
            } else {
                return 0;
            }
        },

        enableInt: function(pin, isEnable) {
            var offset =  pin < 8 ? this._GPINTEN_A: this._GPINTEN_B;
            var mask = this._i2c.readByte(offset);

            if (isEnable) {
                mask |= 1 << (pin < 8 ? pin : pin - 8);
            } else {
                mask &= ~(1 << (pin < 8 ? pin : pin - 8));
            }

            this._i2c.writeByte(offset, mask);
            this._i2c.writeByte(this._INTCON_A, 0xFF);
            this._i2c.writeByte(this._INTCON_B, 0xFF);
        }
    }
});

