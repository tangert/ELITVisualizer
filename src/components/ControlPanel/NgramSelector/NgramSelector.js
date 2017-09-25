import React, { Component } from 'react'
import './NgramSelector.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class NgramSelector extends Component {

  selectNgram = (value) => {
    this.props.selectNgram(value);
    //Reset to 1 each time
    this.props.selectNgramPostion(1);
  }

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

  render () {
    return(
      <div className = "ngram-selector-container">
        <div className = "control-panel-title">NGram Selector</div>

        <div className = "ngram-btns">
          <button onClick = {()=> this.selectNgram(1)} className = {this.renderClassName(1)}>1</button>
          <button onClick = {()=> this.selectNgram(2)} className = {this.renderClassName(2)}>2</button>
          <button onClick = {()=> this.selectNgram(3)} className = {this.renderClassName(3)}>3</button>
          <button onClick = {()=> this.selectNgram(4)} className = {this.renderClassName(4)}>4</button>
        </div>

        <div className = "slider-wrapper"
          style = { this.props.currentNgram === 1 ?
            {transition: "0.15s ease-in",
              opacity: "0",
            } :

            {position: "relative", marginLeft: "15%", marginRight: "15%"}
            }>

          <Slider
            onChange={this.selectNgramPostion}
            value = {this.props.currentNgramPosition}
            min= {1}
            max ={this.props.currentNgram}
            />
        </div>
      </div>
    );
  }
}

export default NgramSelector;
