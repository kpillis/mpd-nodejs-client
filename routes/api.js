var express = require('express');
var router = express.Router();

/* MIDDLEWARES */
var mpdToJSON = require('../middleware/mpdToJSON');
var mpdListToJSON = require('../middleware/mpdListToJSON');
var respond = require('../middleware/respond');

/* MPD QUERIES*/
var mpdInterface = require('../app/mpdInterface');


/* GET home page. */
router.get('/current', mpdInterface("currentsong"), mpdToJSON(), respond());

router.post('/play', mpdInterface("play"), function (req, res, next) {
    res.sendStatus(200);
});

router.post('/play/:trackId',
    function (req, res, next) {
        var mpdParams = [];
        mpdParams.push(req.params.trackId);
        res.mpdParams = mpdParams;
        return next();
    },
    mpdInterface("playid"),
    function (req, res, next) {
        res.sendStatus(200);
    }
);

router.post('/pause', mpdInterface("pause"), function (req, res, next) {
    res.sendStatus(200);
});

router.post('/next', mpdInterface("next"), function (req, res, next) {
    res.sendStatus(200);
});

router.post('/previous', mpdInterface("previous"), function (req, res, next) {
    res.sendStatus(200);
});

router.post('/toggle-repeat',
    mpdInterface("status"),
    mpdToJSON(),
    function (req, res, next) {
        var repeat = res.JSON.repeat;
        if (repeat == 0) {
            res.mpdParams = [1];
        } else {
            res.mpdParams = [0];
        }
        return next();
    },
    mpdInterface("repeat"),
    function (req, res, next) {
        res.sendStatus(200);
    }
);

router.post('/toggle-random',
    mpdInterface("status"),
    mpdToJSON(),
    function (req, res, next) {
        var random = res.JSON.random;
        if (random == 0) {
            res.mpdParams = [1];
        } else {
            res.mpdParams = [0];
        }
        return next();
    },
    mpdInterface("random"),
    function (req, res, next) {
        res.sendStatus(200);
    }
);

router.get('/playlist',
    mpdInterface("playlistinfo"),
    mpdListToJSON(),
    function (req, res, next) {
        res.json(res.JSON);
    }
);


router.get('/status', mpdInterface("status"), mpdToJSON(), respond());

router.get('/seek-percent',
    mpdInterface("status"),
    mpdToJSON(),
    function (req, res, next) {
        var seek = {};
        seek.elapsed = res.JSON.elapsed;
        res.seek = seek;
        return next();
    },
    mpdInterface("currentsong"),
    mpdToJSON(),
    function (req, res, next) {
        res.seek.total = res.JSON.Time;
        res.JSON = res.seek;
        return next();
    },
    respond()
);


module.exports = router;
