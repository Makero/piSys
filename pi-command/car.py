import timeimport gpioimport RPi.GPIO as GPIOclass Car:	def __init__(self):		self.stop = False		GPIO.setmode(GPIO.BOARD)		GPIO.setwarnings(False)		GPIO.setup(gpio.CAR_GPIO_PINS, GPIO.OUT)		GPIO.output(gpio.CAR_GPIO_ENX, GPIO.LOW)	def move_on(self):		''' 前进 '''		GPIO.output([gpio.GPIO_PIN_IN1, gpio.GPIO_PIN_IN2], (GPIO.LOW, GPIO.HIGH))	# 左侧车轮正转		GPIO.output([gpio.GPIO_PIN_IN3, gpio.GPIO_PIN_IN4], (GPIO.HIGH, GPIO.LOW))	# 右侧车轮反转	def move_back(self):		''' 后退 '''		GPIO.output([gpio.GPIO_PIN_IN1, gpio.GPIO_PIN_IN2], (GPIO.HIGH, GPIO.LOW))	# 左侧车轮反转		GPIO.output([gpio.GPIO_PIN_IN3, gpio.GPIO_PIN_IN4], (GPIO.LOW, GPIO.HIGH))	# 右侧车轮正转	def turn_left(self):		''' 左转 '''		GPIO.output([gpio.GPIO_PIN_IN1, gpio.GPIO_PIN_IN2], (GPIO.HIGH, GPIO.LOW))	# 左侧车轮反转		GPIO.output([gpio.GPIO_PIN_IN3, gpio.GPIO_PIN_IN4], (GPIO.HIGH, GPIO.LOW))	# 右侧车轮反转	def turn_right(self):		''' 右转 '''		GPIO.output([gpio.GPIO_PIN_IN1, gpio.GPIO_PIN_IN2], (GPIO.LOW, GPIO.HIGH))	# 左侧车轮正转		GPIO.output([gpio.GPIO_PIN_IN3, gpio.GPIO_PIN_IN4], (GPIO.LOW, GPIO.HIGH))	# 右侧车轮正转	def move_stop(self):		self.stop = True	def pwm_speed(self):		''' PWM信号脉冲调速 '''		rate = 0.0005		while True:			if self.stop:				GPIO.output(gpio.CAR_GPIO_ENX, GPIO.LOW)				break			time.sleep(rate)			GPIO.output(gpio.CAR_GPIO_ENX, GPIO.LOW)			time.sleep(rate)			GPIO.output(gpio.CAR_GPIO_ENX, GPIO.HIGH)if __name__ == '__main__':	car1 = Car()	car1.move_on()