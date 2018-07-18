import {
    SAVED_PLAYLISTS_CLIENT
} from '../../front.constants';

const initialState = {
    playlists: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVED_PLAYLISTS_CLIENT:
            return {
                ...state,
                playlists: [...action.data]
            };
        default:
            return state;
    }
};