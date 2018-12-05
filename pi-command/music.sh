#!/bin/bash

if [ $2 == "on" ];then
echo "Play Music"
omxplayer -o hdmi pi-command/test.mp3
else
echo "Stop Music"
ID=`ps -ef| grep 'omxplayer'|grep -v 'grep'|awk '{print $2}'`
for pid in $ID
do
  kill -9 $pid
  #echo " kill omxplayer pid:$pid"
done
fi
