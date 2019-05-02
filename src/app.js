import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { readTodotxt } from './redux/actions';

store.dispatch(readTodotxt('todo.txt'));

export default class App extends Component {
  render() {
    return (
	    <Provider store={store}>
	      <div>Hello World</div>
	    </Provider>
	  );
  }
}
