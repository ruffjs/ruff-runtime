'use strict';

var driver = require('ruff-driver');

function ADCChannel(id, adcInstance, referenceVoltage) {
    this._adcInstance = adcInstance;
    this._id = id;
    this._referenceVoltage = referenceVoltage;
}

ADCChannel.prototype.getVoltage = function(callback) {
    var adcMsg = ruff.adc.read(this._adcInstance);
    for (var k = 0; k < adcMsg.length; k++) {
        if (adcMsg[k].id === this._id) {
            var voltage = adcMsg[k].data / 4096 * this._referenceVoltage;
            setImmediate(function() {
                callback(undefined, voltage);
            });
        }
    }
};


module.exports = driver({
    attach: function (inputs, context) {
        this._referenceVoltage = context.args.referenceVoltage;
        this._adcInterfaceMapping = context.args.pinConfig;
        this._adcInstance = ruff.adc.open(inputs.device.path);
    },
    detach: function (callback) {
        if (this._adcInstance) {
            ruff.adc.close(this._adcInstance);
            this._adcInstance = undefined;
        } else {
            callback();
        }
    },
    getInterface: function (name, options) {
        var channelID = this._adcInterfaceMapping[name];
        if (channelID === undefined) {
            throw new Error('Interface name is expected to be "an-0" to "an-7" ');
        }

        return new ADCChannel(channelID, this._adcInstance, this._referenceVoltage);
    }
});

