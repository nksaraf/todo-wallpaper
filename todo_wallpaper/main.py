#!/usr/local/bin/python3

from functools import partial
from manager import TodoManager
from config import config
from wallpaper import make_wallpaper
import sys

if __name__ == '__main__':
	manager = TodoManager(config.TODOTXT_PATH, callback=partial(make_wallpaper, config.SOURCE_IMAGE))
	manager.do('nothing')
	sys.stdout.flush()