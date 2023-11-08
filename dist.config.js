/* eslint-env es6 */

'use strict';

module.exports = [
    {
        name: 'ruff',
        plugins: ['henge-ruff-jenkins'],
        platform: process.platform,
        dependencies: [
            {
                name: 'rap',
                job: 'odin-cross-platform',
//                branch: 'master',
                multiplatform: true,
                kit: true
            },
            {
                name: 'ruff_modules/ruff-mock',
                github: 'ruffjs/ruff-mock'
            },
            {
                name: 'native-modules',
                job: 'native-modules-cross-platform',
                multiplatform: true,
                kit: true
            }
        ],
        procedures: [
            {
                description: 'Build ruff-api project',
                task: {
                    name: 'gulp',
                    args: ['build-ruff-api']
                }
            },
            {
                description: 'Clean build',
                task: {
                    name: 'gulp',
                    args: ['clean']
                }
            },
            {
                description: 'Generate ruff-compiler project',
                task: {
                    name: 'gulp',
                    args: ['generate-ruff-compiler']
                }
            },
            {
                description: 'Build ruff-compiler project',
                task: {
                    name: 'gulp',
                    args: ['build-ruff-compiler']
                }
            },
            {
                description: 'Generate ruff project',
                task: {
                    name: 'gulp',
                    args: ['generate-ruff']
                }
            },
            {
                description: 'Build ruff project',
                task: {
                    name: 'gulp',
                    args: ['build-ruff']
                }
            },
            {
                description: 'Prepare ruff modules',
                task: {
                    name: 'gulp',
                    args: ['prepare-modules']
                }
            },
            {
                description: 'Install Rap dependencies',
                task: 'deps-rap-install'
            },
            {
                description: 'Copy native modules',
                task: {
                    name: 'gulp',
                    args: ['copy-native-modules']
                }
            },
            {
                description: 'Test ruff modules',
                task: {
                    name: 'gulp',
                    args: ['test-modules']
                }
            },
            {
                description: 'Generate ruff modules coverage report',
                task: {
                    name: 'istanbul',
                    args: ['report', 'json']
                }
            },
            {
                description: 'Check ruff modules coverage',
                task: {
                    name: 'istanbul',
                    args: [
                        'check-coverage',
                        '--statements', '60',
                        '--branches', '60',
                        '--functions', '60',
                        '--lines', '60'
                    ]
                }
            },
            {
                description: 'Build ruff documentations',
                task: {
                    name: 'gulp',
                    args: ['build-docs']
                }
            }
        ],
        artifact: {
            files: [
                // bin
                {
                    baseDir: 'build/ruff',
                    pattern: 'bin/**'
                },
                // ruff_modules
                {
                    baseDir: 'build/ruff',
                    pattern: 'ruff_modules/**'
                },
                // doc
                {
                    baseDir: 'build/ruff',
                    pattern: 'doc/**'
                },
                {
                    pattern: 'modules/ruff_scripts/api_assets/**',
                    path: 'doc/assets/'
                }
            ]
        }
    },
    {
        name: 'ruff-embedded',
        plugins: ['henge-ruff-jenkins'],
        platforms: '{configUrl}/embedded-platforms.json',
        procedures: [
            {
                description: 'Clean build',
                task: {
                    name: 'gulp',
                    args: ['clean']
                }
            },
            {
                description: 'Generate ruff-compiler project',
                task: {
                    name: 'gulp',
                    args: ['generate-ruff-compiler']
                }
            },
            {
                description: 'Build ruff-compiler project',
                task: {
                    name: 'gulp',
                    args: ['build-ruff-compiler']
                }
            },
            {
                description: 'Build ruff-api project',
                task: {
                    name: 'gulp',
                    args: ['build-ruff-api']
                }
            },
            {
                description: 'Generate ruff project',
                task: {
                    name: 'gulp',
                    env: {
                        RUFF_CMAKE_CC: '{cc}',
                        RUFF_CMAKE_ARCH: '{arch}'
                    },
                    args: [
                        'generate-ruff',
                        '--embedded',
                        '--platform', '{platform}'
                    ]
                },
                multiplatform: true
            },
            {
                description: 'Build ruff project',
                task: {
                    name: 'gulp',
                    args: [
                        'build-ruff',
                        '--embedded',
                        '--platform', '{platform}'
                    ]
                },
                multiplatform: true
            },
            {
                description: 'Prepare ruff modules',
                task: {
                    name: 'gulp',
                    args: [
                        'prepare-modules',
                        '--embedded'
                    ]
                }
            },
            {
                description: 'Prepare node modules',
                task: {
                    name: 'gulp',
                    args: ['prepare-node-modules']
                }
            }
        ],
        artifact: {
            files: [
                {
                    baseDir: 'build/ruff-{platform}',
                    pattern: 'bin/**'
                },
                {
                    baseDir: 'build/ruff',
                    pattern: 'ruff_modules/**'
                },
                {
                    baseDir: 'build/ruff',
                    pattern: 'node_modules/**'
                }
            ]
        }
    }
];
