'use strict';

var util = require('util');

function Poll(fd) {
    this._handle = uv.new_poll(fd);
    this._close = false;
}

Poll.READ_EVENT = 1;
Poll.WRITE_EVENT = 2;

Poll.prototype.start = function (event, callback) {
    if (this._close) {
        callback(new Error('Poll is already closed'));
        return;
    }
    uv.poll_start(this._handle, event, function (status, event) {
        if (status !== 0) {
            callback(new Error('Invalid status'));
            return;
        }

        callback(undefined, event);
    });
};

Poll.prototype.stop = function (callback) {
    if (this._close) {
        callback(new Error('Poll is already closed'));
        return;
    }
    uv.poll_stop(this._handle);
    util.invokeCallbackAsync(callback);
};

Poll.prototype.close = function (callback) {
    this._close = true;
    uv.close(this._handle, callback);
};

module.exports = Poll;
