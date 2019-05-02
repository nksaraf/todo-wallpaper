from PIL import Image, ImageDraw, ImageFont
import subprocess
import random
import os
from config import config

def flat(*nums):
	"""Build a tuple of ints from float or integer arguments. Useful because 
	PIL crop and resize require integer points."""
	return tuple(int(round(n)) for n in nums)

class Size(object):
	def __init__(self, pair):
		self.width = float(pair[0])
		self.height = float(pair[1])

	@property
	def aspect_ratio(self):
		return self.width / self.height

	@property
	def size(self):
		return flat(self.width, self.height)

def cropped_thumbnail(img, size):
	'''
	Builds a thumbnail by cropping out a maximal region from the center of the original with
	the same aspect ratio as the target size, and then resizing. The result is a thumbnail which is
	always EXACTLY the requested size and with no aspect ratio distortion (although two edges, either
	top/bottom or left/right depending whether the image is too tall or too wide, may be trimmed off.)
	'''
	
	original = Size(img.size)
	target = Size(size)

	if target.aspect_ratio > original.aspect_ratio:
		# image is too tall: take some off the top and bottom
		scale_factor = target.width / original.width
		crop_size = Size((original.width, target.height / scale_factor))
		top_cut_line = (original.height - crop_size.height) / 2
		img = img.crop(flat(0, top_cut_line, crop_size.width, top_cut_line + crop_size.height))

	elif target.aspect_ratio < original.aspect_ratio:
		# image is too wide: take some off the sides
		scale_factor = target.height / original.height
		crop_size = Size((target.width/scale_factor, original.height))
		side_cut_line = (original.width - crop_size.width) / 2
		img = img.crop(flat(side_cut_line, 0,  side_cut_line + crop_size.width, crop_size.height))
		
	return img.resize(target.size, Image.ANTIALIAS)

def save_wallpaper(img):
	os.system('rm {}'.format(config.WALLPAPER_WILDCARD))
	path = config.WALLPAPER_PATH.format(random.randint(0, 1000))
	img.save(path)
	print(path)
	return path

def set_desktop_wallpaper(path):
	subprocess.Popen(['desktoppr', path])

def add_text(draw, text, location, font):
	draw.text((location[0] + config.SHADOW_X_OFFSET, location[1] + config.SHADOW_Y_OFFSET), 
		text, font=font, fill=config.SHADOW_COLOR) #shadow
	draw.text(location, text, font=font, fill=config.FILL_COLOR)

def add_strikethrough(draw, text, location, font):
	(width, height) = font.getsize(text)
	draw.line(
		(location[0] + config.SHADOW_X_OFFSET, location[1] + height//2 + config.SHADOW_Y_OFFSET, 
			location[0] + config.SHADOW_X_OFFSET + width, location[1] + height//2 + config.SHADOW_Y_OFFSET), 
		fill=config.SHADOW_COLOR, 
		width=config.LINE_WIDTH
	)
	draw.line(
		(location[0], location[1] + height//2, 
			location[0] + width, location[1] + height//2), 
		fill=config.FILL_COLOR, 
		width=config.LINE_WIDTH
	)

def add_todo(draw, todo, location, font):
	add_checkbox(draw, location)
	text_location = (location[0] + config.CHECKBOX_SIZE + config.CHECKBOX_OFFSET, location[1])
	add_text(draw, todo.text, text_location, font)
	if todo.completed:
		add_strikethrough(draw, todo.text, text_location, font)

	(width, height) = font.getsize(todo.text)
	return height

def add_checkbox(draw, todo_location):
	draw.rectangle([
		todo_location[0] + config.SHADOW_X_OFFSET, 
		todo_location[1] + config.CHECKBOX_TOP_OFFSET + config.SHADOW_Y_OFFSET, 
		todo_location[0] + config.CHECKBOX_SIZE + config.SHADOW_X_OFFSET, 
		todo_location[1] + config.CHECKBOX_TOP_OFFSET + config.CHECKBOX_SIZE + config.SHADOW_Y_OFFSET], 
		outline=config.SHADOW_COLOR,
		width=config.LINE_WIDTH
	)
	draw.rectangle([
		todo_location[0], 
		todo_location[1] + config.CHECKBOX_TOP_OFFSET, 
		todo_location[0] + config.CHECKBOX_SIZE, 
		todo_location[1] + config.CHECKBOX_TOP_OFFSET + config.CHECKBOX_SIZE], 
		outline=config.FILL_COLOR,
		width=config.LINE_WIDTH
	)

def add_todos(draw, todos, location, font):
	v_offset = 0
	for i, todo in enumerate(todos):
		height = add_todo(draw, todo, (location[0], location[1] + v_offset), font)
		v_offset += height + config.TASK_OFFSET
	return v_offset

def add_title(draw, title, location, font):
	title_font = font.font_variant(size=config.TITLE_FONT_SIZE)
	(width, height) = title_font.getsize(title)
	add_text(draw, title, location, font=title_font)
	draw.line(
		(location[0] + config.SHADOW_X_OFFSET, location[1] + height + config.TITLE_UNDERLINE_OFFSET + config.SHADOW_Y_OFFSET, 
			location[0] + width + config.SHADOW_X_OFFSET, location[1] + height + config.TITLE_UNDERLINE_OFFSET + config.SHADOW_Y_OFFSET), 
		fill=config.SHADOW_COLOR,
		width=config.LINE_WIDTH)
	draw.line(
		(location[0], location[1] + height + config.TITLE_UNDERLINE_OFFSET, 
			location[0] + width, location[1] + height + config.TITLE_UNDERLINE_OFFSET), 
		fill=config.FILL_COLOR,
		width=config.LINE_WIDTH)

def add_todo_group(draw, title, todos, location, font):
	add_title(draw, title.title(), location, font)
	offset = add_todos(draw, todos, (location[0], location[1] + config.FIRST_TASK_OFFSET), font)
	return config.FIRST_TASK_OFFSET + offset

def add_todo_groups(draw, todo_groups, location, font):
	offset = 0
	for title, todos in todo_groups.items():
		if len(todos) > 0:
			group_location = (location[0], location[1] + offset)
			height = add_todo_group(draw, title, todos, group_location, font)
			offset += height + config.GROUP_V_OFFSET

def edit(img, todo_groups, font):
	draw = ImageDraw.Draw(img)
	add_todo_groups(draw, todo_groups, config.TOP_LEFT, font)
	return img

def make_wallpaper(source_path, todo_manager):
	img = Image.open(source_path)
	font = ImageFont.truetype(font=config.FONT_PATH, size=config.FONT_SIZE)
	cropped_img = cropped_thumbnail(img, config.WALLPAPER_SIZE)
	wallpaper = edit(cropped_img, todo_manager.projects, font)
	wallpaper_path = save_wallpaper(wallpaper)
	return wallpaper_path

if __name__ == '__main__':
	import manager
	path = make_wallpaper("test.jpg", manager.TodoManager(config.TODOTXT_PATH))
	set_desktop_wallpaper(path)