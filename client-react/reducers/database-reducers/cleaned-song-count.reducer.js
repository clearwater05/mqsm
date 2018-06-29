import {CLEANED_SONG_COUNT_CLIENT} from '../../front.constants';

const initialState = {
    count: null,
    showMessage: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEANED_SONG_COUNT_CLIENT: {
            return {
                ...state,
                count: action.data,
                showMessage: true
            };
        }
        default:
            return {
                ...state,
                showMessage: false
            };
    }
};