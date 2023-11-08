var assert = require('assert');
var fs = require('fs');
var path = require('path');
var thisPath = this.id;
var testDir = path.dirname(thisPath);

if (process.platform !== 'win32') {
    exports['test should trigger poll callback'] = function () {
        var fifoName = path.join(testDir, '.test_fifo');
        var rdData = '';
        var wrData = 'test_fifo';
        //fs.unlinkSync(fifoName);
        //    uv.exec_sync("/bin/rm -f", [fifoName]);
        uv.exec_sync('/usr/bin/mkfifo', [fifoName]);

        var readFd = uv.fs_open(fifoName, 'rn', parseInt('644', 8));
        var Poll = require('../src/index.js');

        var poll = new Poll(readFd);

        poll.start(Poll.READ_EVENT, function (error, event) {
            if (!error && event === Poll.READ_EVENT) {
                rdData = new Buffer(uv.fs_read(readFd, 1024, -1)).toString();
                poll.stop();
                uv.fs_close(readFd);
                fs.unlinkSync(fifoName);
                poll.close();
            }
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
