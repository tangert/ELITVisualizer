import * as types from './ActionTypes';

/****TEXT ENTRY FUNCTIONS****/
export function editText(data){
  return {
    type: types.EDIT_TEXT,
    payload: data
  }
}

export function analyzeText(data){
  return {
    type: types.ANALYZE_TEXT,
    payload: data
  }
}

/********************************/
/********************************/
/********************************/

/****CONTROL PANEL FUNCTIONS****/
export function selectVisualFocus(data) {
  return {
    type: types.SELECT_VISUAL_FOCUS,
    payload: data
  }
}
export function selectNgramPosition(data) {
  return {
    type: types.SELECT_NGRAM_POSITION,
    payload: data
  }
}

export function filterSentiment(data) {
  return {
    type: types.FILTER_SENTIMENT,
    payload: data
  }
}

export function filterJSON(data) {
  return {
    type: types.FILTER_JSON,
    payload: data
  }
}

export function selectDepth(data) {
  return {
    type: types.SELECT_DEPTH,
    payload: data
  }
}

export function calculateCurrentTokenData(data) {
  return {
    type: types.CALC_CURRENT_TOKEN_DATA,
    payload: data
  }
}

/********************************/
/********************************/
/********************************/

/****VISUALIZATION FUNCTIONS****/
export function setPerspective(data) {
  return {
    type: types.SET_PERSPECTIVE,
    payload: data
  }
}
