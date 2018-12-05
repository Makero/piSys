#encoding=utf-8 
import sys
import RPi.GPIO as GPIO

def LED():
	pin    = sys.argv[1]
	on_off = sys.argv[2]
	level  = {"on":GPIO.HIGH,"off":GPIO.LOW}

	if len(pin) > 2:
		pin = pin.split(",")
		GPIO_PIN = []
		for i in pin:
			GPIO_PIN.append(int(i)) 
	else:
		GPIO_PIN = int(pin)

	GPIO.setmode(GPIO.BOARD)	#设置引脚的编码格式
	GPIO.setwarnings(False)	#设置不提示警告信息

	GPIO.setup(GPIO_PIN,GPIO.OUT)		#设置引脚为输出
	GPIO.output(GPIO_PIN,level[on_off])		#将引脚置为高或低电平
	
	return

if __name__ == "__main__":
	LED()
