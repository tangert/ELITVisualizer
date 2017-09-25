import ControlPanel from './ControlPanel';
import EntrySection from './EntrySection';
import Visualization from './Visualization';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ ControlPanel, EntrySection, Visualization });

export default appReducer;
