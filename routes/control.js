var express 	  = require('express');
var router  	  = express.Router();
var child_process = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('control');
});

router.post('/ajax/talk', function(req, res, next){
    console.log(req.body.say);
    var command = 'python3 pi-command/synthesis.py "'  + req.body.say +'"';
    child_process.exec(command, function(err, stdout, stderr){
		if(err) throw err;
        res.send(stderr||"1");
    });
});


module.exports = router;