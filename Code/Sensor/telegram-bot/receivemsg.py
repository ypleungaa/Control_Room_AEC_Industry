import sys
import time
import telepot
from telepot.loop import MessageLoop
from pprint import pprint

def handle(msg):
	pprint(msg)
token = sys.argv[1]
bot = telepot.Bot(token)
MessageLoop(bot, handle).run_as_thread()
print('Listening.....')

while 1:
	time.sleep(1)
