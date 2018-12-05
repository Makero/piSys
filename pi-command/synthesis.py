# -------------------------------------------------------
# synthesis
#author:Maker
#version:1.0.0
#create:2016/12/7
#the python version:python3
# -------------------------------------------------------
#encoding=utf-8 
import json, os, sys
from urllib.request import urlopen
from urllib.request import Request
from urllib.parse import urlencode

API_KEY = "EZBl2T4NwCs2TyADthxwCnNz" 
SECRET_KEY = "d0619836d8fa970fe330e823d64b3318"
CUID = "14-75-90-F8-99-B5" #mac
TTS_URL = 'http://tsn.baidu.com/text2audio'

TOKEN_URL = "https://openapi.baidu.com/oauth/2.0/token"
# get access token by api key & secret key 
def get_token(): 
	 params = {
	 	'grant_type': 'client_credentials',
	 	'client_id': API_KEY,
	 	'client_secret': SECRET_KEY
	 }
	 post_data = urlencode(params).encode('utf-8')
	 req = Request(TOKEN_URL, post_data)
	 f = urlopen(req, timeout=5)
	 result_str = f.read().decode()
	 result = json.loads(result_str)
	 return result['access_token']
	

## post text to server 
def get_audio(text): 

	data = {
		'tex':text,
		'lan':'zh',
		'cuid':CUID,
		'ctp':'1',
		'spd':'4',
		'per':'4',
		'vol':'15',
		'pit':'7',
		'tok':get_token()
	}
	data = 	urlencode(data)
	req = Request(TTS_URL, data.encode('utf-8'))
	f = urlopen(req)
	audio = f.read()
	fs = open('syn.mp3','wb')
	fs.write(audio)
	fs.close()
	speak()

#speak text
def speak():
	tmp = os.popen('mpg321 syn.mp3')
		
if __name__ == "__main__":  
	get_audio(sys.argv[1])
