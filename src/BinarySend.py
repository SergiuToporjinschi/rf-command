import RPi.GPIO as GPIO
from time import sleep
import sys
import getopt

pin = 4
cmd = '10000101 00110001 01010010 10000001 00010001'
initSeq = True
initHigh = 0.004664
initLow = 0.001540
boardType = GPIO.BCM
durataBitScurta = 0.000356
durataBitLunga = 0.000712

NUM_ATTEMPTS = 3
extended_delay = 0.008064

def init_code(): 
	print 'init seq'
	GPIO.output(pin, 1)
	sleep(initHigh)
	GPIO.output(pin, 0)
	sleep(initLow)

def transmit_code():
	print 'transmit'
	for i in range(1, len(cmd)+1):
		if (cmd[i-1] == '1'):
			GPIO.output(pin, 1)
			sleep(durataBitLunga)
			GPIO.output(pin, 0)
			sleep(durataBitScurta)
		elif (cmd[i-1] == '0'):
			GPIO.output(pin, 1)
			sleep(durataBitScurta)
			GPIO.output(pin, 0)
			sleep(durataBitLunga)

def setupPin():
        GPIO.setwarnings(False) 
	print 'setupPin'
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(pin, GPIO.OUT)
	GPIO.output(pin, 0)
	sleep(0.05)

def do():
	print 'do'
	setupPin()
	for t in range(NUM_ATTEMPTS):
		print 'attempt: ' + str(t)
 		init_code()
		transmit_code()
		sleep(extended_delay)

def end():
	GPIO.cleanup()

def usage():
	print '-h : Help'
	#print '-c : Binary command'
	#print '-b nb : Command length (number of bits)'
	print '--------------------------------------'
	print '-p : Pin number default 7'
	print '-t : Pin type (BCM|BOARD) default BCM'
	print '--------------------------------------'
	print '-o : Send init sequence (true|false) default true'
	print '-u : Init up time (microseconds) default 4664us'
	print '-d : Init down time (microseconds) default 1540us'
	print '--------------------------------------'
	print '-l : Low time for bit (microseconds) default 356us'
	print '-m : High time for bit (microseconds) default 712us'
	print '--------------------------------------'
	print '-n : Number of attempts default 3'
	print '-e : Delay time between commands (microseconds) default 8064us'

def main(argsv):
	try:
		opts, args = getopt.getopt(argsv, "b:p:t:o:u:d:l:m:n:e:h")
	except getopt.GetoptError:
		usage()
		sys.exit(2)
	for opt, arg in opts:
		print 'test: ' + arg
		if opt == '-h':
			usage()
			sys.exit()
		elif opt == '-p':
			pin = arg
		elif opt == '-t' and arg.upper() != 'BOARD':
			boardType = GPIO.BCM
			if arg.upper() != 'board':
				boardType = GPIO.BCM
		elif opt == '-o' and arg.upper() == 'TRUE':
			initSeq = True
		elif opt == '-d':
			initLow = int(arg) / 1000000
		elif opt == '-u':
			initHigh == int(arg) / 1000000
		elif opt == '-l':
			durataBitScurta = int(arg) / 1000000
		elif opt == '-m':
			durataBitLunga = int(arg) / 1000000
		elif opt == '-n':
			NUM_ATTEMPTS = int(arg)
		elif opt == '-e':
			extended_delay = int(arg) / 1000000	
	do()

if (__name__ == "__main__"):
	cmd = sys.argv[1]
	main(sys.argv[2:])