import {CLEANED_SONG_COUNT_CLIENT} from '../../front.constants';

const initialState = {
    cleanedSongCount: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEANED_SONG_COUNT_CLIENT: {
            const cleanedSongCount = action.data;
            return {
                cleanedSongCount
            };
        }
        default:
            return state;
    }
};