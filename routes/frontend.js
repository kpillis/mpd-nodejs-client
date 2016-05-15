var express = require('express');
var router = express.Router();

var mpdInterface = require('../app/mpdInterface');
var mpdListToJSON = require('../middleware/mpdListToJSON');
var renderMW = require('../middleware/renderMW');

/* GET home page. */
router.get('/', renderMW('current'));

router.get('/current', renderMW('current'));

router.get('/playlist', renderMW('playlist'));

router.get('/browse/artists', mpdInterface("list artist"), mpdListToJSON("Album"), renderMW('browseArtists'));
router.get('/browse/albums', mpdInterface("list album"), mpdListToJSON("Artist"), renderMW('browseAlbums'));
router.get('/browse/genres', mpdInterface("list genre"), mpdListToJSON("Genre"), renderMW('browseGenres'));

router.get('/search', renderMW('search'));

router.get('/status', renderMW('status'));

module.exports = router;
