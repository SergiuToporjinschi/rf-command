var rf = require('./rf/rf');
module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            //msg.payload = "test";
            console.log(config);
            console.log(config.gpio);
            console.log(config.initSeq);
            rf.setGPIO(config.gpio);
            node.send(null);
        });
    }
    RED.nodes.registerType("rf-command",LowerCaseNode);
};


//var gpio = require('rpi-gpio');
//gpio.setup(7, gpio.DIR_IN, readInput);
//function readInput() {
//    gpio.read(7, function(err, value) {
//        console.log('The value is ' + value);
//    });
//}