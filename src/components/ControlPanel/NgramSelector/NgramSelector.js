import React, { Component } from 'react'
import './NgramSelector.css'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const marks = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
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

  renderMarks = (currentNgram) => {
    let marks = {};
    for(var i = 1; i <= currentNgram; i++) {
      marks[i] = i;
    }
    return marks;
  }

  render () {
    return(
      <div className = "ngram-selector-container">
        <div className = "control-panel-title">NGram Selector</div>

        <div className = "slider-wrapper">

          <Slider
            onChange={this.selectNgramPostion}
            value = {this.props.currentNgramPosition}
            min= {1}
            max ={5}
            marks = {marks}
            />
        </div>
      </div>
    );
  }
}

export default NgramSelector;
