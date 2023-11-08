'use strict';
var path = require('path');
var fs = require('fs');
var process = require('process');

/* XXX: hack for ruff runtime */
if (global.ruff) {
    process.kill = function (pid, number) {
        if (!number) {
            number = 9;
        }

        uv.kill(pid, number);
    }
}

var PID_FILE_PATH = '/var/run/ruff_app.pid';

function checkandKillAppInstance() {
    try {
        var test = fs.readFileSync(PID_FILE_PATH);
        var pid = parseInt(test.toString());
        if (isNaN(pid)) {
            return;
        }

        process.kill(pid);
    } catch (err) {
    }
}

function launch() {
    var ruffBox = require('ruff');

    Object.defineProperty(global, '$', {
        get: function () {
            return ruffBox;
        }
    });

    var appPackageFilePath = path.resolve('package.json');
    var appPackageData = require(appPackageFilePath);

    var entry = require.resolve(path.resolve(appPackageData.main || '.'));

    global.__appEntry = entry;

    console.log('Ruff app is started');

    require(entry);
}

checkandKillAppInstance();

// trigger uv.run here to refresh timestamp for timers
//uv.run();
launch();

// Workaround for duktape 2.0 GC issue
if (global.ruff) {
    setInterval(Duktape.gc, 1000*5);
}

/* XXX: hack for ruff runtime */
if (global.ruff) {
    var SIGPIPE = 13;
    var pipeSignal = uv.signal_init();
    uv.signal_start(pipeSignal, SIGPIPE, function () {
        // Ignore "SIGPIPE" by default like node.js does
    });
}
