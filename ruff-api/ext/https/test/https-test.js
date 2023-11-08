var path = require('path');
var spawn = require('child_process').spawn;
var testNames = [
    'test-https-write-string',
    'test-https-write-large-string',
    'test-https-write-buffer'
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

// Workaround: test Linux/MacOS only for now
if (process.platform === 'darwin' || process.platform === 'linux') {
    require('test').run(module.exports);
}
