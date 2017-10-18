import React, { Component } from 'react'
import Ngram from './Ngram/Ngram'
import JSONTree from 'react-json-tree'
import './Visualization.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Visualization extends Component {


  mapPosToWeights = (pos, sentence) => {
    switch(pos){
      case 0:
        return sentence.sentiment_attention[0];
      case 1:
        return sentence.sentiment_attention[1];
        break;
      case 2:
        return sentence.sentiment_attention[2];
        break;
      case 3:
        return sentence.sentiment_attention[3];
        break;
      case 4:
        return sentence.sentiment_attention[4];
        break;
      case 5:
        return sentence.sentiment_attention[5];
        break;
      default:
        return sentence.sentiment_attention[0];
    }
  }

  renderNgrams = (documents, selectedDocument) => {

    console.log("FROM RENDER NGRAM: ", documents);

    if(!this.props.analyzedSuccess) {
      return;
    }

    let currentDocument = documents[selectedDocument];

    if (currentDocument !== undefined && !this.props.entryIsFocused) {

      let Ngrams = [];
      let visibleSentences = this.props.visibleSentences;

      let start;
      let end;

      if(visibleSentences.length > 0 && currentDocument.length > 1) {
        start = visibleSentences[0];
        end = visibleSentences[1] + 1;
      } else {
        start = 0;
        end = currentDocument.length;
      }

      for(let sentenceIndex = start; sentenceIndex < end; sentenceIndex++) {

        let sentence = currentDocument[sentenceIndex];

        if(sentence === undefined) {
          return [];
        }

        let weights = this.mapPosToWeights(this.props.ngramPos, sentence);
        let isVisible;
        let filters = this.props.sentimentFilters;

        //Predominant sentiment in the sentence for filtering purposes.
        let maxSent = 0;

        if(sentence.sentiment !== undefined) {

          for(var i = 0; i < sentence.sentiment.length; i++) {
            if (sentence.sentiment[i] > maxSent) {
              maxSent = sentence.sentiment[i];
            }
          }

          let negScore = sentence.sentiment[0];
          let neutScore = sentence.sentiment[1];
          let posScore = sentence.sentiment[2];

          let POSITIVE_PRESSED = filters.positive;
          let NEGATIVE_PRESSED = filters.negative;
          let NEUTRAL_PRESSED = filters.neutral;

          for(let tokenIndex = 0; tokenIndex < weights.length; tokenIndex++) {

            if(maxSent  === negScore) {
              if(NEGATIVE_PRESSED) {
                isVisible = true;
              } else {
                isVisible = false;
              }
            } else if (maxSent === neutScore) {
              if(NEUTRAL_PRESSED) {
                isVisible = true;
              } else {
                isVisible = false;
              }
            } else {
              if(POSITIVE_PRESSED) {
                isVisible = true;
              } else {
                isVisible = false;
              }
            }

            //Default
            if(!POSITIVE_PRESSED && !NEUTRAL_PRESSED && !NEGATIVE_PRESSED) {
              isVisible = true;
            }

            Ngrams.push(
              <Ngram
                token = {sentence.tokens[tokenIndex]}
                key = {sentence.tokens[tokenIndex] + sentenceIndex + tokenIndex}

                sentenceSentiment = {sentence.sentiment}
                weight = {weights[tokenIndex]}

                visualFocus = {this.props.visualFocus}
                visible = {isVisible}
                />
            );
          }
        }
      }
      return Ngrams;
    }
  }

  render () {

    let maxNodeHeight;
    let sentenceCount;

    //JSON theme
    const theme = {
      scheme: 'monokai',
      author: 'wimer hazenberg (http://www.monokai.nl)',
      base00: '#272822',
      base01: '#383830',
      base02: '#49483e',
      base03: '#75715e',
      base04: '#a59f85',
      base05: '#f8f8f2',
      base06: '#f5f4f1',
      base07: '#f9f8f5',
      base08: '#f92672',
      base09: '#fd971f',
      base0A: '#f4bf75',
      base0B: '#a6e22e',
      base0C: '#a1efe4',
      base0D: '#66d9ef',
      base0E: '#ae81ff',
      base0F: '#cc6633'
    };

    //This is to help out the minheiht of the container.
    let currDoc = this.props.documents[this.props.selectedDocument];

    if(currDoc !== undefined) {
      maxNodeHeight = Math.max(...currDoc.map((sentence) => {
        return sentence.tokens.length;
      }));

      if(this.props.visibleSentences.length > 0) {
        sentenceCount = this.props.visibleSentences[1] - this.props.visibleSentences[0];
      } else {
        sentenceCount = currDoc.length;
      }
    } else {
      maxNodeHeight = 100;
      sentenceCount = 5;
    }

    let jsonContainer;
    if(this.props.jsonOn) {
      jsonContainer = (
        <div className = "json-container" style = {{flex: 1}}>
          <JSONTree data = {this.props.documents}  theme = {theme} invertTheme/>
        </div>
      )
    }

    let entryFocusStyle;
    if(this.props.entryIsFocused) {
      entryFocusStyle = {
        zIndex: -999,
        opacity: 0.2
      }
    }

    return(
      <div
        className = "visualization-container"
        style = {this.props.visualFocus.scale ? {minHeight: sentenceCount * maxNodeHeight * 5} : {}}>

        <div className = "ngrams-container" style = {entryFocusStyle}>
          { this.renderNgrams(this.props.documents, this.props.selectedDocument) }
        </div>

        {jsonContainer}

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
    sentimentFilters: state.ControlPanel.sentimentFilters,
    jsonOn: state.ControlPanel.jsonOn,
    ngramPos: state.ControlPanel.currentNgramPosition,
    visualFocus: state.ControlPanel.visualFocus,
    entryIsFocused: state.EntrySection.entryIsFocused,

    documents: state.EntrySection.documents,
    selectedDocument: state.ControlPanel.selectedDocument,
    visibleSentences: state.ControlPanel.visibleSentences,
    analyzedSuccess: state.EntrySection.analyzedSuccess
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
