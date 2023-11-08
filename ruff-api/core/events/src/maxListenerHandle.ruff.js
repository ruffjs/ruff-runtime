'use strict';
var console = require('console').console;
module.exports = function (length, type) {
    console.error('(ruff) warning: possible EventEmitter memory ' +
        'leak detected. %d %s listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.',
        length, type);
    console.trace();
};
