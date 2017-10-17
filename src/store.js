import { compose, applyMiddleware, createStore } from 'redux'
import appReducer from  './reducers'
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = compose(
  autoRehydrate(),
  applyMiddleware(thunk)
)(createStore)(appReducer);

// persistStore(store);
export default store;
