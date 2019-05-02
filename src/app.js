import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { readTodotxt } from './redux/actions';

import Main from './components/Main';

store.dispatch(readTodotxt());

export default class App extends Component {
  render() {
    return (
	    <Provider store={store}>
	      <Main />
	    </Provider>
	  );
  }
}
