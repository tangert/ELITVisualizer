import React, { Component } from 'react'
import './EntrySection.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EntrySection extends Component {

  editText = (e) => {
    this.props.actions.editText(e.target.value);
  }

  analyzeText = () => {
    if(this.props.currentText !== "") {
      this.props.actions.analyzeText(this.props.currentText);
    } else {
      console.log("need text");
    }

    //Here, send a request to the ELIT API with this.props.currentText.
  }

  render () {
    return(
      <div className = "entry-section-container">
          <textarea
            value = {this.props.currentText}
            onChange = {this.editText}
            className = "entry-textarea"
            placeholder = "Enter any text here to analyze its sentiment.">
          </textarea>
          <button onClick = {this.analyzeText} className = "analyze-text-btn">Analyze</button>
        <div className = "separator"></div>
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
    analyzedText: state.EntrySection.analyzedText,
    currentText: state.EntrySection.currentText,
    currentNgram: state.ControlPanel.currentNgram,
    phraseData: state.EntrySection.phrase
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(EntrySection)
