var Poll = require('poll');

function GpioInterrupt(gpio) {
    this.gpio = gpio;
    this.started = false;
    this.listeners = Object.create(null);

    if (!this.gpio.interruptInit()) {
        throw new Error('Failed to initialize GPIO interrupt');
    }

    this.fd = this.gpio.interruptGetFd();
    this.poll = new Poll(this.fd);
}

GpioInterrupt.prototype.watch = function (pinNum, gpioInterface, event) {
    if (this.started === false) {
        this.pollStart();
        this.started = true;
    }

    this.listeners[pinNum] = {
        gpio: gpioInterface,
        event: event
    };
};

GpioInterrupt.prototype.unwatch = function (pinNum) {
    delete this.listeners[pinNum];

    if (Object.keys(this.listeners).length === 0) {
        var that = this;
        this.pollStop(function () {
            that.started = false;
        });
    }
};

GpioInterrupt.prototype.pollStart = function () {
    var that = this;
    this.poll.start(Poll.READ_EVENT, function () {
        var intEvents = that.gpio.interruptGetEvents(that.fd);
        intEvents.forEach(function (intEvent) {
            var pinNum = intEvent[0];
            var value = intEvent[1];
            var gpioInterface = that.listeners[pinNum].gpio;
            var event = that.listeners[pinNum].event;
            gpioInterface.emit(event, value);
        });
    });
};

GpioInterrupt.prototype.pollStop = function (callback) {
    this.poll.stop(function () {
        this.poll.close();
        callback();
    });
};

module.exports = GpioInterrupt;
