import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from './store';

import './index.css';

ReactDOM.render(
    <Provider store = {store}>
      <AppContainer/>
    </Provider>, document.getElementById('root'));

registerServiceWorker();
