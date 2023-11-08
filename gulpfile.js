'use strict';

const Path = require('path');
const spawn = require('child_process').spawn;

const File = require('vinyl');
const FS = require('fs-extra');
const Gulp = require('gulp');
const Promise = require('thenfail').Promise;
const argv = require('yargs').argv;
const filter = require('gulp-filter');
const glob = require('glob');
const gulpIf = require('gulp-if');
const header = require('gulp-header');
const merge = require('merge-stream');
const rename = require('gulp-rename');
const through = require('through2');

const preCompile = require('./tools/pre-compile');

process.env.NAME_SERVER = '192.168.31.1';

const VERSION = require('./package').version;
const WIN32 = process.platform === 'win32';
const EMBEDDED = !!argv.embedded;
const BYTECODE = EMBEDDED || !!argv.bytecode;
const NINJA = !WIN32 && !EMBEDDED;
const TARGET_PLATFORM = argv.platform;

const BUILD_DIR = Path.join(__dirname, 'build');
const RUFF_COMPILER_PROJECT_DIR = Path.join(__dirname, 'tools/compiler');
const RUFF_COMPILER_BUILD_DIR = Path.join(BUILD_DIR, 'ruff-compiler');
const RUFF_BUILD_DIR = Path.join(BUILD_DIR, `ruff${TARGET_PLATFORM ? `-${TARGET_PLATFORM}` : ''}`);
const RUFF_EXECUTABLE_PATH = Path.join(RUFF_BUILD_DIR, 'bin', WIN32 ? 'ruff.exe' : 'ruff');
const MODULES_DIR = Path.join(__dirname, 'modules/ruff_modules');
const DEPS_MODULES_DIR = Path.join(__dirname, 'dist/deps/ruff_modules');
const RUFF_MODULES_BUILD_DIR = Path.join(RUFF_BUILD_DIR, 'ruff_modules');
const NODE_MODULES_BUILD_DIR = Path.join(RUFF_BUILD_DIR, 'node_modules');
const MODULES_TEST_FILES_PATTERN = Path.join(MODULES_DIR, '*/test/**/*test.js');
const ISTANBUL_CLI_PATH = Path.join(__dirname, 'ruff_modules/istanbul/lib/cli.js');
const ISTANBUL_COVERAGE_DIR = Path.join(__dirname, 'coverage');
const DOCS_BUILD_DIR = Path.join(RUFF_BUILD_DIR, 'doc');
const RUFFAPI_BUILD_DIR = Path.join(__dirname, 'ruff-api');
const DOCS_DIR = Path.join(__dirname, 'ruff-api/doc');

const COPYRIGHT_HEADER = '\
/*!\n\
 * Copyright (c) 2015-2017, Nanchao, Inc.\n\
 * All rights reserved.\n\
 */\n\n';

const SHARED_MODULE_NAMES = [
    'adc',
    'assert',
    'child_process',
    'dgram',
    'dns',
    'gpio',
    'http',
    'i2c',
    'net',
    'pwm',
    'ruff-driver',
    'ruff-async',
    'querystring',
    'stream',
    'trait',
    'uart',
    'url',
    'fs',
    'https'
];

const EMBEDDED_SPECIFIC_MODULE_NAMES = [
    'ruff',
    'launcher',
    'process',
    'os',
    'kernel-module',
    '_console_eval',
    '_file',
    'poll',
    'ruff-util',
    'network-manager',
    'network-manager-5350',
    'connection-manager',
    'mobile-manager-5350'
];

const SDK_SPECIFIC_MODULE_NAMES = [
    'test',
    'ruff-mock',
    'ruff-driver-runner',
    'ruff-app-runner'
];

const TARGET_NODE_MODULE_NAMES = [
    'ruff',
    'launcher',
    'ruff-driver',
    'trait',
    'uart'
];

const TARGET_MODULE_NAMES = SHARED_MODULE_NAMES.concat(EMBEDDED ? EMBEDDED_SPECIFIC_MODULE_NAMES : SDK_SPECIFIC_MODULE_NAMES);

////////////////////
// ruff-api BUILD //
////////////////////

Gulp.task('build-ruff-api', () => {
    let ruffModulesSrcPath = Path.join(RUFFAPI_BUILD_DIR, 'dist/ruff/ruff_modules');
    let ruffModulesDestPath = MODULES_DIR;
    let npmcmd = findCommand('npm');
    return Promise.invoke(FS.remove, ruffModulesDestPath)
        .then(() => executeCommand({
            cwd: RUFFAPI_BUILD_DIR,
            name: npmcmd,
            args: ['run', 'gulp', 'clean', '--', '--tag=ruff']
        }))
        .then(() => executeCommand({
            cwd: RUFFAPI_BUILD_DIR,
            name: npmcmd,
            args: ['run', 'gulp', 'build-modules', '--', '--tag=ruff']
        }))
        .then(() => Promise.invoke(FS.copy, ruffModulesSrcPath, ruffModulesDestPath));
});

/////////////
// C BUILD //
/////////////

Gulp.task('generate-ruff-compiler', () => {
    return generateProject(RUFF_COMPILER_PROJECT_DIR, RUFF_COMPILER_BUILD_DIR);
});

Gulp.task('build-ruff-compiler', () => {
    return buildProject(RUFF_COMPILER_BUILD_DIR);
});

Gulp.task('clean-ruff-compiler', () => {
    return Promise.invoke(FS.remove, RUFF_COMPILER_BUILD_DIR);
});

Gulp.task('generate-ruff', () => {
    return generateProject(__dirname, RUFF_BUILD_DIR, ['-DDUK_DEBUG="FALSE"']);
});

Gulp.task('build-ruff', () => {
    return buildProject(RUFF_BUILD_DIR);
});

Gulp.task('ruff-sanity-check', Gulp.series('build-ruff', () => {
    return executeCommand({
        name: 'node',
        cwd: process.cwd(),
        args: [
            'sanity_tests/func_bc_test.js',
            RUFF_EXECUTABLE_PATH
        ]
    });
}));

Gulp.task('clean-ruff', () => {
    return Promise.invoke(FS.remove, RUFF_BUILD_DIR);
});

function generateProject(projectDir, buildDir, extraArgs) {
    return executeCommand({
        name: 'cmake',
        cwd: projectDir,
        args: [
            '-H.',
            `-B${buildDir}`,
            `-DRUFF_VERSION=${VERSION}`,
            ...(NINJA ? ['-GNinja'] : []),
            ...(extraArgs || [])
        ]
    });
}

function buildProject(dir) {
    if (WIN32) {
        // Notes: Use debug version build for Windows
        // When upgrade duktape to 2.5.0 release build will cause test break(ruff may exit unnormal)
        // the reason may releated to build flag or optimize issue just bypass
        return executeCommand({
            name: 'msbuild',
            cwd: dir,
            args: [
                'INSTALL.vcxproj',
                '/p:Configuration=Debug'
            ]
        });
    } else {
        let commandName = NINJA ? 'ninja' : 'make';

        return executeCommand({
            name: commandName,
            cwd: dir
        })
            .then(() => executeCommand({
                name: commandName,
                cwd: dir,
                args: [
                    'install'
                ]
            }));
    }
}

////////////////
// JS MODULES //
////////////////

Gulp.task('prepare-modules', () => {
    let streams = TARGET_MODULE_NAMES
        .map(name => getModuleStream(name, RUFF_MODULES_BUILD_DIR, true))
        .filter(stream => !!stream);

    return merge(...streams);
});

Gulp.task('prepare-node-modules', () => {
    let streams = TARGET_NODE_MODULE_NAMES
        .map(name => getModuleStream(name, NODE_MODULES_BUILD_DIR, false))
        .filter(stream => !!stream);

    return merge(...streams);
});

Gulp.task('copy-native-modules', () => {
    // var child_process = require('child_process');
    // // Workaround: copy tls/crypto dirs seperately
    // // it's because that spawn `cp dir_a/* dir_b` failed on Mac
    // child_process.spawn('cp', ['-r', './dist/deps/native-modules/ruff_modules/crypto', './build/ruff/ruff_modules']);
    // child_process.spawn('cp', ['-r', './dist/deps/native-modules/ruff_modules/tls', './build/ruff/ruff_modules']);

    return executeCommand({
        name: 'cp',
        args: ['-r', './dist/deps/native-modules/ruff_modules/crypto', './build/ruff/ruff_modules'],
    }).then(() => {
        return executeCommand({
            name: 'cp',
            args: ['-r', './dist/deps/native-modules/ruff_modules/tls', './build/ruff/ruff_modules'],
        });
    });

});

Gulp.task('test-modules', Gulp.series('ruff-sanity-check', () => {
    return Promise
        .invoke(FS.remove, ISTANBUL_COVERAGE_DIR)
        .then(() => Promise.invoke(glob, MODULES_TEST_FILES_PATTERN))
        .each(path => {
            let relPath = Path.relative(MODULES_DIR, path);
            let moduleName = relPath.replace(/[\\/].+$/, '');
            return executeCommand({
                name: RUFF_EXECUTABLE_PATH,
                cwd: MODULES_DIR,
                args: [
                    ISTANBUL_CLI_PATH,
                    'cover',
                    path,
                    '--dir',
                    Path.resolve('coverage', moduleName)
                ]
            });
        });
}));

Gulp.task('clean-modules', () => {
    return Promise.invoke(FS.remove, RUFF_MODULES_BUILD_DIR);
});

Gulp.task('clean-node-modules', () => {
    return Promise.invoke(FS.remove, NODE_MODULES_BUILD_DIR);
});

function getModuleStream(name, destDir, isBytecode) {
    let moduleDir = Path.join(MODULES_DIR, name);
    let moduleSrcDir = Path.join(moduleDir, 'src');

    let singleJsFile;

    try {
        singleJsFile = FS.readdirSync(moduleSrcDir).length === 1;
    } catch (error) {
        moduleDir = Path.join(DEPS_MODULES_DIR, name);
        moduleSrcDir = Path.join(moduleDir, 'src');
        singleJsFile = FS.readdirSync(moduleSrcDir).length === 1;
    }

    let sources;
    let dest;

    if (singleJsFile) {
        sources = [
            'src/**/*.js'
        ];

        dest = destDir;
    } else {
        sources = [
            'src/**/*.js',
            'src/**/*.so',
            'package.json'
        ];

        dest = Path.join(destDir, name);
    }

    let jsFilter = filter('**/*.js', { restore: true });

    if (isBytecode) {
        return Gulp
            .src(sources, {
                cwd: moduleDir,
                base: singleJsFile ? moduleSrcDir : moduleDir
            })
            .pipe(jsFilter)
            .pipe(header(COPYRIGHT_HEADER))
            .pipe(gulpIf(singleJsFile, rename({ basename: name })))
            .pipe(preCompileThrough(singleJsFile))
            .pipe(jsFilter.restore)
            .pipe(Gulp.dest(dest));
    } else {
        return Gulp
            .src(sources, {
                cwd: moduleDir,
                base: singleJsFile ? moduleSrcDir : moduleDir
            })
            .pipe(jsFilter)
            .pipe(header(COPYRIGHT_HEADER))
            .pipe(gulpIf(singleJsFile, rename({ basename: name })))
            .pipe(jsFilter.restore)
            .pipe(Gulp.dest(dest));
    }
}

function preCompileThrough(single) {
    return through.obj(function (file, encoding, callback) {
        if (!BYTECODE) {
            this.push(file);
            callback();
            return;
        }

        let relativePath = single ?
            Path.basename(file.path) :
            Path.relative(MODULES_DIR, file.path);

        let bytecode = preCompile(file.contents, Path.join('~runtime~', relativePath));

        let bcFile = new File({
            cwd: file.cwd,
            base: file.base,
            path: `${file.path}.bc`,
            contents: bytecode
        });

        this.push(bcFile);

        callback();
    });
}

//////////
// DOCS //
//////////

Gulp.task('build-docs', () => {
    let docCount = 0;
    return Promise
        .invoke(FS.ensureDir, DOCS_BUILD_DIR)
        .then(() => Promise.invoke(glob, `${DOCS_DIR}/*.md`))
        .each(path => {
            docCount++;
            console.log(`Compiling markdown "${path}"...`);

            let cp = spawn(
                'node',
                [
                    'modules/ruff_scripts/generate.js',
                    '--format=html',
                    '--template=modules/ruff_scripts/template.html',
                    path
                ]
            );

            let htmlPath = Path.join(DOCS_BUILD_DIR, `${Path.basename(path, '.md')}.html`);
            let fileStream = FS.createWriteStream(htmlPath);

            cp.stdout.pipe(fileStream);

            return Promise.all([
                Promise.for(cp),
                Promise.for(fileStream, 'close')
            ]);
        })
        .then(() => {
            if (docCount <= 0) {
                return Promise.reject('Error: no doc files found!');
            }
            console.log(`Total ${docCount} doc files are generated.`);
            return Promise.resolve();
        });
});

////////////
// COMMON //
////////////

Gulp.task('clean', () => {
    return Promise.invoke(FS.remove, BUILD_DIR);
});

function executeCommand(command) {
    let cp = spawn(
        command.name,
        command.args || [],
        {
            cwd: command.cwd,
            stdio: 'inherit'
        }
    );

    return Promise.for(cp);
}

function findCommand(cmd) {
    const which = require('which');
    try {
        return which.sync(cmd);
    } catch (e) {
        return '';
    }
}
