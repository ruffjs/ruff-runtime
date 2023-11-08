var dns = require('dns');
var DNSClient = require('./mock-dns-client');

function createMockClient() {
    var mockClient = new DNSClient();
    mockClient.push('nanchao.org', {
        id: 1,
        type: 'response',
        flags: 384,
        questions: [
            {
                name: 'nanchao.org',
                type: 'A',
                class: 1
            }
        ],
        answers: [
            {
                name: 'nanchao.org',
                type: 'A',
                class: 1,
                ttl: 610,
                flush: false,
                data: '209.9.106.77'
            }
        ],
        authorities: [],
        additionals: []
    });
    mockClient.push('baidu.com', {
        id: 1,
        type: 'response',
        flags: 384,
        questions: [
            {
                name: 'baidu.com',
                type: 'A',
                class: 1
            }
        ],
        answers: [
            {
                name: 'baidu.com',
                type: 'A',
                class: 1,
                ttl: 598,
                flush: false,
                data: '123.125.114.144'
            },
            {
                name: 'baidu.com',
                type: 'A',
                class: 1,
                ttl: 598,
                flush: false,
                data: '111.13.101.208'
            },
            {
                name: 'baidu.com',
                type: 'A',
                class: 1,
                ttl: 598,
                flush: false,
                data: '180.149.132.47'
            },
            {
                name: 'baidu.com',
                type: 'A',
                class: 1,
                ttl: 598,
                flush: false,
                data: '220.181.57.217'
            }
        ],
        authorities: [],
        additionals: []
    });

    mockClient.push('zhidao.baidu.com', {
        id: 2,
        type: 'response',
        flags: 384,
        questions: [{ name: 'zhidao.baidu.com', type: 'A', class: 1 }],
        answers:
        [
            {
                name: 'zhidao.baidu.com',
                type: 'CNAME',
                class: 1,
                ttl: 481,
                flush: false,
                data: 'iknow.baidu.com'
            },
            {
                name: 'iknow.baidu.com',
                type: 'CNAME',
                class: 1,
                ttl: 421,
                flush: false,
                data: 'iknow.n.shifen.com'
            },
            {
                name: 'iknow.n.shifen.com',
                type: 'A',
                class: 1,
                ttl: 204,
                flush: false,
                data: '123.125.115.90'
            },
            {
                name: 'iknow.n.shifen.com',
                type: 'A',
                class: 1,
                ttl: 204,
                flush: false,
                data: '123.125.65.91'
            }],
        authorities: [],
        additionals: []
    });

    return mockClient;
}

exports.doTest = function (test_fn) {
    dns._dnsClient = createMockClient();
    try {
        test_fn();
    } finally {
        delete dns._dnsClient;
    }
};
