# -------------------------------------------------------
# speech
#author:Maker
#version:1.0.0
#create:2016/12/08
#the python version:python3
# -------------------------------------------------------
#encoding=utf-8 

import wave 
import urllib.request
import json 

# get access token by api key & secret key 
def get_token(): 
	apiKey = "XyKwl3kjMkbl5zrEhfzKcco9" 
	secretKey = "8gPi2kn887wth0vrBWYgjBeG1XQAEfjB" 
	auth_url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + apiKey + "&client_secret=" + secretKey; 
	res = urllib.request.urlopen(auth_url) 
	json_data = res.read()
	return json.loads(json_data.decode())['access_token']

# post audio to server 
def use_cloud(token): 
	fp = wave.open('pi-command/temp.wav', 'rb') 
	nf = fp.getnframes() 
	f_len = nf * 2 
	audio_data = fp.readframes(nf) 
	cuid = "14-75-90-F8-99-B5" #mac
	srv_url = 'http://vop.baidu.com/server_api' + '?cuid=' + cuid + '&token=' + token
	http_header = { 'Content-Type': 'audio/pcm; rate=16000', 'Content-Length': '%d' % f_len }
	
	req = urllib.request.Request(srv_url, audio_data, http_header)
	response = urllib.request.urlopen(req)
	json_data = response.read().decode()
	print(json_data)

if __name__ == "__main__": 
	token = get_token() 
	use_cloud(token)
