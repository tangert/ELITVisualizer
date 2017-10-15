import { compose, applyMiddleware, createStore } from 'redux'
import appReducer from  './reducers'
import {persistStore, autoRehydrate} from 'redux-persist'

//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = compose(
  autoRehydrate(),
)(createStore)(appReducer);

// persistStore(store);
export default store;
