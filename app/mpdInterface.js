var mpd = require('mpd'),
    cmd = mpd.cmd;
var client = mpd.connect({
    port: 6600,
    host: 'localhost'
});

module.exports = function (command) {
    return function(req,res,next){
        client.sendCommand(cmd(command, []), function (err, msg) {
            if(err) throw err;
            res.msg = msg;
            return next();
        });
    }
};