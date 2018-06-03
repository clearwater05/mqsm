import {combineReducers} from 'redux';
import systemCommands from './system-commands.reducer';
import updateDatabaseReducer from './database-reducers/update-progress.reducer';

const rootReducer = combineReducers({
    systemCommands,
    updateDatabaseReducer
});

export default rootReducer;