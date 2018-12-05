#!/bin/bash

if [ $1 == "on" ];then
echo "Open Camera"
sudo mjpg_streamer -i "/usr/local/lib/input_uvc.so -y" -o "/usr/local/lib/output_http.so -w /usr/local/www"
else
echo "Stop Camera"
ID=`ps -ef|grep 'mjpg_streamer'|grep -v 'grep'|awk '{print $2}'`
for pid in $ID
do
  sudo kill -9 $pid
  echo " kill omxplayer pid:$pid"
done
fi