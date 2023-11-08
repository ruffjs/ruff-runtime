'use strict';

var driver = require('ruff-driver');
var adc = require('adc');

var outputKeys = {
    'ch0': 0x80,
    'ch1': 0xC0,
    'ch2': 0x90,
    'ch3': 0xD0,
    'ch4': 0xA0,
    'ch5': 0xE0,
    'ch6': 0xB0,
    'ch7': 0xF0
};

function read(i2c, addr) {
    var data = i2c.readBytes(addr | 0x08, 2); //Discard first reading .
    data = i2c.readBytes(addr | 0x08, 2);
    return (data[0] << 8 | (data[1])) >> 4;
}

function channel(addr, i2c) {
    return adc.driver({
        attach: function() {
            this._addr = addr;
            this._i2c = i2c;
        },

        exports: {
            getRawValue: function() {
                return read(this._i2c, this._addr);
            },

            getResolution: function() {
                return 12;
            }
        }
    });
}

module.exports = driver({
    attach: function(inputs) {
        this._i2c = inputs.getRequired('i2c');
    },

    getDevice: function(key, options) {
        var addr = outputKeys[key];
        if (!addr) {
            throw new Error('channel must in [ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7]');
        }
        var AdcClass = channel(addr, this._i2c);
        return new AdcClass(options);
    }
});