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


function () {
    var codes = {
        commands: {
            up: "00010001",
            down: "00110011",
            stop: "01010101"
        },
        rooms: {
            kitchen: "10000101 00110001 01010010 10000001",
            bedroom: "10000110 00110001 10000101 01010001",
            guestroom: "10000110 00110001 01110111 10100001",
            office: "10000101 00110001 11111000 10110001"
        },
        groups: {
            all: ['kitchen', 'guestroom', 'office', 'bedroom'],
            north: ['bedroom'],
            south: ['kitchen', 'office', 'guestroom'],
            bedrooms: ['guestRoom', 'bedroom'],
            nonBedrooms: ['kitchen', 'office'],
            rooms: ['office', 'guestroom', 'bedroom']
        }
    };
    if (!msg.payload || !msg.payload.trim() || !msg.cmd || !msg.cmd.trim()) {
        return;
    } else {
        msg.payload = msg.payload.toLowerCase().trim();
        msg.cmd = msg.cmd.toLowerCase().trim();
    }
    if (!(msg.cmd in codes.commands)) {
        return;
    }
    var list = [];
    var commands = msg.payload.split("&");
    for (var i = 0; i <= commands.length; i++) {
        var c = commands[i];
        list.push(codes.rooms[c]);
        var group = codes.groups[c];
        for (var i in group) {
            list.push(codes.rooms[group[i]]);
        }
    }
}