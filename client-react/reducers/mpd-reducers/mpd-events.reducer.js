import {CURRENT_MPD_STATUS_CLIENT, CURRENT_PLAYLIST_CLIENT, CURRENT_SONG_INFO_CLIENT} from '../../front.constants';

const initialState = {
    currentSong: {},
    currentPlaylist: {},
    mpdStatus: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_SONG_INFO_CLIENT:
            return {
                ...state,
                currentSong: action.data
            };
        case CURRENT_PLAYLIST_CLIENT:
            console.log(action.data);
            return {
                ...state,
                currentPlaylist: action.data
            };
        case CURRENT_MPD_STATUS_CLIENT:
            return {
                ...state,
                mpdStatus: action.data
            };
        default:
            return state;
    }
};