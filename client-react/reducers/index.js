import {combineReducers} from 'redux';
import updateDatabaseProgress from './database-reducers/update-progress.reducer';
import mpdEvents from './mpd-reducers/mpd-events.reducer';
import cleanedSongCount from './database-reducers/cleaned-song-count.reducer';
import fsRequests from './system-reducers/fs-requests.reducer';
import playlistsReducer from './playlist-reducers/playlist.reducer';
import selectedSong from './database-reducers/selected-song.reducer';

const rootReducer = combineReducers({
    mpdEvents,
    updateDatabaseProgress,
    cleanedSongCount,
    fsRequests,
    playlistsReducer,
    selectedSong
});

export default rootReducer;