import React, { Component } from 'react'
import Ngram from './Ngram/Ngram'
import './Visualization.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Visualization extends Component {

  hashCode = (string) => {
    if(string === undefined) {
      return undefined;
    }

    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  mapPosToWeights = (pos, sentence) => {
    switch(pos){
      case 1:
        return sentence.ngram1;
        break;
      case 2:
        return sentence.ngram2;
        break;
      case 3:
        return sentence.ngram3;
        break;
      case 4:
        return sentence.ngram4;
        break;
      case 5:
        return sentence.ngram5;
        break;
      default:
        return sentence.ngram1;
    }
  }

  renderNgrams = (data) => {
    console.log("render");
    let Ngrams = [];

    for(var i = 0; i < data.length; i++) {

      let sentence = data[i];
      let weights = this.mapPosToWeights(this.props.ngramPos, sentence);

      var negatives_abs = weights.filter(weight => weight < 0).map((weight) => {
        return Math.abs(weight);
      });
      var positives = weights.filter(weight => weight > 0);

      var neg_abs_max = Math.max(...negatives_abs);
      var pos_max = Math.max(...positives);

      for(var j = 0; j < weights.length; j++) {

        let weight;
        let ratio;
        let visible;

        let filters = this.props.sentimentFilters;
        let BOTH_PRESSED = filters.pos && filters.neg;
        let POS_PRESSED = filters.pos && !filters.neg;
        let NEG_PRESSED = !filters.pos && filters.neg;

        if(this.props.visualFocus === "WORDS") {
          weight = weights[j].toFixed(2);
        } else {
          weight = sentence.weight.toFixed(2);
        }

        if (weight < 0) {
          ratio = Math.abs(weight)/neg_abs_max;

          if(BOTH_PRESSED || NEG_PRESSED) {
            visible = true;
          } else {
            visible = false;
          }

        } else {
          ratio = weight/pos_max;

          if(BOTH_PRESSED || POS_PRESSED) {
            visible = true;
          } else {
            visible = false;
          }

        }

        Ngrams.push(
          <Ngram
            token = {sentence.tokens[j]}
            key = {sentence.tokens[j] + i + j}
            weight = {weight}
            depthOn = {this.props.depthOn}
            transform = {this.props.transform}
            ratio = {ratio}
            visible = {visible}
            >
          </Ngram>
        );
      }
    }
    return Ngrams;
  }

  render () {
    return(
      <div
        onMouseMove={this.handleMove}
        className = "visualization-container"
        ref="root">
        { this.renderNgrams(this.props.phrase) }
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
    depthOn: state.ControlPanel.depthOn,
    jsonOn: state.ControlPanel.jsonOn,
    ngramPos: state.ControlPanel.currentNgramPosition,
    visualFocus: state.ControlPanel.visualFocus,
    phrase: state.EntrySection.phrase
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
