/* jshint ignore:start */
'use strict';

var fs = exports;

fs.readFileSync = function (file) {
    file = path.join(__dirname, file);
    var buf = ruff.loadbin(file);
    if (!buf) {
        throw new Error('no such file or directory, open ' + '\'' + file + '\'');
    }
    return Buffer.from(buf);
};

fs.readFile = function (file) {
    var callback = arguments[arguments.length - 1];
    process.nextTick(function () {
        try {
            var buf = fs.readFileSync(file);
            callback(null, buf);
        } catch (e) {
            callback(e);
        }
    });
};
