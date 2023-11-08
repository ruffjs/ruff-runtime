# Ruff

Ruff is a JavaScript runtime built for hardware development.

## Requirements

* Node.js 6
* CMake 2.8

## Install submodule

* Install required modules

```sh
git submodule update --init --recursive
```

### Install dependencies

```sh
# Install npm dependencies
npm install
# Install rap dependencies
rap install
```

## Build

Please see `procedures` field in `dist.config.js` and find related gulp tasks.
E.g., `clean`, `generate-*`, `build-*` and `prepare-modules`.

## Test

Run all tests:

```sh
npm run test # or `gulp test-modules`
```

Generate coverage report:

```sh
npm run report
```

### Distribute

```sh
# Desktop
npm run dist

# Embedded (see note below)
npm run dist-embedded
```

**Note:** to build embedded ruff on your PC, you need to configure platforms
with proper toolchain variables. Check out the files and links below to
understand how:

- http://git.nanchao.org:3000/Ruff/henge-ruff-jenkins#local-configuration-url

  **Hint:** Add `--` between `npm run <script-name>` and additional arguments.
  For example, to have `henge dist ruff-embedded --local` executed, you should
  write `npm run dist-embedded -- -local`.

- `dist.config.js` (find `{configUrl}`)
- http://git.nanchao.org:3000/Ruff/build-config/src/master/embedded-platforms.json
  (the configuration will be provided as Jenkins artifact, see the
  [config](http://jenkins.nanchao.org:8080/job/config-develop/) job on Jenkins)


## Build with Android NDK toolchain

Due to libuv build tool **gyp** limitation on Mac OS, ruff can only built on Linux platform using Android NDK toolchain.

NDK toolchains support `armv7/armv8/i386/amd64/mips/mips64` ISAs. Theoretically speaking, we can built binary ruff with them, but now we just support **armv7**.

Before build, you need export these following two environment variables `RUFF_CAMKE_CC` and `ANDROID_NDK_HOME`.

Example (on _ruff-node_ machine):

```sh
$ ssh ruff@192.168.31.11 (pass: asd)
$ cd forYoung/ruff-android
$ export RUFF_CMAKE_CC=/data/arm-linux-androideabi-4.9/bin/arm-linux-androideabi-gcc
$ export ANDROID_NDK_HOME=/data/android-ndk-r10e
$ ./build.sh
```
You can get armv7 binary ruff under **build/ruff/bin** directory.

> Q: How to generate standlaone toolchain directory like `/data/arm-linux-android-4.9`?
>
> A: Use NDK tool make-standalone-toolchain.sh script, refer to the following example.
>
> ```sh
> $ ./android-ndk-r10e/build/tools/make-standalone-toolchain.sh --toolchain=arm-linux-androideabi-4.9 --arch=arm --install-dir=./arm-linux-androideabi-4.9 --platform=android-21
> ```

