import { ANALYZE_TEXT_SUCCESS, ANALYZE_TEXT_FAILURE, EDIT_TEXT, HANDLE_ENTRY_FOCUS } from './../actions/ActionTypes'
import axios from 'axios'

const initialState = {
  analyzedText: "",
  currentText: "",
  entryIsFocused: false,
  analyzedSuccess: true,
  documents: [],
};

function calculateNewDocumentData(data) {


}

function calculateNewPhraseData(phrase){

  let sentences = phrase.split(/[\\.!\?]/);
  let new_data = [];

  for(var i = 0; i < sentences.length; i++) {
    let current = sentences[i];
    let tokens = current.split(' ');

    let pos = Math.random();
    let neut = Math.random();
    let neg = Math.random();


    new_data.push(
      {
        "tokens": tokens,
        "sentiment": [pos,neut,neg],
        "sentiment_attention": [
          createWeights(tokens),
          createWeights(tokens),
          createWeights(tokens),
          createWeights(tokens),
          createWeights(tokens),
          createWeights(tokens)
        ]
      }
    )
  }
  return new_data;
}

function createWeights(input){
  let weights = [];
  let max = 1;
  let min = 0;

  for(var i = 0; i < input.length; i++ ) {
    weights[i] = Math.random() * (max - min) + min;
  }
  return weights;
}

export default function EntrySection(state = initialState, action) {
  switch(action.type){

    case ANALYZE_TEXT_SUCCESS:
      return { ...state,
        documents: action.payload,
        analyzedText: state.currentText,
        analyzedSuccess: true,
    }

    case ANALYZE_TEXT_FAILURE:
      return { ...state,
        analyzedSuccess: false
      }

    case EDIT_TEXT:
      return { ...state, currentText: action.payload }

    case HANDLE_ENTRY_FOCUS:
      return { ...state, entryIsFocused: action.payload }

    default:
      return state;
  }
}
