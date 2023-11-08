# Ruff API
This is the registry where to store Ruff Javascript modules, which expected to be shared by Ruff, Ruff Lite and other Ruff Projects.

## Folder Hierarchy
* `doc`
    API document
* `boot`
    Bootstrap stuff for different projects(Ruff, Ruff Lite)
* `core`
    All build-in modules
* `ext`
    Extend modules for each project
* `interface`
    Interface modules(gpio,i2c,pwm, ...)
* `driver`
    Build-in drivers for each project if exist


## Javascript File Naming for modules
For this registry is designed to support different projects, in idea case different projects could use exactly the same code. The fact is that, in most case the logical/file could be shared by different projects, and there do exists project specific logical or files. To survival in case, we designed following name rules:

- For OS independent file, use ".js", ".json", ".md" as suffix
- For OS specific file, prepend ".ruff", ".rufflite" to suffix
- When using `require(...)` or any other file name related routines, OS tag should be stripped
- If an entire directory is there only for one specific OS, tag is not required

## Download ruff\_mcu
``` shell
git clone git@git.nanchao.org:Ruff/ruff-api.git
git flow init (press Enter by default)
git branch --set-upstream-to=origin/develop develop
git pull
```

## Install tools

### gulp
``` shell
npm install -g gulp
npm install
```


## Build

### API Doc

``` shell
gulp dist
```

### Ruff Modules

```shell
npm run dist
```

### Ruff Lite Modules

```shell
npm run dist-lite
```
