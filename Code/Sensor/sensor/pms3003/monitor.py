#!/usr/bin/python

import time
import datetime
import os
import g3

air=g3.g3sensor()
pmdata=air.read("/dev/ttyUSB2")
print(pmdata)


