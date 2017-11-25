var rf = require('./rf/rf');
var gpio = require('rpi-gpio');
var async = require('async');

module.exports = function (RED) {

    function write(cod) {
        [
                function (callback) {
                    delayedWrite(7, true, callback);
                },
                function (callback) {
                    delayedWrite(7, true, callback);
                },
                function (callback) {
                    delayedWrite(7, true, callback);
                },
                function (callback) {
                    delayedWrite(7, false, callback);
                },
                function (callback) {
                    delayedWrite(7, false, callback);
                },
                function (callback) {
                    delayedWrite(7, false, callback);
                }
        ],
        
        
        async.series(cod, function (err, results) {
            console.log('Writes complete, pause then unexport pins');
            setTimeout(function () {
                gpio.destroy(function () {
                    console.log('Closed pins, now exit');
                });
            }, 500);
        });
    }

    function delayedWrite(pin, value, ms, callback) {
        setTimeout(function () {
            gpio.write(pin, value, callback);
        }, ms);
    }

    function getInit(lowTime, highTime) {
        return [
            function (callback) {
                delayedWrite(7, true, highTime, callback);
            },
            function (callback) {
                delayedWrite(7, false, lowTime, callback);
            }
        ];
    }
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {

            //msg.payload = "test";
            console.log(config);
            console.log(msg);
            console.log(config.initSeq);
            var cod = [];
            if (config.initSeq) {
                cod.push(getInit(config.initTimeLow, config.initTimeHigh));
            }
            //rf.setGPIO(config.gpio);
            node.send(null);
        });
    }
    RED.nodes.registerType("rf-command", LowerCaseNode);
};


//var gpio = require('rpi-gpio');
//gpio.setup(7, gpio.DIR_IN, readInput);
//function readInput() {
//    gpio.read(7, function(err, value) {
//        console.log('The value is ' + value);
//    });
//}