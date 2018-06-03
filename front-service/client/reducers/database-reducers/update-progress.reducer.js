import {UPDATE_DATABASE_PROGRESS_CLIENT} from '../../../front.constants';

const initialState = {
    dbUpdateProgress: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DATABASE_PROGRESS_CLIENT:
            return {
                ...state,
                dbUpdateProgress: action.data
            };
        default:
            return state;
    }
};