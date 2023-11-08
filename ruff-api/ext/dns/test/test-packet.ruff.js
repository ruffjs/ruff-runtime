var assert = require('assert');
var test = require('test');

var packet = require('../src/dns-packet/index');

module.exports = {
    'test txt': function () {
        testEncoder(packet.txt, Buffer(0));
        testEncoder(packet.txt, Buffer('hello world'));
        testEncoder(packet.txt, Buffer([0, 1, 2, 3, 4, 5]));
    },
    'test null': function () {
        testEncoder(packet.null, Buffer([0, 1, 2, 3, 4, 5]));
    },
    'test hinfo': function () {
        testEncoder(packet.hinfo, { cpu: 'intel', os: 'best one' });
    },
    'test ptr': function () {
        testEncoder(packet.ptr, 'hello.world.com');
    },
    'test cname': function () {
        testEncoder(packet.cname, 'hello.cname.world.com');
    },
    'test dname': function () {
        testEncoder(packet.dname, 'hello.dname.world.com')
    },
    'test srv': function () {
        testEncoder(packet.srv, { port: 9999, target: 'hello.world.com' });
        testEncoder(packet.srv, { port: 9999, target: 'hello.world.com', priority: 42, weight: 10 });
    },
    'test a': function () {
        testEncoder(packet.a, '127.0.0.1');
    },
    'test aaaa': function () {
        testEncoder(packet.aaaa, 'fe80::1');
    },
    'test query': function () {
        testEncoder(packet, {
            type: 'query',
            questions: [{
                type: 'A',
                name: 'hello.a.com'
            }, {
                    type: 'SRV',
                    name: 'hello.srv.com'
                }]
        });

        testEncoder(packet, {
            type: 'query',
            id: 42,
            questions: [
                {
                    type: 'A',
                    name: 'hello.a.com'
                }, {
                    type: 'SRV',
                    name: 'hello.srv.com'
                }
            ]
        });

        testEncoder(packet, {
            type: 'query',
            id: 42,
            questions: [
                {
                    type: 'A',
                    class: 100,
                    name: 'hello.a.com'
                }, {
                    type: 'SRV',
                    name: 'hello.srv.com'
                }
            ]
        });
    },
    'test response': function () {
        testEncoder(packet, {
            type: 'response',
            flags: packet.TRUNCATED_RESPONSE,
            answers: [{
                type: 'A',
                name: 'hello.a.com',
                data: '127.0.0.1'
            }, {
                    type: 'SRV',
                    name: 'hello.srv.com',
                    data: {
                        port: 9090,
                        target: 'hello.target.com'
                    }
                }, {
                    type: 'CNAME',
                    name: 'hello.cname.com',
                    data: 'hello.other.domain.com'
                }]
        });

        testEncoder(packet, {
            type: 'response',
            id: 100,
            flags: 0,
            additionals: [{
                type: 'AAAA',
                name: 'hello.a.com',
                data: 'fe80::1'
            }, {
                    type: 'PTR',
                    name: 'hello.ptr.com',
                    data: 'hello.other.ptr.com'
                }, {
                    type: 'SRV',
                    name: 'hello.srv.com',
                    ttl: 42,
                    data: {
                        port: 9090,
                        target: 'hello.target.com'
                    }
                }],
            answers: [{
                type: 'NULL',
                name: 'hello.null.com',
                data: Buffer([1, 2, 3, 4, 5])
            }]
        });
    }
};

test.run(module.exports);

function testEncoder(packet, val) {
    var buf = packet.encode(val);
    var val2 = packet.decode(buf);

    assert.equal(buf.length, packet.encode.bytes, 'encode.bytes was set correctly');
    assert.equal(buf.length, packet.encodingLength(val), 'encoding length matches');
    assert.ok(compare(val, val2), 'decoded object match');

    var buf2 = packet.encode(val2);
    var val3 = packet.decode(buf2);

    assert.equal(buf2.length, packet.encode.bytes, 'encode.bytes was set correctly on re-encode');
    assert.equal(buf2.length, packet.encodingLength(val), 'encoding length matches on re-encode');

    assert.ok(compare(val, val3), 'decoded object match on re-encode');
    assert.ok(compare(val2, val3), 're-encoded decoded object match on re-encode');

    var bigger = Buffer(buf2.length + 10);

    var buf3 = packet.encode(val, bigger, 10);
    var val4 = packet.decode(buf3, 10);

    assert.ok(buf3 === bigger, 'echoes buffer on external buffer');
    assert.equal(packet.encode.bytes, buf.length, 'encode.bytes is the same on external buffer');
    assert.ok(compare(val, val4), 'decoded object match on external buffer');
}

function compare(a, b) {
    if (Buffer.isBuffer(a)) return a.toString('hex') === b.toString('hex')
    if (typeof a === 'object' && a && b) {
        var keys = Object.keys(a)
        for (var i = 0; i < keys.length; i++) {
            if (!compare(a[keys[i]], b[keys[i]])) return false
        }
    } else {
        return a === b
    }
    return true
}