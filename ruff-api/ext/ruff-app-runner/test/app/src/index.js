'use strict';

$.ready(function (error) {
    if (error) {
        console.error(error);
        return;
    }

    $('#sr501').on('nearby', function () {
        $('#led-r').turnOn();
    });
});

$.end(function () {
    $('#led-r').turnOff();
});
