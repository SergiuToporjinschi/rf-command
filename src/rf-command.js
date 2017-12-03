var ExecShell = require('./ExecShell');
module.exports = function (RED) {
    function RFCommand(config) {
        RED.nodes.createNode(this, config);
        var self = this;
        var exec = new ExecShell(RED.settings.userDir);
        self.on('input', function (msg) {
            try {
                exec.init(config,
                        function (msg) {
                            this.send({payload: msg});
                        }.bind(self));
                exec.do(msg.payload.split(' ').join(''));
            } catch (error) {
                RED.log.error(error);
            }
            self.send(null);
        });
    }
    RED.nodes.registerType("rf-command", RFCommand);
};
