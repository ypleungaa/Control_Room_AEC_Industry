import sys
import time
import telepot
from telepot.loop import MessageLoop

def handle(msg):
	chat_id = msg['chat']['id']
	text = msg['text']
	print('%s%s'%(chat_id, text))
	bot.sendMessage(chat_id, text)

token = sys.argv[1]
bot = telepot.Bot(token)
MessageLoop(bot, handle).run_as_thread()
print('Listening....')

while 1:
	time.sleep(1)
