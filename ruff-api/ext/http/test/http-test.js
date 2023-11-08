var path = require('path');
var spawn = require('child_process').spawn;
var testNames = [
    'test-http-client-abort-event',
    'test-http-client-abort',
    'test-http-client-abort2',
    'test-http-client-agent',
    'test-http-client-default-headers-exist',
    // 'test-http-client-encoding',
    'test-http-client-get-url',
    // 'test-http-client-parse-error',
    // 'test-http-client-pipe-end',
    'test-http-client-race-2',
    'test-http-client-race',
    'test-http-client-read-in-error',
    'test-http-client-readable',
    // 'test-http-client-reject-chunked-with-content-length',
    // 'test-http-client-reject-cr-no-lf',
    // 'test-http-client-response-domain',
    'test-http-client-timeout-agent',
    'test-http-client-timeout-event',
    'test-http-client-timeout-with-data',
    'test-http-client-timeout',
    'test-http-client-unescaped-path',
    'test-http-client-upload-buf',
    'test-http-client-upload'
];

module.exports = testNames.reduce(function (map, name) {
    map[name] = function (done) {
        var filePath = path.join(__dirname, name + '.js');

        var testItem = spawn(uv.exepath(), [filePath], {cwd: uv.cwd(), stdio: ['ignore', 'ignore', 'ignore'], env: {NAME_SERVER:process.env.NAME_SERVER}});

        testItem.on('exit', function(code) {
            if (code === 0) {
                done();
            } else {
                done(new Error('Invalid exit code ' + code));
            }
        });
    };
    return map;
}, {});

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

//require('test').run(module.exports);
