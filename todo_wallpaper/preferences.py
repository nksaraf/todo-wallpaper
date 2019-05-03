import json
import os
from attrdict import AttrDict

todo_dir = os.path.join(os.path.expanduser("~"), '.todo')

with open(os.path.join(todo_dir, 'preferences.json'), 'r') as file:
	preferences = AttrDict(json.load(file))

