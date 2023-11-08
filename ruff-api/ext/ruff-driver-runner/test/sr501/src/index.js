'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        var that = this;

        this.gpio = inputs['gpio'];

        this.gpio.on('interrupt', function () {
            var data = that.gpio.read();

            if (data === 1) {
                that.emit('nearby');
            } else {
                that.emit('away');
            }
        });
    }
});
