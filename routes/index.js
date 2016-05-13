var express = require('express');
var router = express.Router();

var mpd = require('mpd'),
    cmd = mpd.cmd
var client = mpd.connect({
    port: 6600,
    host: 'localhost',
});

client.on('ready', function () {
    console.log("Connected to MPD");
});

client.on('system-player', function () {

    client.sendCommand(cmd("playlistinfo", []), function (err, msg) {
        console.log(msg);
    });
});


/* GET home page. */
router.get('/', function (req, res, next) {
    var currentSong = null;
    client.sendCommand(cmd("currentsong", []), function (err, msg) {
        if (err) throw err;
        currentSong = msg.split('\n');
        var jsonString = "{";
        for (var i = 0; i < currentSong.length; i++) {
            line = currentSong[i];
            if (line != "") {
                if (i != 0) {
                    jsonString = jsonString.concat(",");
                }
                var lineItems = line.split(':');
                jsonString = jsonString.concat("\"" + lineItems[0] + "\":" + "\"" + lineItems[1] + "\"");
            }

        }
        jsonString = jsonString.concat("}");
        var songJSON = JSON.parse(jsonString);
        res.render('index', {currentSong: songJSON});
    });
});

router.use('/play', function (req, res, next) {
    client.sendCommand(cmd("play", []), function (err, msg) {
        if (err) throw err;
        res.redirect('/');
    });
});

router.use('/pause', function (req, res, next) {
    client.sendCommand(cmd("pause", []), function (err, msg) {
        if (err) throw err;
        res.redirect('/');
    });
});

router.use('/next', function (req, res, next) {
    client.sendCommand(cmd("next", []), function (err, msg) {
        if (err) throw err;
        res.redirect('/');
    });
});

router.use('/previous', function (req, res, next) {
    client.sendCommand(cmd("previous", []), function (err, msg) {
        if (err) throw err;
        res.redirect('/');
    });
});

router.use('/playlist', function (req, res, next) {
    var playListInfo = null;
    client.sendCommand(cmd("playlistinfo", []), function (err, msg) {
        if (err) throw err;
        playListInfo = msg.split('\n');
        var jsonString = "[{";
        for (var i = 0; i < playListInfo.length; i++) {
            var line = playListInfo[i];
            if (line != "") {
                if (i!= 0 && line.indexOf("file")> -1) {
                    jsonString = jsonString.concat('},{');
                } else if(i!= 0){
                    jsonString = jsonString.concat(",");
                }

                var lineItems = line.split(':');
                jsonString = jsonString.concat("\"" + lineItems[0] + "\":" + "\"" + lineItems[1] + "\"");
            }
        }
        jsonString = jsonString.concat("}]");
        var playlistJSON = JSON.parse(jsonString);
        res.render('playlist', {playlist: playlistJSON});
    });
});

router.use('/status', function (req, res, next) {
    var status = null;
    client.sendCommand(cmd("status", []), function (err, msg) {
        if (err) throw err;
        status = msg.split('\n');
        var jsonString = "{";
        for (var i = 0; i < status.length; i++) {
            var line = status[i];
            if (line != "") {
                if (i != 0) {
                    jsonString = jsonString.concat(",");
                }
                var lineItems = line.split(':');
                jsonString = jsonString.concat("\"" + lineItems[0] + "\":" + "\"" + lineItems[1] + "\"");
            }
        }
        jsonString = jsonString.concat("}");
        var statusJSON = JSON.parse(jsonString);
        res.render('status', {status: statusJSON});
    });
});

module.exports = router;
