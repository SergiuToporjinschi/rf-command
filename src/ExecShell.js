function ExecShell(userDir) {
    this.file = userDir + '/node_modules/node-red-contrib-rf-command/src/BinarySend.py';
    this.spawn = require('child_process').spawn;
}

ExecShell.prototype.init = function (config, out) {
    this.out = out;
    this.param = this.getParams(config);
};

ExecShell.prototype.getParams = function (config) {
    var params = [];

    if (config.initSeq && (!config.initTimeHigh || !config.initTimeHigh)) {
        throw 'Init sequence is active but not configured';
    } else {
        params.push('-o ' + config.initSeq);
    }

    if (!config.gpio || Number.parseInt(config.gpio) <= 0) {
        throw 'GPIO needs to be a positive number';
    } else {
        params.push('-p ' + Number.parseInt(config.gpio));
    }

    if (config.gpioType) {
        params.push('-t ' + config.gpioType);
    }

    if (Number.parseFloat(config.initTimeHigh) < 0) {
        throw 'Initialization bit timing needs to be >= 0';
    } else {
        params.push('-u ' + Number.parseFloat(config.initTimeHigh));
    }

    if (Number.parseFloat(config.initTimeHigh) < 0) {
        throw 'Initialization bit timing needs to be >= 0';
    } else {
        params.push('-d ' + Number.parseFloat(config.initTimeLow));
    }

    if (Number.parseFloat(config.bitLongTime) < 0) {
        throw 'Bit timing needs to be >= 0';
    } else {
        params.push('-m ' + Number.parseFloat(config.bitLongTime));
    }

    if (Number.parseFloat(config.bitShortTime) < 0) {
        throw 'Bit timing needs to be >= 0';
    } else {
        params.push('-l ' + Number.parseFloat(config.bitShortTime));
    }

    if (Number.parseFloat(config.repeater) < 0) {
        throw 'repeater needs to be >= 0';
    } else {
        params.push('-n ' + Number.parseFloat(config.repeater));
    }

    if (Number.parseFloat(config.repeaterPause) < 0) {
        throw 'Repeater pause needs to be >= 0';
    } else {
        params.push('-e ' + Number.parseFloat(config.repeaterPause));
    }

    if (Number.parseInt(config.cmdLength) < 0) {
        throw 'Command length needs to be >= 0';
    } else {
        params.push('-b ' + Number.parseInt(config.cmdLength));
    }

    return params;
};

ExecShell.prototype.do = function (cmd) {
    cmd = cmd || '';
    if (typeof cmd !== 'string') {
        throw 'Command is not a string';
    }
    var parameters = [this.file, cmd].concat(this.param);
    if (this.out) {
        this.out(parameters.join(' '));
    }

    var exec = this.spawn('python', parameters);

    if (this.out) {
        exec.stdout.on('data', function (msg) {
            this.out(msg.toString());
        }.bind(this));
    }
    exec.stderr.on('data', function (error) {
        this.status({fill:"red",shape:"ring",text:error.toString()});
        this.out(error.toString());
    }.bind(this));

    exec.on('close', function (code) {
        this.out('Shell closed with code:' + code);
    }.bind(this));
};
module.exports = ExecShell;