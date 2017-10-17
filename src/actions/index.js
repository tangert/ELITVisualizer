import * as types from './ActionTypes'
import axios from 'axios'

const API_URL = "http://elit.cloud/demo/";

/****TEXT ENTRY FUNCTIONS****/
export function editText(data){
  return {
    type: types.EDIT_TEXT,
    payload: data
  }
}

export function analyzeText(data){
  //THIS IS A THUNK
  console.log("ANALYZING TEXT: ", data);

  return (dispatch) => {

    //mode': 'no-cors',

      var headers = {
          // 'Accept': 'application/json',
          // 'Access-Control-Allow-Origin': "*",
          // "Access-Control-Allow-Methods": "POST",
          'Content-Type': 'application/json',
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      };

    //return axios.post(API_URL, data, headers)

    // return fetch(API_URL, {
    //     method: 'post',
    //     body: JSON.stringify(data),
    //     headers: headers
    //   })
    //   .then(function(response) {
    //     dispatch(analyzeTextSuccess(response.data[0]))
    //   })
    //   .catch(error => {
    //     dispatch(analyzeTextFailure());
    //   });

      return axios({
              method: 'POST',
              url: API_URL,
              headers: headers,
              data: data
            })

      .then( response =>{
        dispatch(analyzeTextSuccess(response.data[0]))
      })

      .catch(error => {
        console.log("ERROR: ", error);
        dispatch(analyzeTextFailure());
      });
  }

}

// CALLED ONCE THE API RETURNS SUCCESSFULLY
export function analyzeTextSuccess(data) {
  return {
    type: types.ANALYZE_TEXT_SUCCESS,
    payload: data
  }
}

export function analyzeTextFailure() {
  return {
    type: types.ANALYZE_TEXT_FAILURE
  }
}

export function handleEntryFocus(data) {
  return {
    type: types.HANDLE_ENTRY_FOCUS,
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


export function filterSentences(data) {
  return {
    type: types.FILTER_SENTENCES,
    payload: data
  }
}

export function selectDocument(data) {
  return {
    type: types.SELECT_DOCUMENT,
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

export function setHoveredSection(data) {
  return {
    type: types.SET_HOVERED_SECTION,
    payload: data
  }
}
