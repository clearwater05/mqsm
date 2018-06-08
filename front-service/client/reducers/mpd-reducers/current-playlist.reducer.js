import {CURRENT_PLAYLIST_CLIENT} from '../../../front.constants';

const initialState = {
    currentPlaylist: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PLAYLIST_CLIENT:
            return {
                ...state,
                currentPlaylist: action.data
            };
        default:
            return state;
    }
};