var https = require('https');
var fs = require('fs');
var assert = require('assert');

var port = 8000;

var serverListen = false;
var clientConnect = false;
var serverConnect = false;
var serverData = false;
var clientData = false;
var serverClose = false;

var server_options = {
    key: fs.readFileSync(__dirname + '/keys/server.key'),
    cert: fs.readFileSync(__dirname + '/keys/server.crt')
};

var str = '';
for (var i = 0; i < 100000; i++) {
    str += '0';
}

var server = https.createServer(server_options, function (req, res) {
    serverConnect = true;

    req.on('data', function (data) {
        serverData = true;
        assert(data instanceof Buffer);
        assert(data.toString() === 'client');
//        res.end('server');
        res.end(str);
        setTimeout(function () {
            server.close();
        }, 500);
    });

    req.on('error', function (error) {
        assert(false);
    });
});

server.on('close', function () {
    serverClose = true;
});

server.listen(port, function () {
    serverListen = true;

    var client_options = {
        hostname: 'localhost',
        port: port,
        path: '/',
        method: 'POST',
        rejectUnauthorized: false
    };

    var request = https.request(client_options, function (res) {
        clientConnect = true;

        var data = '';
        res.on('data', function (chunk) {
            assert(chunk instanceof Buffer);
            clientData = true;
            data += chunk.toString();
        });

        res.on('end', function () {
            assert(data.length === 100000);
            assert(data.toString() === str);
        });
    });

    request.on('error', function (error) {
        assert(false);
    });

    request.end('client');
});

process.on('exit', function () {
    assert(serverListen);
    assert(clientConnect);
    assert(serverConnect);
    assert(serverData);
    assert(clientData);
    assert(serverClose);
});
