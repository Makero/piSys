var express = require('express');
var router  = express.Router();
var ppt = require('../pptData');


router.get('/', function(req, res, next) {
    res.render('webPPT',{data:ppt});
});

module.exports = router;