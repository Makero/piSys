var express = require('express');
var fs      = require('fs');   
var router  = express.Router();
var child_process = require('child_process');


var filename = "pi-command/test";


router.get('/', function(req, res, next) {
	res.render('index');
});

//写入文件
router.post('/write',function(req, res, next){
	var code = req.body.code;
	var suff = req.body.suff;
	fs.writeFile(filename + "." + suff, code, function(err,cont){
		if(err) throw err;
		res.send("程序写入-------------------------------------------------[ ok ]");
	});
});

//编译代码
router.post('/compile',function(req, res, next){
	var command = 'gcc ' + filename + '.c -o ' + filename;
	child_process.exec(command, function(err, stdout, stderr){
		res.send(stderr||"1");
	});
});

//运行程序
router.post('/run',function(req, res, next){
	var suff = req.body.suff;
	if(suff == "py"){
		var command = 'python ' + filename + '.' + suff;
	}else if(suff == "c"){
		var command = filename;
	}
 
	child_process.exec(command, function(err, stdout, stderr){
		res.send(stderr||stdout);
	});
});


module.exports = router;
