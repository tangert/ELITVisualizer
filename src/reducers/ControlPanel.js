/*****
CONTROL PANEL REDUCER
This function takes in the current state and actions
triggered by the control panel. E.g., moving around the slider,
selecting the sentiment filters, etc.
******/

import { SELECT_VISUAL_FOCUS,
         SELECT_NGRAM_POSITION,
         SELECT_DEPTH,
         FILTER_JSON,
         FILTER_SENTIMENT } from './../actions/ActionTypes'

const initialState = {
  visualFocus: "WORDS",
  currentNgramPosition: 1,
  sentimentFilters: {
    pos: true,
    neg: true
  },
  depthOn: false,
  jsonOn: false,
};

export default function ControlPanel(state = initialState, action) {
  switch(action.type){

    case SELECT_VISUAL_FOCUS:
      return { ...state, visualFocus: action.payload }

    case SELECT_NGRAM_POSITION:
      return { ...state, currentNgramPosition: action.payload }

    case FILTER_SENTIMENT:
      return { ...state, sentimentFilters: action.payload }

    case SELECT_DEPTH:
      return { ...state, depthOn: action.payload }

    case FILTER_JSON:
      return { ...state, jsonOn: action.payload }

    default:
      return initialState;
  }
}
