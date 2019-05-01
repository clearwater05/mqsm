import {
    SAVED_PLAYLISTS_CLIENT,
    SONG_ATTRIBUTES_LIST
} from '../../front.constants';

const initialState = {
    playlists: [],
    songAttributes: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVED_PLAYLISTS_CLIENT:
            return {
                ...state,
                playlists: [...action.data]
            };
        case SONG_ATTRIBUTES_LIST: {
            const attributes = Object.keys(action.data);

            return {
                ...state,
                songAttributes: attributes
            };
        }
        default:
            return state;
    }
};