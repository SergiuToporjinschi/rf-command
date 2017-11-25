var rf = require('./rf/rf');
//var gpio = require('rpi-gpio');
//var async = require('async');
var sleep = require('sleep');

module.exports = function (RED) {

//    function getSeq(cod, config) {
//        var stack = [];
//        for (var i = 0; i < cod.length; i++){
//            if (cod[i] === '1') {
//                stack.concat(function () {getBit1(config);});
//            } else if (cod[i] === '0') {
//                stack.concat(function () {getBit0(config);});
//            }
//        }
//        return stack;
//    }
//    function getBit1(config){
//        console.log('1');
//        delayedWrite(config.gpio, true, 0);
//        delayedWrite(config.gpio, false, config.highTime1);
//        delayedWrite(config.gpio, false, config.lowTime1);
//    }
//    function getBit0(config){
//        console.log('0');
//        delayedWrite(config.gpio, true, 0);
//        delayedWrite(config.gpio, false, config.highTime0);
//        delayedWrite(config.gpio, false, config.lowTime0);
//    }
//        [
//                function (callback) {
//                    delayedWrite(7, true, callback);
//                },
//                function (callback) {
//                    delayedWrite(7, true, callback);
//                },
//                function (callback) {
//                    delayedWrite(7, true, callback);
//                },
//                function (callback) {
//                    delayedWrite(7, false, callback);
//                },
//                function (callback) {
//                    delayedWrite(7, false, callback);
//                },
//                function (callback) {
//                    delayedWrite(7, false, callback);
//                }
//        ],


//    function execute(codExec) {
//        async.series(codExec, function (err, results) {
//            console.log('Writes complete, pause then unexport pins');
//            setTimeout(function () {
//                console.log('Closed pins, now exit');
////                gpio.destroy(function () {
////                    console.log('Closed pins, now exit');
////                });
//            }, 500);
//        });
//    }
//
//    function delayedWrite(pin, value, ms, callback) {
//        console.log("Write at " + pin + ' value' + value);
//        RED.log("*Write at " + pin + ' value' + value);
//        setTimeout(function () {
//            console.log("Write at " + pin + ' value' + value);
////            gpio.write(pin, value, callback);
//        }, ms);
//    }
//
//    function getInit(pin, lowTime, highTime) {
//        return [
//            function (callback) {
//                delayedWrite(pin, true, 0, callback);
//                delayedWrite(pin, false, highTime, callback);
//            },
//            function (callback) {
//                delayedWrite(pin, false, 0, callback);
//                delayedWrite(pin, false, lowTime, callback);
//            }
//        ];
//    }
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            console.log(config);
            node.send({payload:"1"});
            sleep.usleep(config.initTimeHigh);
            node.send({payload:"0"});
            sleep.usleep(config.initTimeLow);

            //msg.payload = "test";
            console.log(config);
            console.log(msg);
            console.log(config.initSeq);

//            var cod = [];
//            if (config.initSeq) {
//                cod.concat(getInit(config.gpio, config.initTimeLow, config.initTimeHigh));
//            }
//            cod.concat(getSeq(msg.payload, config));
//            console.log(cod);
//            execute(cod);
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