from sensor import SHT20
import time
import tornado.ioloop

sht = SHT20(1, 0x40)

TEMPERATURE = sht.temperature()
HUMIDITY = sht.humidity()
celsius = TEMPERATURE.C
humidity = HUMIDITY.RH

# def update():
#     celsius.notify_of_external_update(celsius.C)
#     humidity.notify_of_external_update(humidity.RH)


while True:
    print("Temperature (°C): " + str(celsius))
    print("Humidity (%RH): " + str(humidity))
    TEMPERATURE = sht.temperature()
    HUMIDITY = sht.humidity()
    celsius = TEMPERATURE.C
    humidity = HUMIDITY.RH
    time.sleep(3)