import { combineReducers } from "redux";
import { types } from './actions';

import fs from 'fs';
import os from 'os';
import path from 'path';
import { PythonShell } from 'python-shell';
import child_process from 'child_process';
import { TodoTxt, TodoTxtItem } from 'jstodotxt';
import log from 'electron-log';
import electron, { ipcRenderer } from 'electron';

// const initialState = {
// 	scoreboard: {},
// 	loading: false,
// 	error: null
// }

const preferences = ipcRenderer.sendSync('getPreferences');
const TODOTXT_PATH = preferences.basic.TODOTXT_PATH;

const readTodotxt = () => {
  let todotxt = fs.readFileSync(TODOTXT_PATH).toString();
  let todos = TodoTxt.parse(todotxt);
  todos = splitByProject(todos);
  saveTodotxt(todos);
  return todos;
}

const saveTodotxt = (todos) => {
  let flat_todos = todos.default.slice();
  for (let project of Object.keys(todos)) {
    if (project !== 'default') {
      for (let todo of todos[project]) {
        flat_todos.push(todo);
      } 
    }
  }
  fs.writeFile(TODOTXT_PATH, TodoTxt.render(flat_todos), (err) => {
    makeWallpaper();
  });
}

const makeWallpaper = () => {
  child_process.execFile(path.join(electron.remote.app.getAppPath(), 'todo_wallpaper', 'wallpaper.sh'), 
    (error, stdout, stderr) => { if (error) log.error(error); });
}

const splitByProject = (todos) => {
  let projects = {
    default: []
  };
  for (var i = 0; i < todos.length; i++) {
    let todo = todos[i];
    todo.id = getTodoId(todo);
    if (todo.projects !== null) {
      let project = todo.projects[0];
      if (!(project in projects)) {
        projects[project] = [];
      }
      projects[project].push(todo);
    } else {
      projects.default.push(todo);
    }
  }
  return projects;
}

const addTodo = (projects, todo) => {
  todo.id = getTodoId(todo);
  let todos = Object.assign({}, projects);
  if (todo.projects !== null) {
    let project = todo.projects[0];
    if (!(project in todos)) {
      todos[project] = [];
    }
    todos[project].push(todo);
  } else {
    todos.default.push(todo);
  }
  saveTodotxt(todos);
  return todos;
}

const getTodoWithProject = (text, project) => {
  let todo = new TodoTxtItem();
  todo.text = text;
  todo.projects = [project];
  return todo;
}

const getTodo = (text) => {
  let todo = new TodoTxtItem(text);
  return todo;
}

const addProject = (projects, project) => {
  let todos = Object.assign({}, projects);
  todos[project] = [];
  return todos;
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getTodoId = (todo) => {
  return todo.text + getRandomInt(10000);
}

const searchTodoById = (todos, id) => {
  for (let project of Object.keys(todos)) {
    for (let i = 0; i < todos[project].length; i++) {
      if (todos[project][i].id === id) {
        return { project, index: i };
      }
    }
  }
  return null;
}

const deleteTodo = (projects, location) => {
  let todos = Object.assign({}, projects);
  if (location != null) {
    todos[location.project].splice(location.index, 1);
  }
  saveTodotxt(todos);
  return todos;
}

const editTodo = (projects, location, text) => {
  let todos = Object.assign({}, projects);
  if (location != null) {
    todos[location.project][location.index].text = text;
  }
  saveTodotxt(todos);
  return todos;
}

const incompleteTodo = (projects, location) => {
  let todos = Object.assign({}, projects);
  if (location != null) {
    todos[location.project][location.index].complete = false;
    todos[location.project][location.index].completed = null;
  }
  saveTodotxt(todos);
  return todos;
}

const completeTodo = (projects, location) => {
  let todos = Object.assign({}, projects);
  if (location != null) {
    todos[location.project][location.index].complete = true;
    todos[location.project][location.index].completed = new Date();
  }
  saveTodotxt(todos);
  return todos;
}

const deleteProject = (projects, project) => {
  let todos = Object.assign({}, projects);
  delete todos[project];
  saveTodotxt(todos);
  return todos;
}

function todos(state={ default: [] }, action) {
	console.log(action);

  let todos = state;
	switch(action.type) {
    case types.READ_TODOTXT:
    	return readTodotxt();

    case types.ADD_TODO:
      return addTodo(state, getTodo(action.payload.todo));

    case types.ADD_TODO_TO_PROJECT:
      return addTodo(state, getTodoWithProject(action.payload.todo, action.payload.project))

    case types.ADD_PROJECT:
      return addProject(state, action.payload.project);

    case types.DELETE_TODO:
      return deleteTodo(state, searchTodoById(state, action.payload.todo_id));

    case types.EDIT_TODO:
      return editTodo(state, searchTodoById(state, action.payload.todo_id), action.payload.text);

    case types.COMPLETE_TODO:
      return completeTodo(state, searchTodoById(state, action.payload.todo_id));

    case types.INCOMPLETE_TODO:
      return incompleteTodo(state, searchTodoById(state, action.payload.todo_id));

    case types.DELETE_PROJECT:
      return deleteProject(state, action.payload.project)

    case types.MAKE_WALLPAPER: {
      makeWallpaper();
      return state;
    }

    default:
      return state;
  }
  return todos;
}

function error(state=null, action) {
	switch(action.type) {
    default:
      return state;
  }
}


export default combineReducers({ todos, error });