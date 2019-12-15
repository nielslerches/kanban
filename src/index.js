import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { ServicesProvider } from './state/services';
import { rootReducer as reducer } from './state/reducers';
import { initialState } from './state/initialStates';
import uuid from 'uuid/v4';

const persistedState = JSON.parse(localStorage.getItem('state'));

const store = configureStore({
  reducer,
  preloadedState: persistedState || initialState,
  middleware: getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

if (!persistedState) {
  const dashboardId = uuid();
  const panelId = uuid();

  store.dispatch({ type: 'CREATE_DASHBOARD', payload: { id: dashboardId, name: 'Dashboard' } });
  store.dispatch({ type: 'SET_KEY_VALUE', payload: { key: 'default-dashboard', value: dashboardId } });
  store.dispatch({ type: 'CREATE_PANEL', payload: { id: panelId, name: 'Projects', type: 'projects' } });
  store.dispatch({ type: 'ADD_PANEL', payload: { dashboardId, panelId } });
}

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ServicesProvider>
        <App />
      </ServicesProvider>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
