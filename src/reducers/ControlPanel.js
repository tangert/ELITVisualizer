/*****
CONTROL PANEL REDUCER
This function takes in the current state and actions
triggered by the control panel. E.g., moving around the slider,
selecting the sentiment filters, etc.
******/

import { SELECT_NGRAM_POSITION,
         SELECT_VISUAL_FOCUS,
         FILTER_SENTENCES,
         FILTER_JSON,
         FILTER_SENTIMENT,
         SELECT_DOCUMENT } from './../actions/ActionTypes'

import { NEGATIVE,
         NEUTRAL,
         POSITIVE } from './../constants.js'

const initialState = {
  currentNgramPosition: 0,
  sentimentFilters: {
    positive: false,
    neutral: false,
    negative: false
  },
  visualFocus: {
    opacity: false,
    scale: false
  },
  jsonOn: false,
  visibleSentences: [],
  selectedDocument: 0
};

function selectVisualFocus(state, focus) {
  let visualFocus;

  if(focus === "OPACITY") {
    visualFocus = {
      opacity: !state.visualFocus.opacity,
      scale: state.visualFocus.scale
    }
  } else {
    visualFocus = {
      opacity: state.visualFocus.opacity,
      scale: !state.visualFocus.scale
    }
  }
  return visualFocus;
}

function selectSentimentFilters(state, buttonType) {
  let filters;

  if(buttonType === NEGATIVE) {
    filters = {
      positive: state.sentimentFilters.positive,
      neutral: state.sentimentFilters.neutral,
      negative: !state.sentimentFilters.negative
    }
  } else if (buttonType === NEUTRAL) {
    filters = {
      positive: state.sentimentFilters.positive,
      neutral: !state.sentimentFilters.neutral,
      negative: state.sentimentFilters.negative
    }
  } else {
    filters = {
      positive: !state.sentimentFilters.positive,
      neutral: state.sentimentFilters.neutral,
      negative: state.sentimentFilters.negative
    }
  }
  return filters;
}

export default function ControlPanel(state = initialState, action) {
  switch(action.type){

    case SELECT_NGRAM_POSITION:
      return { ...state, currentNgramPosition: action.payload }

    case FILTER_SENTIMENT:
      return { ...state,
        sentimentFilters: selectSentimentFilters(state, action.payload)
      }

    case SELECT_VISUAL_FOCUS:
      return { ...state, visualFocus: selectVisualFocus(state, action.payload)}

    case FILTER_JSON:
      return { ...state, jsonOn: action.payload }

    case FILTER_SENTENCES:
      return { ...state, visibleSentences: action.payload }

    case SELECT_DOCUMENT:
      return { ...state, selectedDocument: action.payload }

    default:
      return initialState;
  }
}
