var packet = require('../src/dns-packet/index');
var EventEmitter = require('events');

function DNSClient() {
    EventEmitter.call(this);
    this.messages = {};
}

DNSClient.prototype = Object.create(EventEmitter.prototype);

DNSClient.prototype.push = function (hostname, message) {
    this.messages[hostname] = message;
};

DNSClient.prototype.send = function (buffer, offset) {
    var request = packet.decode(buffer, offset);
    var hostname = request.questions[0].name;
    var message = this.messages[hostname];
    var self = this;
    if (message) {
        process.nextTick(function () {
            self.emit('message', packet.encode(message));
        });
    } else {
        process.nextTick(function () {
            self.emit('error', new Error('no record for \"' + hostname + '\"'), null);
        });
    }
};

DNSClient.prototype.close = function () {

};
module.exports = DNSClient;
