# OS


Provides a few basic operating-system related utility functions.

Use `require('os')` to access this module.

## os.tmpdir()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns the operating system's default directory for temporary files.

## os.homedir()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns the home directory of the current user.

## os.hostname()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns the hostname of the operating system.

## os.uptime()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns the system uptime in seconds.

## os.loadavg()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns an array containing the 1, 5, and 15 minute load averages.

The load average is a measure of system activity, calculated by the operating
system and expressed as a fractional number.  As a rule of thumb, the load
average should ideally be less than the number of logical CPUs in the system.

//TODO windows
The load average is a very UNIX-y concept; there is no real equivalent on
Windows platforms.  That is why this function always returns `[0, 0, 0]` on
Windows.

## os.totalmem()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns the total amount of system memory in bytes.

## os.freemem()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns the amount of free system memory in bytes.

## os.cpus()
<span class="api-platform">Ruff available: v1.6.0</span>

Returns an array of objects containing information about each CPU/core
installed: model, speed (in MHz), and times (an object containing the number of
milliseconds the CPU/core spent in: user, nice, sys, idle, and irq).

Example inspection of os.cpus:

    [ { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 252020,
           nice: 0,
           sys: 30340,
           idle: 1070356870,
           irq: 0 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 306960,
           nice: 0,
           sys: 26980,
           idle: 1071569080,
           irq: 0 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 248450,
           nice: 0,
           sys: 21750,
           idle: 1070919370,
           irq: 0 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 256880,
           nice: 0,
           sys: 19430,
           idle: 1070905480,
           irq: 20 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 511580,
           nice: 20,
           sys: 40900,
           idle: 1070842510,
           irq: 0 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 291660,
           nice: 0,
           sys: 34360,
           idle: 1070888000,
           irq: 10 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 308260,
           nice: 0,
           sys: 55410,
           idle: 1071129970,
           irq: 880 } },
      { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
        speed: 2926,
        times:
         { user: 266450,
           nice: 1480,
           sys: 34920,
           idle: 1072572010,
           irq: 30 } } ]

Note that since `nice` values are UNIX centric in Windows the `nice` values of
all processors are always 0.

## os.networkInterfaces()
<span class="api-platform">Ruff available: v1.6.0</span>

Get a list of network interfaces:

    { lo0:
       [ { internal: true, ip: '::1', family: 'INET6' },
         { internal: true, ip: '127.0.0.1', family: 'INET' },
         { internal: true, ip: 'fe80::1', family: 'INET6' } ],
      en0:
       [ { internal: false,
           ip: 'fe80::a299:9bff:fe0f:7e69',
           family: 'INET6' },
         { internal: false, ip: '192.168.31.141', family: 'INET' } ],
      awdl0:
       [ { internal: false,
           ip: 'fe80::40a2:75ff:fec0:5c1',
           family: 'INET6' } ],
      vboxnet0: [ { internal: false, ip: '192.168.59.3', family: 'INET' } ],
      en4:
       [ { internal: false,
           ip: 'fe80::20e:c6ff:fefe:3487',
           family: 'INET6' },
         { internal: false, ip: '192.168.31.199', family: 'INET' } ] }

Note that due to the underlying implementation this will only return network
interfaces that have been assigned an address.
