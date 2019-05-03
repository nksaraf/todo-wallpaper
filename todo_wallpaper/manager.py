import json
import todotxtio

class TodoManager:
	def __init__(self, filepath, callback):
		self.todos = todotxtio.from_file(filepath)
		self.projects = self.split_into_projects()
		self.filepath = filepath
		self.callback = callback
	
	def write_todos(self):
		todotxtio.to_file(self.filepath, self.todos)

	def do(self, func='nothing', *params):
		getattr(self, func)(*params)
		self.write_todos()
		self.projects = self.split_into_projects()
		self.callback(self)

	def split_into_projects(self):
		projects = { "dashboard": [] }
		for todo in self.todos:
			if len(todo.projects) == 0:
				projects["dashboard"].append(todo)
			for project in todo.projects:
				if project not in projects:
					projects[project] = []
				projects[project].append(todo)
		return projects

	def nothing(self):
		pass

	# def add_taskgroup(self, group):
	# 	self.taskgroups.append(group)

	# def add_task(self, group_index, task):
	# 	self.taskgroups[index]["items"].append(task)

	# def set_title(self, group_index, title):
	# 	self.taskgroups[group_index]["title"] = title

if __name__ == '__main__':
	from preferences import preferences
	manager = TodoManager(preferences.basic.TODOTXT_PATH)