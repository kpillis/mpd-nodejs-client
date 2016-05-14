var express = require('express');
var router = express.Router();

var mpdInterface = require('../app/mpdInterface');
var mpdToJSON = require('../middleware/mpdToJSON');
var renderMW = require('../middleware/renderMW');

/* GET home page. */
router.get('/', renderMW('current'));

router.get('/current', renderMW('current'));

router.get('/playlist', renderMW('playlist'));

router.get('/status', mpdInterface("status"), mpdToJSON(), function (req, res, next) {
    res.render('status', {status: res.JSON});
});

module.exports = router;
