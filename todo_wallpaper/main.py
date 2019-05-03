#!/usr/local/bin/python3

from functools import partial
from manager import TodoManager
from preferences import preferences
from wallpaper import make_wallpaper
import sys
import os

if __name__ == '__main__':
	if os.path.exists(preferences.basic.TODOTXT_PATH) and os.path.exists(preferences.basic.SOURCE_IMAGE):
		manager = TodoManager(preferences.basic.TODOTXT_PATH, callback=partial(make_wallpaper, preferences.basic.SOURCE_IMAGE))
		manager.do('nothing')
		sys.stdout.flush()