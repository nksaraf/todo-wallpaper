import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { readTodotxt, makeWallpaper } from './redux/actions';
import { ipcRenderer } from 'electron';

import Main from './components/Main';

store.dispatch(readTodotxt());

// Listen to the `preferencesUpdated` event to be notified when preferences are changed.
ipcRenderer.on('preferencesUpdated', (e, preferences) => {
		console.log(preferences);
    store.dispatch(makeWallpaper());
});

export default class App extends Component {
  render() {
    return (
	    <Provider store={store}>
	      <Main />
	    </Provider>
	  );
  }
}
