import React, { Component } from 'react'
import NgramSelector from './NgramSelector/NgramSelector'
import SentimentFilter from './SentimentFilter/SentimentFilter'
import JSONFilter from './JSONFilter/JSONFilter'
import DepthSelector from './DepthSelector/DepthSelector'
import './ControlPanel.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ControlPanel extends Component {

  /****FUNCTION DOCUMENTATION****/
  /******************************/
  /*
  These functions essentially ONLY directly manipulate the SETTINGS on the state.
  Once all of the settings are adjusted properly, we call calculateCurrentTokenData
  in order to take the adjusted settings and pass in the current text as a parameter.
  */
  /******************************/
  /******************************/

  selectVisualFocus = (focus) => {
    this.props.actions.selectVisualFocus(focus);
  }

  selectNgramPostion = (data) => {
    this.props.actions.selectNgramPosition(data);
  }

  filterSentiment = (data) => {
    this.props.actions.filterSentiment(data);
  }

  filterJSON = (data) => {
    this.props.actions.filterJSON(data);
  }

  selectDepth = (data) => {
    this.props.actions.selectDepth(data);
  }

  render () {
    return(
      <div className = "control-panel-container">

        <div className = "control-panel-top">
          <div className = "control-panel-top-title">Visual focus</div>
          <div>
            <button onClick = {() => this.selectVisualFocus("WORDS")} className = {this.props.visualFocus === "WORDS" ? "visual-focus-btn active": "visual-focus-btn"}>Words</button>
            <button onClick = {() => this.selectVisualFocus("SENTENCES")} className = {this.props.visualFocus === "SENTENCES" ? "visual-focus-btn active": "visual-focus-btn"}>Sentences</button>
          </div>
        </div>

        <div className = "control-panel-separator"></div>
        <div className = "control-panel-bottom">
          <NgramSelector
            selectNgramPostion = {this.selectNgramPostion}

            currentNgram = {this.props.currentNgram}
            currentNgramPosition = {this.props.currentNgramPosition}
            />

          <SentimentFilter filterSentiment = {this.filterSentiment}
            sentimentFilters = {this.props.sentimentFilters}/>

          <JSONFilter filterJSON = {this.filterJSON} />

          <DepthSelector
            selectDepth = {this.selectDepth}
            depthOn = {this.props.depthOn}
            />
        </div>
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
    currentNgramPosition: state.ControlPanel.currentNgramPosition,
    sentimentFilters: state.ControlPanel.sentimentFilters,
    depthOn: state.ControlPanel.depthOn,
    jsonOn: state.ControlPanel.jsonOn,
    visualFocus: state.ControlPanel.visualFocus,

    currentText: state.EntrySection.currentText,
    phraseData: state.EntrySection.phrase
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
