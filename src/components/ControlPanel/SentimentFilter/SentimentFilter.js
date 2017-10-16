import React, { Component } from 'react'
import { NEGATIVE, NEUTRAL, POSITIVE } from './../../../constants.js'
import './SentimentFilter.css'

class SentimentFilter extends Component {

  filterSentiment = (btnNumber) => {
    console.log(btnNumber + "pressed");
    this.props.filterSentiment(btnNumber);
  }

  renderClassName = (filters, buttonType) => {
    //Both are on
    let className;

    let POSITIVE_PRESSED = filters.positive;
    let NEGATIVE_PRESSED = filters.negative;
    let NEUTRAL_PRESSED = filters.neutral;

    switch(buttonType) {

      case NEGATIVE:
          if(NEGATIVE_PRESSED) {
            className = "control-panel-btn sent-neg"
          } else {
            className = "control-panel-btn"
          }
          break;
      case NEUTRAL:
        if(NEUTRAL_PRESSED) {
          className = "control-panel-btn sent-neut"
        } else {
          className = "control-panel-btn"
        }
        break;
      case POSITIVE:
        if(POSITIVE_PRESSED) {
          className = "control-panel-btn sent-pos"
        } else {
          className = "control-panel-btn"
        }
        break;
      default:
        className = "control-panel-btn"
      }

    return className;
  }


  render () {
    return(
      <div className = "sentiment-filter-container"
        style = {this.props.style} >
        <div className = "control-panel-title">Sentiment Filter</div>
        <div className = "sentiment-btns">
          <button onClick = {()=> this.filterSentiment(NEGATIVE)}
                  className = {this.renderClassName(this.props.sentimentFilters, NEGATIVE)}>
                  Negative
          </button>

          <button onClick = {()=> this.filterSentiment(NEUTRAL)}
                  className = {this.renderClassName(this.props.sentimentFilters, NEUTRAL)}>
                  Neutral
          </button>

          <button onClick = {()=> this.filterSentiment(POSITIVE)}
                  className = {this.renderClassName(this.props.sentimentFilters, POSITIVE)}>
                  Positive
          </button>
        </div>
      </div>
    );
  }
}

export default SentimentFilter;
