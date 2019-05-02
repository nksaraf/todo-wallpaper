#!/bin/sh

BASEDIR=$(dirname "$0")
WALLPAPER=$(python3 "$BASEDIR/main.py")
desktoppr $WALLPAPER

# desktoppr << python3 "$BASEDIR/todo_wallpaper/main.py"