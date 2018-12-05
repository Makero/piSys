$(function(){
	var arr = range(1,40);
	for(i in arr){
		$(".gpio ul").append("<li id='IO"+arr[i]+"'><i>"+arr[i]+"</i><em></em></li>");
	}

	//VCC   +5v
	colour([2,4],"#FC1C21");
	//VCC   +3.3v
	colour([1,17],"#FA7E50");
	//ID_SD    ID_SC
	colour([27,28],"#D3D32E");
	//GND
	colour([6,9,14,20,25,30,34,39],"#000");
	//wiring
	wiring([[3,8],[5,9],[7,7],[8,15],[10,16],[11,0],[12,1],[13,2],[15,3],[16,4],[18,5],[19,12],[21,13],[22,6],[23,14],[24,10],[26,11],[29,21],[31,22],[32,26],[33,23],[35,24],[36,27],[37,25],[38,28],[40,29]]);


	function wiring(arr){
		for(i in arr){
			$("em","#IO"+arr[i][0]).text(arr[i][1]);
		}
	}

	function colour(arr,color){
		for(i in arr){
			$("i","#IO"+arr[i]).css("background",color);
		}
	}
	function range(m,n){
		var arr = new Array();
		var i   = m;
		for(i;i<=n;i++){
			arr.push(i);
		}
		return arr;
	}
	

	$(".selBtn button").click(function(){
		var name = $(this).text();
		if(name == "python"){
			var progr = "import RPi.GPIO as GPIO\n";
			progr += "GPIO_PIN = 40\n"
			progr += "GPIO.setmode(GPIO.BOARD)	#设置引脚的编码格式\n"
			progr += "GPIO.setwarnings(False)	#设置不提示警告信息\n"
			progr += "GPIO.setup(GPIO_PIN,GPIO.OUT)	#设置引脚为输出\n"
			progr += "GPIO.output(GPIO_PIN,GPIO.LOW) 	#将引脚置为高或低电平\n"
			var suff  = "py";
		}else{
			var progr = "#include<wiringPi.h>";
			var suff  = "c";
			$(".run button").attr("data-type","0");
		}
		$("#proName").text(name+" 程序").removeClass("dis").attr("data-type",suff);
		$(".btnBox").addClass("dis");
		$("#exeBtn").removeClass("dis");
		$("#program").focus().val(progr);
	});

	//清空运行结果
	$(".clean").click(function(){
		$("#terminal").html("");
	});

	//清除
	$(".clear").click(function(){
		if($("#program").val()){
			code = $("#program").val();
		}
		$("#program").focus().val("");
		$(".cancel").removeClass("dis");

	});
	//还原
	$(".cancel").click(function(){
		$("#program").focus().val(code);
		$(this).addClass("dis");
	});
	//运行
	$(".run").click(function(){
		code     = $("#program").val();
		var type = $("button",this).attr("data-type");
		var suff = $("#proName").attr("data-type");
		var n    = 1;

		//写入文件
		$.ajax({
			url:"/write",
			type:"post",
			data:{code:code,suff:suff},
			success:function(data){
				$("#terminal").append("<pre>"+data+"</pre>");
				//编译代码
				if(type == "0"){
					$.ajax({
						url:"/compile",
						type:"post",
						async:false,
						success:function(data){
							if(data == "1"){
								$("#terminal").append("<pre>代码编译-------------------------------------------------[ ok ]</pre>");
							}else{
								$("#terminal").append("<pre></pre>");
								$("#terminal pre:last-child").text("代码编译-------------------------------------------------[ no ]\n"+data);
								n = 0;
							}
						}
					});
				}
				if(!n) return;
				//运行
				$.ajax({
					url:"/run",
					type:"post",
					data:{suff:suff},
					success:function(data){
						$("#terminal").append("<pre></pre>");
						$("#terminal pre:last-child").text("================ 运行结果 ===============\n"+data);
						$("#terminal").scrollTop($('#terminal')[0].scrollHeight);
					}
				});
			}
		});
	});

});

var code = "";
//tab键
function tab(obj){
  if (event.keyCode == 9)
  {
     obj.value = obj.value + "    ";
     event.returnValue = false;
  }
}