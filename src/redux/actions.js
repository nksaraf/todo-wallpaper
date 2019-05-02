export const types = {
	READ_TODOTXT: 'READ_TODOTXT',
	ADD_TODO_TO_PROJECT: 'ADD_TODO_TO_PROJECT',
	ADD_TODO: 'ADD_TODO',
	ADD_PROJECT: 'ADD_PROJECT',
	DELETE_TODO: 'DELETE_TODO',
	EDIT_TODO: 'EDIT_TODO',
	COMPLETE_TODO: 'COMPLETE_TODO',
	INCOMPLETE_TODO: 'INCOMPLETE_TODO',
	DELETE_PROJECT: 'DELETE_PROJECT'
}

export const readTodotxt = () => {
	return {
		type: types.READ_TODOTXT,
		payload: { }
	};
}

export const addTodoToProject = (todo, project) => {
	return {
		type: types.ADD_TODO_TO_PROJECT,
		payload: { todo, project }
	};
}

export const addTodo = (todo) => {
	return {
		type: types.ADD_TODO,
		payload: { todo }
	};
}

export const addProject = (project) => {
	return {
		type: types.ADD_PROJECT,
		payload: { project }
	};
}

export const deleteTodo = (id) => {
	return {
		type: types.DELETE_TODO,
		payload: { todo_id: id }
	};
}

export const editTodo = (id, text) => {
	return {
		type: types.EDIT_TODO,
		payload: { todo_id: id, text }
	};
}

export const completeTodo = (id) => {
	return {
		type: types.COMPLETE_TODO,
		payload: { todo_id: id }
	}
}

export const incompleteTodo = (id) => {
	return {
		type: types.INCOMPLETE_TODO,
		payload: { todo_id: id }
	}
}

export const deleteProject = (project) => {
	return {
		type: types.DELETE_PROJECT,
		payload: { project }
	}
}