import {CURRENT_MPD_STATUS_CLIENT, CURRENT_PLAYLIST_CLIENT, CURRENT_SONG_INFO_CLIENT} from '../../front.constants';

const initialState = {
    currentSong: {},
    currentPlaylist: [],
    mpdStatus: {},
    currentSongIndex: 0
};


export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_SONG_INFO_CLIENT:
            return {
                ...state,
                currentSong: action.data
            };
        case CURRENT_PLAYLIST_CLIENT:
            return {
                ...state,
                currentPlaylist: action.data
            };
        case CURRENT_MPD_STATUS_CLIENT: {
            const currentSongIndex = action.data && action.data.song;
            return {
                ...state,
                currentSongIndex,
                mpdStatus: action.data
            };
        }
        default:
            return state;
    }
};