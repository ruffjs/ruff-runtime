'use strict';

var trait = require('trait');

var reader = trait({
    /**
     * Start streaming.
     */
    stream: function () {
        var that = this;

        readNext();

        function readNext() {
            that.read(function (error, data) {
                if (error) {
                    that.emit('error', error);
                } else {
                    that.emit('data', data);
                    readNext();
                }
            });
        }
    },
    read: trait.required,
    emit: trait.required
});

module.exports = reader;
