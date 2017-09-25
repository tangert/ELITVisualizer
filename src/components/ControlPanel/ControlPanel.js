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

  selectNgram = (data) => {
    this.props.actions.selectNgram(data);
    this.props.actions.calculateCurrentTokenData();
  }

  selectNgramPostion = (data) => {
    this.props.actions.selectNgramPosition(data);
    this.props.actions.calculateCurrentTokenData();
  }

  filterSentiment = (data) => {
    this.props.actions.filterSentiment(data);
    this.props.actions.calculateCurrentTokenData();
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

        <NgramSelector
          selectNgram = {this.selectNgram}
          selectNgramPostion = {this.selectNgramPostion}

          currentNgram = {this.props.currentNgram}
          currentNgramPosition = {this.props.currentNgramPosition}
          />

        <SentimentFilter filterSentiment = {this.filterSentiment} />

        <JSONFilter filterJSON = {this.filterJSON} />

        <DepthSelector
          selectDepth = {this.selectDepth}
          depthOn = {this.props.depthOn}
          />

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
    currentNgram: state.ControlPanel.currentNgram,
    currentNgramPosition: state.ControlPanel.currentNgramPosition,
    sentimentFilters: state.ControlPanel.sentimentFilters,
    depthOn: state.ControlPanel.depthOn,
    jsonOn: state.ControlPanel.jsonOn,

    calculatedString: state.ControlPanel.calculatedString,
    calculatedTokens: state.ControlPanel.calculatedTokens,
    calculatedNgrams: state.ControlPanel.calculatedNgrams
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
