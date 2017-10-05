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
      case 1:
        return sentence.sentiment_attention_1;
        break;
      case 2:
        return sentence.sentiment_attention_2;
        break;
      case 3:
        return sentence.sentiment_attention_3;
        break;
      case 4:
        return sentence.sentiment_attention_4;
        break;
      case 5:
        return sentence.sentiment_attention_5;
        break;
      default:
        return sentence.sentiment_attention_1;
    }
  }

  renderNgrams = (phrase) => {
    console.log("Rendering ngrams");

    let Ngrams = [];
    let visibleSentences = this.props.visibleSentences;

    let start = 0
    let end = phrase.length;

    if(visibleSentences.length > 0) {
      start = visibleSentences[0];
      end = visibleSentences[1] + 1;
    }

    for(let sentenceIndex = start; sentenceIndex < end; sentenceIndex++) {

      let sentence = phrase[sentenceIndex];
      console.log(sentence);

      let weights = this.mapPosToWeights(this.props.ngramPos, sentence);
      console.log(weights);
      let isVisible;
      let filters = this.props.sentimentFilters;

      //Predominant sentiment in the sentence for filtering purposes.
      let maxSent = Math.max(...sentence.sentiment);

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
    return Ngrams;
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
    if(this.props.phrase.length > 0) {
      maxNodeHeight = Math.max(...this.props.phrase.map((sentence) => {
        return sentence.tokens.length;
      }));

      if(this.props.visibleSentences.length > 0) {
        sentenceCount = this.props.visibleSentences[1] - this.props.visibleSentences[0];
        console.log("visible sentence lenght: ", sentenceCount);
      } else {
        sentenceCount = this.props.phrase.length;
        console.log("phrase sentence lenght: ", sentenceCount);
      }
    } else {
      maxNodeHeight = 100;
      sentenceCount = 5;
    }

    let jsonContainer;
    if(this.props.jsonOn) {
      jsonContainer = (
        <div className = "json-container" style = {{flex: 1}}>
          <JSONTree data = {this.props.phrase}  theme = {theme} invertTheme/>
        </div>
      )
    }

    return(
      <div
        className = "visualization-container"
        style = {this.props.visualFocus.scale ? {minHeight: maxNodeHeight * sentenceCount * 5} : {}}>

        <div className = "ngrams-container">
          { this.renderNgrams(this.props.phrase) }
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
    phrase: state.EntrySection.phrase,
    visibleSentences: state.ControlPanel.visibleSentences
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
