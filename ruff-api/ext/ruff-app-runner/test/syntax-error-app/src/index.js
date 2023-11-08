'use strict';

$.end(function() {
    var led0 = $('#led-r');
    led0.turnOff();
});

function ledOn() {
    var led0 = $('#led-r');
    led0.turnOn();
}

function ledOff() {
    var led0 = $('#led-r');
    led0.turnOff();
}

$.ready(function (error) {
    if (error) {
        print(error);
        return;
    }