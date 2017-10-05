import ControlPanel from './ControlPanel';
import EntrySection from './EntrySection';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ ControlPanel, EntrySection });

export default appReducer;
