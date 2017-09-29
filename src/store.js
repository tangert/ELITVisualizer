import { compose, applyMiddleware, createStore } from 'redux'
import appReducer from  './reducers'
import {persistStore, autoRehydrate} from 'redux-persist'

let store = compose(
  autoRehydrate(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(appReducer);

persistStore(store);
export default store;
