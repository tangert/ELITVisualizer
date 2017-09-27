import React, { Component } from 'react'
import './SentimentFilter.css'

class SentimentFilter extends Component {

  filterSentiment = (sent) => {
    this.props.filterSentiment(sent);
  }

  renderClassName = (filters, btn) => {
    //Both are on
    let className;
    let BOTH_PRESSED = filters.pos && filters.neg;
    let POS_PRESSED = filters.pos && !filters.neg;
    let NEG_PRESSED = !filters.pos && filters.neg;

    if(BOTH_PRESSED) {
      switch(btn){
        case 1:
          className = "control-panel-btn sent-both-active pos"; break;
        case 2:
          className = "control-panel-btn sent-both-active"; break;
        case 3:
          className = "control-panel-btn sent-both-active neg"; break;
        default:
          className = "control-panel-btn";
      }
    }

    else if (POS_PRESSED) {
      switch(btn){
        case 1:
          className = "control-panel-btn sent-pos-active"; break;
        case 2:
          className = "control-panel-btn sent-both"; break;
        case 3:
          className = "control-panel-btn sent-neg"; break;
        default:
          className = "control-panel-btn";
      }
    }

    else if (NEG_PRESSED) {
      switch(btn){
        case 1:
          className = "control-panel-btn sent-pos"; break;
        case 2:
          className = "control-panel-btn sent-both"; break;
        case 3:
          className = "control-panel-btn sent-neg-active"; break;
        default:
          className = "control-panel-btn";
      }
    }

    else {
      className = "control-panel-btn";
    }

    return className;
  }

  render () {
    return(
      <div className = "sentiment-filter-container">
        <div className = "control-panel-title">Sentiment Filter</div>
        <div className = "sentiment-btns">
          <button onClick = {()=> this.filterSentiment({pos: true, neg: false})} className = {this.renderClassName(this.props.sentimentFilters, 1)}>Positive</button>
          <button onClick = {()=> this.filterSentiment({pos: true, neg: true})} className = {this.renderClassName(this.props.sentimentFilters, 2)}>&</button>
          <button onClick = {()=> this.filterSentiment({pos: false, neg: true})} className = {this.renderClassName(this.props.sentimentFilters, 3)}>Negative</button>
        </div>
      </div>
    );
  }
}

export default SentimentFilter;
