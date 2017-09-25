import { ANALYZE_TEXT, EDIT_TEXT } from './../actions/ActionTypes'

const initialState = {
  analyzedText: "",
  currentText: ""
};

export default function EntrySection(state = initialState, action) {
  switch(action.type){
    case ANALYZE_TEXT:
      return { ...state, analyzedText: action.payload }
    case EDIT_TEXT:
      return { ...state, currentText: action.payload }
    default:
      return state;
  }
}
