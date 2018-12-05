var express 	  = require('express');
var router  	  = express.Router();
var child_process = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('control');
});

//语音
router.post('/ajax/talk', function(req, res, next){
    var command = 'python3 pi-command/synthesis.py "'  + req.body.say +'"';
    child_process.exec(command, function(err, stdout, stderr){
		if(err) throw err;
        res.send(stderr||"1");
    });
});

//设备
router.post('/ajax/device', function(req, res, next){
    console.log(req.body);
});



module.exports = router;