var assert = require('assert');
var fs = require('fs');
var path = require('path');
var thisPath = this.id;
var testDir = path.dirname(thisPath);
var ReadHelper = require('../src/helper.js');

if (process.platform !== 'win32') {
    exports['test should emit data event'] = function () {
        var fifoName = path.join(testDir, '.test_fifo');
        var rdData = '';
        var wrData = 'test_fifo';
        //fs.unlinkSync(fifoName);
        //    uv.exec_sync("/bin/rm -f", [fifoName]);
        uv.exec_sync('/usr/bin/mkfifo', [fifoName]);

        var reader = new ReadHelper(fifoName, 'rn');

        reader.start();
        reader.on('data', function (data) {
            rdData = Buffer.from(data).toString();
            reader.stop();
            reader.close(function () {
                fs.unlinkSync(fifoName);
            });
        });

        var write_fd = uv.fs_open(fifoName, 'wn', parseInt('644', 8));
        uv.fs_write(write_fd, wrData, -1);
        uv.fs_close(write_fd);

        process.on('exit', function () {
            assert.equal(rdData, wrData);
        });
    };
}


require('test').run(exports);
