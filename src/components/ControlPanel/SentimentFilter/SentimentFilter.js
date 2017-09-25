import React, { PropTypes } from 'react'
import './SentimentFilter.css'

class SentimentFilter extends React.Component {
  render () {
    return(
      <div className = "sentiment-filter-container">
        <div className = "control-panel-title">Sentiment Filter</div>
        <div className = "sentiment-btns">
          <button className = "control-panel-btn sent-pos">Positive</button>
          <button className = "control-panel-btn sent-both">&</button>
          <button className = "control-panel-btn sent-neg">Negative</button>
        </div>
      </div>
    );
  }
}

export default SentimentFilter;
