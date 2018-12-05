var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

function Upload(req,path,callback){
  var absPath = path;
  if(!fs.existsSync(absPath)){
    console.log("文件夹不存在，正在创建...");
    try{
      fs.mkdirSync(absPath);
    }catch(e){
      console.log("文件夹创建失败!");
      return;
    }
  }
//生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: absPath});

  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);
    if(err){
        console.log('parse error: ' + err);
    }else{
        console.log('parse files: ' + filesTmp);
        var arr = new Array;
        for(var n in files.file){
            var dat = new Object;
            var inputFile = files.file[n];
            var uploadedPath = inputFile.path;
            var filename = "temp.wav";
            var dstPath = absPath + filename;
            if(!fs.existsSync(dstPath)){
              dat.name = filename;
              dat.path = dstPath;
              arr[n] = dat;
            }
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                  console.log('rename error: ' + err);
                } else {
                  console.log('rename ok');
                }
            });
        }
        callback();
    }
  });
}

module.exports = Upload; 