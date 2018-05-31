import {combineReducers} from 'redux';
import systemCommands from './system-commands.reducer';

const rootReducer = combineReducers({
    systemCommands
});

export default rootReducer;