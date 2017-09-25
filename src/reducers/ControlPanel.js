/*****
CONTROL PANEL REDUCER
This function takes in the current state and actions
triggered by the control panel. E.g., moving around the slider,
selecting the sentiment filters, etc.
******/
import { SELECT_NGRAM,
         SELECT_NGRAM_POSITION,
         SELECT_DEPTH,
         FILTER_JSON,
         FILTER_SENTIMENT,
         CALC_CURRENT_TOKEN_DATA } from './../actions/ActionTypes'

const initialState = {
  //Switch data
  currentNgram: 1,
  currentNgramPosition: 1,
  sentimentFilters: {
    pos: true,
    neg: true
  },
  depthOn: false,
  jsonOn: false,

  //Calculations
  currentTokenData: {
    calculatedString: "",
    calculatedTokens: [],
    calculatedNgrams: []
  }
};

function calculateCurrentTokenData(state) {
  //calculates the current data from the given state.
  console.log("PASSED IN STATE: ", state);
}

function calculateString() {

}

function calculateTokens() {

}

function calculateNgrams() {

}

export default function ControlPanel(state = initialState, action) {
  switch(action.type){

    case SELECT_NGRAM:
      return { ...state, currentNgram: action.payload }

    case SELECT_NGRAM_POSITION:
      return { ...state, currentNgramPosition: action.payload }

    case FILTER_SENTIMENT:
      return { ...state, sentimentFilters: action.payload }

    case SELECT_DEPTH:
      return { ...state, depthOn: action.payload }

    case FILTER_JSON:
      return { ...state, jsonOn: action.payload }

    case CALC_CURRENT_TOKEN_DATA:
      return { ...state, currentTokenData: calculateCurrentTokenData(state)};

    default:
      return state;
  }
}
