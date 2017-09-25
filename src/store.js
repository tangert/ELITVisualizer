import { compose, applyMiddleware, createStore } from 'redux'
import appReducer from  './reducers'
import {persistStore, autoRehydrate} from 'redux-persist'

let store = compose(
  autoRehydrate()
)(createStore)(appReducer);

persistStore(store);
export default store;
