'use strict';
function readFileSync(path) {
    var stats = uv.fs_stat(path);
    var fd = uv.fs_open(path, 'r', parseInt('666', 8));

    var buffer = uv.fs_read(fd, stats.size, 0, 0);

    uv.fs_close(fd);

    return buffer;
}

var buf = readFileSync(process.argv[2]);
Duktape.modCompile.call(this, buf);
