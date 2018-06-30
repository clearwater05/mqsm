import {combineReducers} from 'redux';
import systemCommands from './system-commands.reducer';
import updateDatabaseProgress from './database-reducers/update-progress.reducer';
import mpdEvents from './mpd-reducers/mpd-events.reducer';
import cleanedSongCount from './database-reducers/cleaned-song-count.reducer';
import fsRequests from './system-reducers/fs-requests.reducer';

const rootReducer = combineReducers({
    mpdEvents,
    systemCommands,
    updateDatabaseProgress,
    cleanedSongCount,
    fsRequests
});

export default rootReducer;