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

//方向
router.post('/ajax/move', function(req, res, next){
    var command = 'python3 pi-command/car.py "'  + req.body.move +'"';
    child_process.exec(command, function(err, stdout, stderr){
		if(err) throw err;
        res.send(stderr||"1");
    });
});

function LED(status){
    return 'python3 pi-command/led.py ' + status;
}
function Camera(status){
    return 'pi-command/camera.sh ' + status;
}
//设备
router.post('/ajax/device', function(req, res, next){
    var command = '';
    switch(req.body.device){
    	case 'led': command = LED(req.body.status);break;
    	case 'camera': command = Camera(req.body.status);break;
    }
    try{
	    child_process.exec(command);
	}catch(e){
		console.log(e);
	}
	setTimeout(function(){
		res.send("1");
	},1000);
});



module.exports = router;