var rf = require('./rf/rf');
var sleep = require('sleep');

module.exports = function (RED) {

    function sendInit(conf, node) {
        console.log("sending init");
        if (!conf.initSeq) {
            return;
        }
        node.send({payload: "1"});
        sleep.usleep(conf.initTimeHigh);

        node.send({payload: "0"});
        sleep.usleep(conf.initTimeLow);
    }

    function sendCommand(cmd, conf, node) {
        var sentCount = 0;
        for (var i in cmd) {
            if (conf.initSeq && sentCount == conf.cmdLength) {
                sendInit(conf, node);
            }
            if (cmd[i] === '1') {
                sentCount++;
                node.send({payload: "1"});
                sleep.usleep(conf.highTime1);
                node.send({payload: "0"});
                sleep.usleep(conf.lowTime1);
            } else if (cmd[i] === '0') {
                sentCount++;
                node.send({payload: "1"});
                sleep.usleep(conf.highTime0);
                node.send({payload: "0"});
                sleep.usleep(conf.lowTime0);
            }
        }
        console.log(sentCount);
    }

    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            console.log(config);
            sendInit(config, node);
            sendCommand(msg.payload, config, node);
            console.log('Finished');
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