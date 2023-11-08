/* eslint-env es6 */

'use strict';

module.exports = [
    {
        name: 'ruff-api',
        plugins: ['henge-ruff-jenkins'],
        dependencies: [
            {
                name: 'rap',
                job: 'odin-cross-platform',
                branch: 'master',
                multiplatform: true,
                kit: true
            },
            {
                name: 'ruff_modules/ruff-mock',
                github: 'ruffjs/ruff-mock'
            },
            {
                name: 'ruff',
                job: 'ruff-cross-platform',
                multiplatform: true,
                kit: true
            },
            {
                name: 'native-modules',
                job: 'native-modules-cross-platform',
                multiplatform: true,
                kit: true
            },
            {
                name: 'ruff-jerry-x86',
                job: 'ruff-lite-x86',
                multiplatform: true,
                kit: true
            }
        ],
        distDir: 'dist',
        depsDir: '.deps',
        procedures: [
            {
                description: 'Install Rap dependencies',
                task: 'deps-rap-install'
            },
            {
                description: 'Copy native modules to ruff runtime',
                task: {
                    name: 'gulp',
                    args: ['copy-native-modules']
                }
            },
            // ruff
            {
                description: 'clean modules',
                task: {
                    name: 'gulp',
                    args: ['clean', '--tag=ruff']
                }
            },
            {
                description: 'dist modules',
                task: {
                    name: 'gulp',
                    args: ['dist', '--tag=ruff']
                }
            },
            // rufflite
            {
                description: 'clean modules',
                task: {
                    name: 'gulp',
                    args: ['clean', '--tag=rufflite']
                }
            },
            {
                description: 'dist modules',
                task: {
                    name: 'gulp',
                    args: ['dist', '--tag=rufflite']
                }
            }
        ],
        artifact: {
            files: [
                // doc
                {
                    baseDir: 'doc',
                    pattern: '*',
                    path: 'doc/*'
                },
                // ruff
                {
                    baseDir: 'dist/ruff',
                    pattern: 'ruff_modules/**',
                    path: 'ruff/ruff_modules/**'
                },
                // rufflite
                {
                    baseDir: 'dist/rufflite',
                    pattern: 'ruff_modules/**',
                    path: 'rufflite/ruff_modules/**'
                }
            ]
        }
    }

];
