var ExecShell = require('./ExecShell');
module.exports = function (RED) {
    function RFCommand(config) {
        RED.nodes.createNode(this, config);
        var self = this;
        var exec = new ExecShell(RED.settings.userDir);
        self.status({fill: "green", shape: "dot", text: "Ready"});
        self.on('input', function (msg) {
            try {
                self.status({fill: "blue", shape: "dot", text: "Init script"});
                exec.init(config,
                        function (msg) {
                            this.send({payload: msg});
                        }.bind(self));
                self.status({fill: "blue", shape: "dot", text: "Executing script"});
                exec.do(msg.payload.split(' ').join(''));
                self.status({fill: "green", shape: "dot", text: "Ready"});
            } catch (error) {
                self.status({fill: "red", shape: "dot", text: error});
                RED.log.error(error);
            }
            self.send(null);
        });
    }
    RED.nodes.registerType("rf-command", RFCommand);
};