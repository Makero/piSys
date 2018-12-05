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

function LED(status){
    return 'python3 pi-command/led.py ' + status;
}
function Camera(status){
    return 'sudo pi-command/camera.sh ' + status;
}
//设备
router.post('/ajax/device', function(req, res, next){
    console.log(req.body);
    var command = '';
    switch(req.body.device){
    	case 'led': command = LED(req.body.status);break;
    	case 'camera': command = Camera(req.body.status);break;
    }
    child_process.exec(command, function(err, stdout, stderr){
		if(err) throw err;
        res.send(stderr||"1");
    });
   
});



module.exports = router;