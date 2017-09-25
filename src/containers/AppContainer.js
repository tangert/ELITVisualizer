import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../actions/index.js';

import Header from './../components/Header/Header'
import EntrySection from './../components/EntrySection/EntrySection';
import Visualization from './../components/Visualization/Visualization';
import ControlPanel from './../components/ControlPanel/ControlPanel';

//For basic flexbox setup.
import './AppContainer.css'

class AppContainer extends Component {
  render() {
    return (
      <div className="app-container">
        <Header/>
        <EntrySection/>
        <ControlPanel/>
        <Visualization/>
    </div>
    );
  }
}

export default AppContainer;
