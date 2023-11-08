'use strict';

var Socket = require('./socket.js').Socket;

exports.createSocket = function(listener) {
    return new Socket(listener);
};