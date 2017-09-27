import { ANALYZE_TEXT, EDIT_TEXT } from './../actions/ActionTypes'

const initialState = {
  currentText: "",
  phrase: {},
};

function calculateNewPhraseData(phrase){

  let sentences = phrase.split(/[\\.!\?]/);
  let new_data = [];

  for(var i = 0; i < sentences.length; i++) {
    let current = sentences[i];
    let tokens = current.split(' ');

    new_data.push(
      {
        tokens: tokens,
        ngram1: createWeights(tokens),
        ngram2: createWeights(tokens),
        ngram3: createWeights(tokens),
        ngram4: createWeights(tokens),
        ngram5: createWeights(tokens),
        weight: (Math.random() * (1 - (-1)) + (-1))
      }
    )
  }

  console.log(new_data);
  return new_data;
}

function createWeights(input){
  let weights = [];
  let max = 1;
  let min = -1;

  for(var i = 0; i < input.length; i++ ) {
    weights[i] = Math.random() * (max - min) + min;
  }
  return weights;
}

export default function EntrySection(state = initialState, action) {
  switch(action.type){
    case ANALYZE_TEXT:
      return { ...state, phrase: calculateNewPhraseData(action.payload)}
    case EDIT_TEXT:
      return { ...state, currentText: action.payload }
    default:
      return state;
  }
}
