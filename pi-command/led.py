#encoding=utf-8 
import sys
import gpio
import RPi.GPIO as GPIO

def LED():
	pin    = gpio.GPIO_PIN_LED
	on_off = sys.argv[1]
	level  = {"on":GPIO.HIGH,"off":GPIO.LOW}


	GPIO.setmode(GPIO.BOARD)	#设置引脚的编码格式
	GPIO.setwarnings(False)	#设置不提示警告信息

	GPIO.setup(pin,GPIO.OUT)		#设置引脚为输出
	GPIO.output(pin,level[on_off])		#将引脚置为高或低电平
	
	return

if __name__ == "__main__":
	LED()
