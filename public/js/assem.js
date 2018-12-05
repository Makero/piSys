(function(){
	$(".switch").append("<em class='switch-toggle'></em>").click(function(){
		var self = this;
		$(this).hasClass("cur") ? $(this).removeClass("cur").attr("status","0") : $(this).addClass("cur").attr("status","1");
		if(!$(this).attr("device")) return false;
		$.ajax({
			url :"/home",
			type:"post",
			data:{status:$(this).attr("status"),device:$(this).attr("device")},
			success:function(dat){
				if(dat){
					alert(dat);
					$(self).hasClass("cur") ? $(self).removeClass("cur") : $(self).addClass("cur");
				}
			},
			error:function(err){
				$(self).hasClass("cur") ? $(self).removeClass("cur") : $(self).addClass("cur");
				if(err.readyState == "4"){
					alert("操作失败");
				}else if(err.readyState == "0"){
					alert("与服务器断开连接");
				}else if(err.readyState == "3"){
					alert("服务器未响应");
				}
			}
		});
	});
})();