'use strict';

var driver = require('ruff-driver');

var adcType = {
    voltage: 'voltage',
    current: 'current'
};

function getVoltage(adc) {
    return adc.__minVal + ((adc.getRawValue() * (adc.__maxVal - adc.__minVal)) / Math.pow(2, adc.getResolution()));
}

function actualAdcSpec(specification) {
    var actualSpec = {
        attach: function (options) {
            this.__minVal = options.getRequired('min');
            this.__maxVal = options.getRequired('max');

            var type = options.getRequired('type');
            if (type === adcType.current) {
                this.__resistance = options.getRequired('resistance');
                this.getCurrent = function () {
                    return getVoltage(this) / this.__resistance;
                };
            }

            if (type === adcType.voltage) {
                this.__resistance = 1;
                this.getVoltage = function () {
                    return getVoltage(this);
                };
            }

            var args = Array.prototype.slice.call(arguments);
            specification.attach.apply(this, args);
        }
    };

    if (specification.detach) {
        actualSpec.detach = specification.detach;
    }

    if (specification.getDevice) {
        actualSpec.getDevice = specification.getDevice;
    }

    var exports = specification.exports;

    var targetExports = {};
    for (var field in exports) {
        if (!targetExports.hasOwnProperty(field)) {
            targetExports[field] = exports[field];
        }
    }

    actualSpec.exports = targetExports;

    return actualSpec;
}

var REQUIRED = [
    'getRawValue',
    'getResolution'
];

var REJECTED = [
    'getCurrent',
    'getVoltage'
];

module.exports = {
    driver: function (specification) {
        if (!specification.exports) {
            throw new Error('Required exports for ADC is missing');
        }

        REQUIRED.forEach(function (item) {
            if (typeof specification.exports[item] !== 'function') {
                throw new Error(item + ' is missing for ADC');
            }
        });

        REJECTED.forEach(function (item) {
            if (specification.exports[item]) {
                throw new Error(item + ' should not implemented for ADC');
            }
        });

        var spec = actualAdcSpec(specification);
        return driver(spec);
    }
};
