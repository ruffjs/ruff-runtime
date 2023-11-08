var assert = require('assert');
var spawn = require('../src/index.js').spawn;
var spawnSync = require('../src/index.js').spawnSync;
var ruffPath = uv.exepath();
var path = require('path');

if (process.platform !== 'win32') {
    exports['test should trigger ls and exit with 0'] = function (done) {
        var ls = spawn('/bin/ls', [__filename], { env: {} });

        ls.on('exit', function (code, signal) {
            assert(code === 0);
            assert(signal === undefined);
            done();
        });
    };

    exports['test should trigger ls and data send to pipe is expected'] = function (done) {
        var testDone = false;
        var ls = spawn('/bin/ls', [__filename], { env: {} });

        ls.stdout.on('data', function (data) {
            assert(data.toString().trim() === __filename);
            testDone = true;
        });

        ls.on('exit', function () {
            assert(testDone);
            done();
        });
    };

    exports['test child process should be killed with SIGKILL'] = function (done) {
        var testFile = path.join(__dirname, 'test_kill.js');
        var ruffKillTest = spawn(ruffPath, [testFile], { env: {} });

        ruffKillTest.on('exit', function (code, signal) {
            assert(signal === 'SIGKILL');
            done();
        });

        setTimeout(function () {
            ruffKillTest.kill('SIGKILL');
        }, 200);
    };

    exports['test should trigger ls and exit with 0'] = function () {
        var ls = spawnSync('/bin/ls', [__filename], { env: {} });
        assert(ls.status === 0);
    };
}

exports['test child process should get expected env'] = function (done) {
    var testDone = false;
    var testFile = path.join(__dirname, 'test_env.js');
    var ruffEnv = 'ruff_test_env';
    var ruffEnvTest = spawn(ruffPath, [testFile], {
        env: {
            ruff: ruffEnv
        }
    });

    ruffEnvTest.stdout.on('data', function (data) {
        assert(ruffEnv === data.toString().trim());
        testDone = true;
    });
    ruffEnvTest.on('exit', function () {
        assert(testDone);
        done();
    });
};

exports['test child process should get expected cwd'] = function (done) {
    var testDone = false;
    var testFile = path.join(__dirname, 'test_cwd.js');
    var ruffCwd = path.resolve(uv.cwd(), '../');
    var ruffCwdTest = spawn(ruffPath, [testFile], {
        cwd: ruffCwd,
        env: {}
    });

    ruffCwdTest.stdout.on('data', function (data) {
        assert(ruffCwd === data.toString().trim());
        testDone = true;
    });

    ruffCwdTest.on('exit', function () {
        assert(testDone);
        done();
    });
};

require('test').run(exports);
