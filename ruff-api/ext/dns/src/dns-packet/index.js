'use strict';

var types = require('./types.js');
var ip = require('../ip.js');

var QUERY_FLAG = 0;
var RESPONSE_FLAG = 1 << 15;
var FLUSH_MASK = 1 << 15;
var NOT_FLUSH_MASK = ~FLUSH_MASK;
var QU_MASK = 1 << 15;
var NOT_QU_MASK = ~QU_MASK;

var name = {};

name.encode = function (n, buf, offset) {
    if (!buf) { buf = new Buffer(name.encodingLength(n)); }
    if (!offset) { offset = 0; }

    var list = n.split('.');
    var oldOffset = offset;

    for (var i = 0; i < list.length; i++) {
        var len = buf.write(list[i], offset + 1);
        buf[offset] = len;
        offset += len + 1;
    }

    buf[offset++] = 0;

    name.encode.bytes = offset - oldOffset;
    return buf;
};

name.encode.bytes = 0;

name.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var list = [];
    var oldOffset = offset;
    var len = buf[offset++];

    if (len >= 0xc0) {
        var res = name.decode(buf, buf.readUInt16BE(offset - 1) - 0xc000);
        name.decode.bytes = 2;
        return res;
    }

    while (len) {
        if (len >= 0xc0) {
            list.push(name.decode(buf, buf.readUInt16BE(offset - 1) - 0xc000));
            offset++;
            break;
        }

        list.push(buf.toString('utf-8', offset, offset + len));
        offset += len;
        len = buf[offset++];
    }

    name.decode.bytes = offset - oldOffset;
    return list.join('.');
};

name.decode.bytes = 0;

name.encodingLength = function (n) {
    return Buffer.byteLength(n) + 2;
};

var string = {};

string.encode = function (s, buf, offset) {
    if (!buf) { buf = new Buffer(string.encodingLength(s)); }
    if (!offset) { offset = 0; }

    var len = buf.write(s, offset + 1);
    buf[offset] = len;
    string.encode.bytes = len + 1;
    return buf;
};

string.encode.bytes = 0;

string.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var len = buf[offset];
    var s = buf.toString('utf-8', offset + 1, offset + 1 + len);
    string.decode.bytes = len + 1;
    return s;
};

string.decode.bytes = 0;

string.encodingLength = function (s) {
    return Buffer.byteLength(s) + 1;
};

var header = {};

header.encode = function (h, buf, offset) {
    if (!buf) { buf = new Buffer(header.encodingLength(h)); }
    if (!offset) { offset = 0; }

    var flags = (h.flags || 0) & 32767;
    var type = h.type === 'response' ? RESPONSE_FLAG : QUERY_FLAG;

    buf.writeUInt16BE(h.id || 0, offset);
    buf.writeUInt16BE(flags | type, offset + 2);
    buf.writeUInt16BE(h.questions.length, offset + 4);
    buf.writeUInt16BE(h.answers.length, offset + 6);
    buf.writeUInt16BE(h.authorities.length, offset + 8);
    buf.writeUInt16BE(h.additionals.length, offset + 10);

    return buf;
};

header.encode.bytes = 12;

header.decode = function (buf, offset) {
    if (!offset) { offset = 0; }
    if (buf.length < 12) { throw new Error('Header must be 12 bytes'); }

    var flags = buf.readUInt16BE(offset + 2);

    return {
        id: buf.readUInt16BE(offset),
        type: flags & RESPONSE_FLAG ? 'response' : 'query',
        flags: flags & 32767,
        questions: new Array(buf.readUInt16BE(offset + 4)),
        answers: new Array(buf.readUInt16BE(offset + 6)),
        authorities: new Array(buf.readUInt16BE(offset + 8)),
        additionals: new Array(buf.readUInt16BE(offset + 10))
    };
};

header.decode.bytes = 12;

header.encodingLength = function () {
    return 12;
};

var runknown = exports.unknown = {};

runknown.encode = function (data, buf, offset) {
    if (!buf) { buf = new Buffer(runknown.encodingLength(data)); }
    if (!offset) { offset = 0; }

    buf.writeUInt16BE(data.length, offset);
    data.copy(buf, offset + 2);

    runknown.encode.bytes = data.length + 2;
    return buf;
};

runknown.encode.bytes = 0;

runknown.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var len = buf.readUInt16BE(offset);
    var data = buf.slice(offset + 2, offset + 2 + len);
    runknown.decode.bytes = len + 2;
    return data;
};

runknown.decode.bytes = 0;

runknown.encodingLength = function (data) {
    return data.length + 2;
};

var rtxt = exports.txt = exports.null = {};
var rnull = rtxt;

rtxt.encode = function (data, buf, offset) {
    if (!buf) { buf = new Buffer(rtxt.encodingLength(data)); }
    if (!offset) { offset = 0; }

    if (typeof data === 'string') { data = new Buffer(data); }
    if (!data) { data = new Buffer(0); }

    var oldOffset = offset;
    offset += 2;

    var len = data.length;
    data.copy(buf, offset, 0, len);
    offset += len;

    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rtxt.encode.bytes = offset - oldOffset;
    return buf;
};

rtxt.encode.bytes = 0;

rtxt.decode = function (buf, offset) {
    if (!offset) { offset = 0; }
    var oldOffset = offset;
    var len = buf.readUInt16BE(offset);

    offset += 2;

    var data = buf.slice(offset, offset + len);
    offset += len;

    rtxt.decode.bytes = offset - oldOffset;
    return data;
};

rtxt.decode.bytes = 0;

rtxt.encodingLength = function (data) {
    if (!data) { return 2; }
    return (Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data)) + 2;
};

var rhinfo = exports.hinfo = {};

rhinfo.encode = function (data, buf, offset) {
    if (!buf) { buf = new Buffer(rhinfo.encodingLength(data)); }
    if (!offset) { offset = 0; }

    var oldOffset = offset;
    offset += 2;
    string.encode(data.cpu, buf, offset);
    offset += string.encode.bytes;
    string.encode(data.os, buf, offset);
    offset += string.encode.bytes;
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rhinfo.encode.bytes = offset - oldOffset;
    return buf;
};

rhinfo.encode.bytes = 0;

rhinfo.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var oldOffset = offset;

    var data = {};
    offset += 2;
    data.cpu = string.decode(buf, offset);
    offset += string.decode.bytes;
    data.os = string.decode(buf, offset);
    offset += string.decode.bytes;
    rhinfo.decode.bytes = offset - oldOffset;
    return data;
};

rhinfo.decode.bytes = 0;

rhinfo.encodingLength = function (data) {
    return string.encodingLength(data.cpu) + string.encodingLength(data.os) + 2;
};

var rptr = exports.ptr = {};
var rcname = exports.cname = rptr;
var rdname = exports.dname = rptr;

rptr.encode = function (data, buf, offset) {
    if (!buf) { buf = new Buffer(rptr.encodingLength(data)); }
    if (!offset) { offset = 0; }

    name.encode(data, buf, offset + 2);
    buf.writeUInt16BE(name.encode.bytes, offset);
    rptr.encode.bytes = name.encode.bytes + 2;
    return buf;
};

rptr.encode.bytes = 0;

rptr.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var data = name.decode(buf, offset + 2);
    rptr.decode.bytes = name.decode.bytes + 2;
    return data;
};

rptr.decode.bytes = 0;

rptr.encodingLength = function (data) {
    return name.encodingLength(data) + 2;
};

var rsrv = exports.srv = {};

rsrv.encode = function (data, buf, offset) {
    if (!buf) { buf = new Buffer(rsrv.encodingLength(data)); }
    if (!offset) { offset = 0; }

    buf.writeUInt16BE(data.priority || 0, offset + 2);
    buf.writeUInt16BE(data.weight || 0, offset + 4);
    buf.writeUInt16BE(data.port || 0, offset + 6);
    name.encode(data.target, buf, offset + 8);

    var len = name.encode.bytes + 6;
    buf.writeUInt16BE(len, offset);

    rsrv.encode.bytes = len + 2;
    return buf;
};

rsrv.encode.bytes = 0;

rsrv.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var len = buf.readUInt16BE(offset);

    var data = {};
    data.priority = buf.readUInt16BE(offset + 2);
    data.weight = buf.readUInt16BE(offset + 4);
    data.port = buf.readUInt16BE(offset + 6);
    data.target = name.decode(buf, offset + 8);

    rsrv.decode.bytes = len + 2;
    return data;
};

rsrv.decode.bytes = 0;

rsrv.encodingLength = function (data) {
    return 8 + name.encodingLength(data.target);
};

var ra = exports.a = {};

ra.encode = function (host, buf, offset) {
    if (!buf) { buf = new Buffer(ra.encodingLength(host)); }
    if (!offset) { offset = 0; }

    buf.writeUInt16BE(4, offset);
    offset += 2;
    ip.toBuffer(host, buf, offset);
    ra.encode.bytes = 6;
    return buf;
};

ra.encode.bytes = 0;

ra.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    offset += 2;
    var host = ip.toString(buf, offset, 4);
    ra.decode.bytes = 6;
    return host;
};

ra.decode.bytes = 0;

ra.encodingLength = function () {
    return 6;
};

var raaaa = exports.aaaa = {};

raaaa.encode = function (host, buf, offset) {
    if (!buf) { buf = new Buffer(raaaa.encodingLength(host)); }
    if (!offset) { offset = 0; }

    buf.writeUInt16BE(16, offset);
    offset += 2;
    ip.toBuffer(host, buf, offset);
    raaaa.encode.bytes = 18;
    return buf;
};

raaaa.encode.bytes = 0;

raaaa.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    offset += 2;
    var host = ip.toString(buf, offset, 16);
    raaaa.decode.bytes = 18;
    return host;
};

raaaa.decode.bytes = 0;

raaaa.encodingLength = function () {
    return 18;
};

var renc = exports.record = function (type) {
    switch (type.toUpperCase()) {
        case 'A': return ra;
        case 'PTR': return rptr;
        case 'CNAME': return rcname;
        case 'DNAME': return rdname;
        case 'TXT': return rtxt;
        case 'NULL': return rnull;
        case 'AAAA': return raaaa;
        case 'SRV': return rsrv;
        case 'HINFO': return rhinfo;
    }
    return runknown;
};

var answer = exports.answer = {};

answer.encode = function (a, buf, offset) {
    if (!buf) { buf = new Buffer(answer.encodingLength(a)); }
    if (!offset) { offset = 0; }

    var oldOffset = offset;

    name.encode(a.name, buf, offset);
    offset += name.encode.bytes;

    buf.writeUInt16BE(types.toType(a.type), offset);

    var klass = a.class === undefined ? 1 : a.class;
    if (a.flush) { klass |= FLUSH_MASK; } // the 1st bit of the class is the flush bit
    buf.writeUInt16BE(klass, offset + 2);

    buf.writeUInt32BE(a.ttl || 0, offset + 4);

    var enc = renc(a.type);
    enc.encode(a.data, buf, offset + 8);
    offset += 8 + enc.encode.bytes;

    answer.encode.bytes = offset - oldOffset;
    return buf;
};

answer.encode.bytes = 0;

answer.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var a = {};
    var oldOffset = offset;

    a.name = name.decode(buf, offset);
    offset += name.decode.bytes;
    a.type = types.toString(buf.readUInt16BE(offset));
    a.class = buf.readUInt16BE(offset + 2);
    a.ttl = buf.readUInt32BE(offset + 4);

    a.flush = !!(a.class & FLUSH_MASK);
    if (a.flush) { a.class &= NOT_FLUSH_MASK; }

    var enc = renc(a.type);
    a.data = enc.decode(buf, offset + 8);
    offset += 8 + enc.decode.bytes;

    answer.decode.bytes = offset - oldOffset;
    return a;
};

answer.decode.bytes = 0;

answer.encodingLength = function (a) {
    return name.encodingLength(a.name) + 8 + renc(a.type).encodingLength(a.data);
};

var question = exports.question = {};

question.encode = function (q, buf, offset) {
    if (!buf) { buf = new Buffer(question.encodingLength(q)); }
    if (!offset) { offset = 0; }

    var oldOffset = offset;

    name.encode(q.name, buf, offset);
    offset += name.encode.bytes;

    buf.writeUInt16BE(types.toType(q.type), offset);
    offset += 2;

    buf.writeUInt16BE(q.class === undefined ? 1 : q.class, offset);
    offset += 2;

    question.encode.bytes = offset - oldOffset;
    return q;
};

question.encode.bytes = 0;

question.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var oldOffset = offset;
    var q = {};

    q.name = name.decode(buf, offset);
    offset += name.decode.bytes;

    q.type = types.toString(buf.readUInt16BE(offset));
    offset += 2;

    q.class = buf.readUInt16BE(offset);
    offset += 2;

    var qu = !!(q.class & QU_MASK);
    if (qu) { q.class &= NOT_QU_MASK; }

    question.decode.bytes = offset - oldOffset;
    return q;
};

question.decode.bytes = 0;

question.encodingLength = function (q) {
    return name.encodingLength(q.name) + 4;
};

exports.AUTHORITATIVE_ANSWER = 1 << 10;
exports.TRUNCATED_RESPONSE = 1 << 9;
exports.RECURSION_DESIRED = 1 << 8;
exports.RECURSION_AVAILABLE = 1 << 7;
exports.AUTHENTIC_DATA = 1 << 5;
exports.CHECKING_DISABLED = 1 << 4;

exports.encode = function (result, buf, offset) {
    if (!buf) { buf = new Buffer(exports.encodingLength(result)); }
    if (!offset) { offset = 0; }

    var oldOffset = offset;

    if (!result.questions) { result.questions = []; }
    if (!result.answers) { result.answers = []; }
    if (!result.authorities) { result.authorities = []; }
    if (!result.additionals) { result.additionals = []; }

    header.encode(result, buf, offset);
    offset += header.encode.bytes;

    offset = encodeList(result.questions, question, buf, offset);
    offset = encodeList(result.answers, answer, buf, offset);
    offset = encodeList(result.authorities, answer, buf, offset);
    offset = encodeList(result.additionals, answer, buf, offset);

    exports.encode.bytes = offset - oldOffset;

    return buf;
};

exports.encode.bytes = 0;

exports.decode = function (buf, offset) {
    if (!offset) { offset = 0; }

    var oldOffset = offset;
    var result = header.decode(buf, offset);
    offset += header.decode.bytes;

    offset = decodeList(result.questions, question, buf, offset);
    offset = decodeList(result.answers, answer, buf, offset);
    offset = decodeList(result.authorities, answer, buf, offset);
    offset = decodeList(result.additionals, answer, buf, offset);

    exports.decode.bytes = offset - oldOffset;

    return result;
};

exports.decode.bytes = 0;

exports.encodingLength = function (result) {
    return header.encodingLength(result) +
        encodingLengthList(result.questions || [], question) +
        encodingLengthList(result.answers || [], answer) +
        encodingLengthList(result.authorities || [], answer) +
        encodingLengthList(result.additionals || [], answer);
};

function encodingLengthList(list, enc) {
    var len = 0;
    for (var i = 0; i < list.length; i++) { len += enc.encodingLength(list[i]); }
    return len;
}

function encodeList(list, enc, buf, offset) {
    for (var i = 0; i < list.length; i++) {
        enc.encode(list[i], buf, offset);
        offset += enc.encode.bytes;
    }
    return offset;
}

function decodeList(list, enc, buf, offset) {
    for (var i = 0; i < list.length; i++) {
        list[i] = enc.decode(buf, offset);
        offset += enc.decode.bytes;
    }
    return offset;
}
