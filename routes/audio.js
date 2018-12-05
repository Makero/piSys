var express  = require('express');
var router   = express.Router();
var fs       = require('fs');
var upload   = require('../api/upload.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('audio');
});

/* 上传文件*/
router.post('/', function(req, res, next){
	var fileType = req.headers.accept;
	console.log(fileType);
	upload(req,"pi-command/",function(){
		
	});   
	res.redirect("/audio");
});

module.exports = router;