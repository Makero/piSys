/*
/*配置网站地址
*/
var URL = {
	'/'          :'./routes/index',
	'/home'      :'./routes/home',
	'/audio'	 :'./routes/audio',
    '/control'    :'./routes/control',
	'/ppt'		 : './routes/ppt',
	'*'          :"./routes/404"
};

module.exports = URL;