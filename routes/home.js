var express 	  = require('express');
var child_process = require('child_process');
var router  	  = express.Router();

router.get('/', function(req, res, next) {
	res.render('home');
});

//手动操控
router.post('/', function(req, res, next) {
	var devs     = req.body.device;
	var onff     = req.body.status;
	Control(devs,onff);
	res.send("");
});

//语音操控
router.post('/speech', function(req, res, next) {
	var data = eval("("+req.body.jsn+")");
	var command = "python3 pi-command/speech.py";
	child_process.exec(command, function(err, stdout, stderr){
		if(stderr){
			console.log(stderr);
			res.send("-1");
		}else{
			console.log(stdout);
			var speech_obj = eval("["+ stdout +"]")[0];
			if(speech_obj.err_msg == "success." && speech_obj.result[0].length > 1){
				var talk_str = speech_obj.result[0];
				res.send(talk_str);
			}else{
				res.send("-2");
				return false;
			}

			var dev   = "";
			var onff  = 0;
			var pin = "";

			if( Match(talk_str,['灯']) ){
				dev = "led";
			}else if( Match(talk_str,['音乐']) ){
				dev = "music";
			}else{
				return false;
			}

			if( Match(talk_str,['关', '停']) ){
				onff = 0;
			}else if( Match(talk_str,['开', '播放']) ){
				onff = 1;
			}else{
				return false;
			}

			if( Match(talk_str,['所有', '全部']) ){
				for(var key in data){
					pin += data[key]+",";
				}
				pin = pin.substring(0,pin.length - 3);				
			}else{
				for(var key in data){
					if( Match(talk_str,[key]) ){
						pin = data[key];
						break;
					}
				}
			}

			Control(dev+":"+pin,onff);
		}
	});
});

//匹配
function Match(str,arr){
	var count = 0;
	for(i in arr){
		if(str.match(".*"+ arr[i] +".*")){
			count++;
			break;
		}
	}
	return count > 0 ? true : false;
}

//控制
function Control(devs,onff){
	var pin      = devs.split(":")[1];
	var dev      = devs.split(":")[0];
	var program  = {"led":"led.py","music":"music.sh"}
	var on_off   = {"0":"off","1":"on"};
	var suff     = {"py":"python3 ","sh":"./"};
	var filename = "pi-command/"+program[dev];
	var command  = suff[program[dev].split(".")[1]] + filename + " " + pin + " " + on_off[onff];

	console.log("\n程序执行："+command+"\n");
	child_process.exec(command, function(err, stdout, stderr){
		console.log(stderr||stdout);
	});
}

module.exports = router;
