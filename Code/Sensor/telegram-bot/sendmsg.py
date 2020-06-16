import sys
import telepot

token = sys.argv[1]
userid = sys.argv[2]
msg = sys.argv[3]
bot = telepot.Bot(token)
bot.sendMessage(userid, str(msg))


