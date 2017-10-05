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
  constructor(props){
    super(props);
    this.state = {
      depthTransform: ""
    }
  }

  componentDidMount() {
    if (!this.props.isStatic) {
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          // this is a legit use case. we must trigger a re-render. don't worry.
          rootElemWidth: this.refs.root.clientWidth || this.refs.root.offsetWidth || this.refs.root.scrollWidth,
          rootElemHeight: this.refs.root.clientHeight || this.refs.root.offsetHeight || this.refs.root.scrollHeight,
        });
    }
  }

  /****3D VIS METHODS****/
  handleMove = ({ pageX, pageY }) => {

      const { rootElemWidth, rootElemHeight } = this.state;

      const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
      const bodyScrollLeft = document.body.scrollLeft;
      const offsets = this.refs.root.getBoundingClientRect();

      const wMultiple = 1000 / rootElemWidth;

      const offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth; // cursor position X
      const offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight; // cursor position Y

      const dy = (pageY - offsets.top - bodyScrollTop) - rootElemHeight / 2; // center Y of container
      const dx = (pageX - offsets.left - bodyScrollLeft) - rootElemWidth / 2; // center X of container

      let yRotate = (offsetX - dx) * (0.1 * wMultiple); // rotation for container Y
      let xRotate = (dy - offsetY) * (0.1 * wMultiple); // rotation for container X

      const arad = Math.atan2(dy, dx); // angle between cursor and center of container in RAD

      const rawAngle = arad * 180 / Math.PI - 90; // convert rad to degrees
      const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;

      // console.log("X: " + xRotate + ":: Y: ", yRotate);

      if(this.props.depthOn) {
        this.setState({
          depthTransform: `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`
        });
      }
  }

  render() {

    //<Visualization transform = {this.state.depthTransform}/>
    return (
      <div
        className="app-container"
        onMouseMove={this.handleMove}
        ref = "root">
        <Header/>
        <EntrySection/>
        <ControlPanel/>
        <Visualization/>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    depthOn: state.ControlPanel.depthOn,
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
