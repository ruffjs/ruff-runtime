'use strict';

function Async() {
    var self = {};
    Object.setPrototypeOf(self, Async.prototype);
    return self;
}

Async.prototype.series = function (funcs, idx) {
    var that = this;
    if (typeof idx === 'undefined') {
        idx = 0;
    }
    if (idx < funcs.length) {
        funcs[idx](function () {
            that.series(funcs, idx + 1);
        });
    }
};

module.exports = new Async();
