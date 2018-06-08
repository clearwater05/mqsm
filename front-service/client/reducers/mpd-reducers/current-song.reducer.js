import { CURRENT_SONG_INFO_CLIENT } from '../../../front.constants';

const initialState = {
    currentSong: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_SONG_INFO_CLIENT:
            console.log(action.data);
            return {
                ...state,
                currentSong: action.data
            };
        default:
            return state;
    }
};