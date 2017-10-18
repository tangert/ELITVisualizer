import React, { Component } from 'react'
import './NgramSelector.css'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const marks = {
  0: "AVG",
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

class NgramSelector extends Component {

  selectNgramPostion = (value) => {
    this.props.selectNgramPostion(value);
  }

  renderClassName = (buttonVal) => {
    let className;
    if(buttonVal === this.props.currentNgram) {
      className = "control-panel-btn ngram-active";
    } else {
      className = "control-panel-btn";
    }

    return className;
  }

  //<div className = "tool-tip-btn">?</div>

  render () {
    return(
      <div className = "control-panel-item-container"
        style = {this.props.style} >
        <div className = "control-panel-title-container">
          <div className = "control-panel-title">NGram Selector</div>
        </div>

        <div className = "slider-wrapper">

          <Slider
            onChange={this.selectNgramPostion}
            value = {this.props.currentNgramPosition}
            min= {0}
            max ={5}
            marks = {marks}
            />
        </div>
      </div>
    );
  }
}

export default NgramSelector;
