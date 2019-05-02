import os

MACBOOK_PRO_13_SIZE = (2560, 1600)
DIR_PATH = os.path.dirname(os.path.realpath(__file__))

class Config:
	SOURCE_IMAGE = os.path.join(DIR_PATH, "test.jpg")
	SET_WALLPAPER_SCRIPT = "desktoppr {filename}"
	TODOTXT_PATH = os.path.join(os.path.expanduser('~'), 'todo.txt')
	FONT_PATH = os.path.join(DIR_PATH, "SF-Pro-Text-Semibold.otf")
	WALLPAPER_PATH = os.path.join(DIR_PATH, "_wallpaper_{}.png")
	WALLPAPER_WILDCARD = os.path.join(DIR_PATH, "_wallpaper_*")
	WALLPAPER_SIZE = MACBOOK_PRO_13_SIZE
	FONT_SIZE = 28
	TITLE_FONT_SIZE = 36
	FILL_COLOR = 'white'
	TITLE_UNDERLINE_OFFSET = 8
	TOP_LEFT = (96, 120)
	GROUP_V_OFFSET = 60
	FIRST_TASK_OFFSET = 72
	LINE_WIDTH = 3
	SHADOW_X_OFFSET = 2
	SHADOW_Y_OFFSET = 3
	SHADOW_COLOR = (30, 30, 30)


	CHECKBOX_OFFSET = 18
	CHECKBOX_SIZE = 28
	CHECKBOX_TOP_OFFSET = 2
	TASK_OFFSET = 18

config = Config()

