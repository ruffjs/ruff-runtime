'use strict';

const path = require('path');
const { spawn } = require('child_process');

const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob');
const gulp = require('gulp');
const { argv } = require('yargs');
const { Promise } = require('thenfail');

const knownTags = new Set(['ruff', 'rufflite']);

const ISTANBUL_CLI_PATH = path.join(__dirname, 'ruff_modules/istanbul/lib/cli.js');
const ISTANBUL_COVERAGE_DIR = path.join(__dirname, 'coverage');

// TODO:
// The only convention between gulp and henge are tag names,
// henge should tell gulp where engine is
const ENGINES = Object.create({
    ruff: path.normalize('.deps/ruff/bin/ruff'),
    rufflite: path.normalize('.deps/ruff-jerry-x86/ruff_jerry_x86')
});

//------------------------------------------------------------------------------

gulp.task('copy-native-modules', () => {
    // var child_process = require('child_process');
    // child_process.spawn('cp', ['-r', '.deps/native-modules/ruff_modules/', '.deps/ruff/ruff_modules']);
    return executeCommand({
        name: 'cp',
        args: ['-r', '.deps/native-modules/ruff_modules/', '.deps/ruff/ruff_modules']
    });
});

gulp.task('clean', done => {
    let tag = argv.tag;
    if (!tag || !knownTags.has(tag)) {
        throw new Error(`Valid tags are: ${[...knownTags].join(', ')}`);
    }
    let destRoot = path.normalize(`dist/${tag}/ruff_modules`);
    fs.removeSync(destRoot);
    done();
});

gulp.task('build-doc', () => {
});

gulp.task('build-modules', done => {
    let tag = argv.tag;
    if (!tag || !knownTags.has(tag)) {
        throw new Error(`Valid tags are: ${[...knownTags].join(', ')}`);
    }
    let manifest = require(`./manifest/${tag}.js`);
    let destRoot = path.normalize(`dist/${tag}/ruff_modules`);
    fs.ensureDirSync(destRoot);
    genModules(tag, manifest, destRoot);
    done();
});

gulp.task('test-modules', () => {
    let tag = argv.tag;
    if (!tag || !knownTags.has(tag)) {
        throw new Error(`Valid tags are: ${[...knownTags].join(', ')}`);
    }
    let testRoot = path.join(__dirname, `dist/${tag}`);

    return Promise
        .invoke(fs.remove, ISTANBUL_COVERAGE_DIR)
        .then(() => Promise.invoke(glob, path.join(testRoot, 'ruff_modules/*/test/**/*test.js')))
        .each(testPath => {
            console.log(`=== ${testPath} ===`);
            let relPath = path.relative(`${testRoot}/ruff_modules`, testPath);
            let moduleName = relPath.replace(/[\\/].+$/, '');
            console.log(relPath, moduleName, testRoot, path.join(process.cwd(), ENGINES[tag]));
            return executeCommand({
                name: path.join(process.cwd(), ENGINES[tag]),
                cwd: tag === 'ruff' ? `${testRoot}/ruff_modules` : testRoot,
                env: {
                    NAME_SERVER: '192.168.31.1'
                },
                args: tag === 'ruff' ? [
                    ISTANBUL_CLI_PATH,
                    'cover',
                    testPath,
                    '--dir',
                    path.join(ISTANBUL_COVERAGE_DIR, moduleName)
                ] : [testPath]
            });
        });
});

gulp.task('dist', gulp.series('build-modules', 'test-modules'));

//------------------------------------------------------------------------------

function genModules(tag, manifest, destRoot) {
    manifest.modules
        .reduce((acc, val) => acc.concat(glob.sync(val)), [])
        .map(val => path.normalize(val)) // change to platform style since glob always return to unix style
        .forEach(dir => {
            let moduleRoot = path.dirname(dir);
            let moduleName = path.basename(dir);
            console.log(chalk.green.bold(`${moduleName}:`));
            // Note:
            // hidden files will be ignored
            getDirFiles(dir, name => !path.basename(name).startsWith('.'))
                .sort()
                .filter(file => {
                    let otherTags = new Set(knownTags);
                    otherTags.delete(tag);
                    let pattern = new RegExp(`\\.(${[...otherTags].join('|')})\\.\\w+$`);
                    return !pattern.test(file);
                })
                .forEach(srcFile => {
                    let destFile = srcFile
                        .replace(new RegExp(`^${moduleRoot.replace(/\\/g, '\\\\')}`), destRoot)
                        .replace(new RegExp(`\\.${tag}\\.(\\w+)$`), '.$1');
                    console.log(srcFile, chalk.gray('->'), destFile);
                    fs.copySync(srcFile, destFile);
                });
        });
}

function getDirFiles(root, filter) {
    let files = [];
    let queue = [root];
    while (queue.length > 0) {
        let front = queue.pop();
        if (filter && !filter(front)) {
            continue;
        }
        let stat = fs.statSync(front);
        if (stat.isFile()) {
            files.push(front);
        } else if (stat.isDirectory()) {
            let children = fs.readdirSync(front);
            queue.push(...children.map(
                child => path.relative('.', path.join(front, child))
            ));
        }
    }
    return files;
}

function executeCommand(command) {
    let proc = spawn(
        command.name,
        command.args || [],
        {
            cwd: command.cwd,
            env: command.env,
            stdio: 'inherit'
        }
    );
    return Promise.for(proc);
}
