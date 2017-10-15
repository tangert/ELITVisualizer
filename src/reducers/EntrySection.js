import { ANALYZE_TEXT, EDIT_TEXT, HANDLE_ENTRY_FOCUS } from './../actions/ActionTypes'

const initialState = {
  analyzedText: "",
  currentText: "",
  entryIsFocused: false,
  documents: [],
};

function calculateNewDocumentData(phrase) {
  let docs = [];
  for(var i = 0; i < 10; i++) {
    // let new_doc = calculateNewPhraseData(phrase);
    let new_doc = calculateNewPhraseData(phrase).slice(0,i+1);
    docs.push(new_doc);
  }

  // docs = [
  //   [
  //     {"tokens": ["I", "watched", "\"", "The", "Sound", "of", "Music", "\"", "last", "night", "."],
  //     "offsets": [[0, 1], [2, 9], [10, 11], [11, 14], [15, 20], [21, 23], [24, 29], [29, 30], [31, 35], [36, 41], [41, 42]],
  //     "sentiment": [0.37667542695999146, 0.46427300572395325, 0.1590515375137329],
  //     "sentiment_attention": [
  //       [0.2470878070464072, 0.4343088976186854, 0.3955557118871062, 0.6358840744761535, 0.9665015888752292, 0.6515589863669434, 0.6159515974562366, 0.6105072923246386, 0.8620230452895612, 1.0, 0.4456000892386808],
  //       [0.3171280026435852, 0.6691282391548157, 0.19084826111793518, 0.0, 0.4476154148578644, 0.0, 0.2879785895347595, 0.19084826111793518, 0.6314782500267029, 1.0, 0.0],
  //       [0.44327852999246803, 0.5385283947975887, 0.14779983265457636, 0.3997616456445128, 0.6684793021079655, 0.3212676243129084, 0.13479022803491875, 0.38457263746359577, 0.6644043353218206, 1.0, 0.5853780741068564],
  //       [0.028190937210151673, 0.028190937210151673, 0.30884398565727555, 0.651671689983114, 1.0, 0.7193469515528761, 0.5869181613598536, 0.5398241060338895, 0.9546765060862121, 0.7160866547432445, 0.4148524000523226],
  //       [0.0, 0.08480181234422009, 0.5297412080333613, 0.8801506444036202, 1.0, 0.9151981876557799, 0.8411012838903481, 0.859316911191557, 0.7394675555951771, 0.7394675555951771, 0.36862506367146775],
  //       [0.015709581057374012, 0.28684707421138994, 0.6218095877727099, 0.848496029291842, 0.9087808887109711, 0.954185157174948, 1.0, 0.66503748643868, 0.43835104491954785, 0.37806618550041876, 0.31695233597906786]
  //       ]
  //     },
  //
  //     {
  //       "tokens": ["It", "is", "my", "favorite", "movie", "."],
  //       "offsets": [[43, 45], [46, 48], [49, 51], [52, 60], [61, 66], [66, 67]],
  //       "sentiment": [0.007946201600134373, 0.015882069244980812, 0.9761717319488525],
  //       "sentiment_attention": [
  //         [0.29345440088910263, 0.7010049754825107, 0.8084983665509857, 1.0, 0.6117622859440198, 0.23396449590462637],
  //         [0.0, 0.2773584723472595, 0.018074527382850647, 1.0, 0.04298364371061325, 0.0],
  //         [0.22470464016215902, 0.7063524660710186, 0.8441400846802444, 1.0, 0.775710986582681, 0.1382032453540659],
  //         [0.3300112263452686, 0.7313725310539055, 0.9943257280288617, 1.0, 0.5986386952913632, 0.3356854983164071],
  //         [0.3886928151138094, 0.7719668444223577, 1.0, 1.0, 0.6113071848861906, 0.22803315557764228],
  //         [0.5206748581771264, 1.0, 1.0, 1.0, 1.0, 0.47932514182287356]
  //       ]
  //     }
  //   ]
  // ];

  return docs;
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
    case ANALYZE_TEXT:
      return { ...state,
        documents: calculateNewDocumentData(action.payload),
        analyzedText: state.currentText
    }
    case EDIT_TEXT:
      return { ...state, currentText: action.payload }
    case HANDLE_ENTRY_FOCUS:
      return { ...state, entryIsFocused: action.payload }
    default:
      return state;
  }
}
