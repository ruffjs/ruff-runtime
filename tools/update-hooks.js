'use strict';

if (process.env.BUILD_NUMBER) {
    process.exit();
}

const Path = require('path');

const FS = require('fs-extra');

let hookNames = FS.readdirSync('.githooks');

for (let name of hookNames) {
    let path = Path.join('.git/hooks', name);

    try {
        let stats = FS.statSync(path);

        if (stats.mode & 0o777) {
            continue;
        }
    } catch (error) { }

    FS.writeFileSync(
        path,
        `#!/bin/sh\n./.githooks/${name}\n`,
        { mode: 0o777 }
    );

    console.log(`Added GIT hook ${name}.`);
}
