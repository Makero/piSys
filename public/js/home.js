(function(){
	$(".talk-btn").click(function(){
		$(".speech").toggle();
		$(".btns").toggle();
		var t1 = $(this).text();
		var t2 = $(this).attr("data");
		$(this).attr("data",t1);
		$(this).text(t2);
	});
	var jsn = new Object();
	$("#control li").each(function(){
		var str = $("label",this).attr("speech");
		var pin = $("span",this).attr("device").split(":")[1];
		jsn[str] = pin;
	});
	jsn = JSON.stringify(jsn);
	
	$(".speech").click(function(){
		speak("主人，请和我说话吧");
		var recorder;
		HZRecorder.get(function (rec) {
	        recorder = rec;
	    });
		$(".layer").show();
		setTimeout(function(){
			recorder.start();
			$("#tit").text("");
			$("#talk").text("正在监听中...");
		},3000);
		setTimeout(function(){
			recorder.stop();
			$("#talk").text("正在识别中，请稍等...");
			recorder.upload("/audio",function(sta,e){
				if(sta == "ok"){
					$.ajax({
						url:"/home/speech",
						type:"post",
						data:{"jsn":jsn},
						success:function(dat){
							if(dat == "-1"){
								$("#talk").text("识别失败啦~");
								speak("主人，由于网络延时我无法听懂你说的是什么");
							}else if(dat == "-2"){
								$("#talk").text("识别失败啦~");
								speak("主人，你在说什么");
							}else{
								$("#talk").text("识别成功");
								speak("好的，主人");
								$("#ttx").text(dat);
							}
							setTimeout(function(){
								$(".layer").hide();
								$("#tit").text("");
								$("#talk").text("正在加载...");
								$("#ttx").text("");
							},2000);
						}
					});
				}
			});
		},7000);
	});

	function speak(textToSpeak) {
		try{
			//创建一个 SpeechSynthesisUtterance的实例
			var newUtterance = new SpeechSynthesisUtterance();

		   // 设置文本
		   newUtterance.text = textToSpeak;

		   // 添加到队列
		   window.speechSynthesis.speak(newUtterance);
		}catch(err){
			console.log(err);
		}		   
	}
})();