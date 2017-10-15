import React, { Component } from 'react'
import NgramSelector from './NgramSelector/NgramSelector'
import SentimentFilter from './SentimentFilter/SentimentFilter'
import JSONFilter from './JSONFilter/JSONFilter'
import VisualFocusSelector from './VisualFocusSelector/VisualFocusSelector'
import DocSentenceFilter from './DocSentenceFilter/DocSentenceFilter'
import { MdChevronRight, MdChevronLeft } from 'react-icons/lib/md'
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

  selectNgramPostion = (data) => {
    this.props.actions.selectNgramPosition(data);
  }

  filterSentiment = (data) => {
    this.props.actions.filterSentiment(data);
  }

  filterJSON = (data) => {
    this.props.actions.filterJSON(data);
  }

  selectVisualFocus = (data) => {
    this.props.actions.selectVisualFocus(data);
  }

  filterSentences = (data) => {
    this.props.actions.filterSentences(data);
  }

  selectDocument = (data) => {
    this.props.actions.selectDocument(data);
  }

  render () {

    let entryFocusStyle;
    let overlay;

    if(this.props.entryIsFocused) {
      entryFocusStyle = {
        marginTop: "50px",
        zIndex: -999, /* Specify a stack order in case you're using a different order for other elements */
      }

      overlay = (
        <div className = "overlay"
             style = {{
              position: "fixed", /* Sit on top of the page content */
              width: "100%", /* Full width (cover the whole page) */
              height: "100%", /* Full height (cover the whole page) */
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)", /* Black background with opacity */
              zIndex: 999, /* Specify a stack order in case you're using a different order for other elements */
              cursor: "pointer", /* Add a pointer on hover */
             }}></div>
      )
    }

    return(
      <div className = "control-panel-container" style = {entryFocusStyle}>
        {overlay}
        <div className = "control-panel-top">
          <DocSentenceFilter
            documents = {this.props.documents}
            selectedDocument = {this.props.selectedDocument}
            filterSentences = {this.filterSentences}
            selectDocument = {this.selectDocument}
            />
        </div>

        <div className = "control-panel-bottom">
          <NgramSelector
            visualFocus = {this.props.visualFocus}
            selectNgramPostion = {this.selectNgramPostion}

            currentNgram = {this.props.currentNgram}
            currentNgramPosition = {this.props.currentNgramPosition}
            />

          <VisualFocusSelector
            selectVisualFocus = {this.selectVisualFocus}
            visualFocus = {this.props.visualFocus}
            />

          <SentimentFilter filterSentiment = {this.filterSentiment}
              sentimentFilters = {this.props.sentimentFilters}/>

          <JSONFilter filterJSON = {this.filterJSON}
            jsonOn = {this.props.jsonOn}/>

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
    visualFocus: state.ControlPanel.visualFocus,
    jsonOn: state.ControlPanel.jsonOn,
    selectedDocument: state.ControlPanel.selectedDocument,
    entryIsFocused: state.EntrySection.entryIsFocused,

    currentText: state.EntrySection.currentText,
    phraseData: state.EntrySection.phrase,
    documents: state.EntrySection.documents
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
