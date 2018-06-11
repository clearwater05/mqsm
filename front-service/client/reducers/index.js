import {combineReducers} from 'redux';
import systemCommands from './system-commands.reducer';
import updateDatabaseReducer from './database-reducers/update-progress.reducer';
import currentPlaylistReducer from './mpd-reducers/current-playlist.reducer';
import currentSongReducer from './mpd-reducers/current-song.reducer';
import cleanedSongCount from './database-reducers/cleaned-song-count.reducer';
import mpdStateReducer from './mpd-reducers/state.reducer';

const rootReducer = combineReducers({
    systemCommands,
    updateDatabaseReducer,
    currentPlaylistReducer,
    currentSongReducer,
    cleanedSongCount,
    mpdStateReducer
});

export default rootReducer;