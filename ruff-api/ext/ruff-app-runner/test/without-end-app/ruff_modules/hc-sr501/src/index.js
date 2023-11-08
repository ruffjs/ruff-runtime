'use strict';

var Gpio   = require('gpio');
var driver = require('ruff-driver');

module.exports = driver({

    attach: function (inputs) {
        var _this = this;
        this.gpio = inputs.getRequired('gpio');

        this.gpio.setDirection(Gpio.IN);
        this.gpio.setEdge(Gpio.EDGE_BOTH);

        this.gpio.on('interrupt', function () {
            var data = _this.gpio.read();
            if (data === 1) {
                _this.emit('nearby');
            } else {
                _this.emit('away');
            }
        });
    },

    events: {
        nearby: 'event when a person is nearby',
        away: 'event when a person is away'
    }
});
