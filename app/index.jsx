import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';
import './main.css';

const APP_STORAGE = 'redux_kanban';

const store = configureStore(storage.get(APP_STORAGE) || {});

store.subscribe(() => {
  if (!storage.get('debug')) {
    storage.set(APP_STORAGE, store.getState());
  }
});

let element=<h2>What the helll.....</h2>;

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);