import RPi.GPIO as GPIO
from time import sleep
import sys
import getopt

pin = -1
cmd = ''
initSeq = True
initHigh = 0
initLow = 0
boardType = GPIO.BCM
durataBitScurta = 0
durataBitLunga = 0

nAttempts = 3
extended_delay = 0

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
	print 'setupPin'
	GPIO.setwarnings(False)
	GPIO.setmode(boardType)
	GPIO.setup(pin, GPIO.OUT)
	GPIO.output(pin, 0)
	sleep(0.05)

def do():
	print 'do'
	setupPin()
	for t in range(nAttempts):
		print 'attempt: ' + str(t + 1)
 		init_code()
		transmit_code()
		sleep(extended_delay)

def end():
	GPIO.cleanup()

def usage():
	print '-h : Help'
	#print '-c : Binary command'
	#print '-b : Command length (number of bits)'
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
		if opt == '-h':
			usage()
			sys.exit()
		elif opt == '-p':
			global pin
			pin = int(arg)
		elif opt == '-t':
			print arg
			if arg.upper() == 'BOARD':
				boardType = GPIO.BOARD
			else:
				boardType = GPIO.BCM
		elif opt == '-o':
			global initSeq
			initSeq = arg.upper() == 'TRUE'
		elif opt == '-d':
			global initLow
			initLow = float(arg) / 1000000
		elif opt == '-u':
			global initHigh
			initHigh = float(arg) / 1000000
		elif opt == '-l':
			global durataBitScurta
			durataBitScurta = float(arg) / 1000000
		elif opt == '-m':
			global durataBitLunga
			durataBitLunga = float(arg) / 1000000
		elif opt == '-n':
			global nAttempts
			nAttempts = int(arg)
		elif opt == '-e':
			global extended_delay
			extended_delay = float(arg) / 1000000
	do()

if (__name__ == "__main__"):
	print sys.argv[2:]
	cmd = sys.argv[1]
	main(sys.argv[2:])