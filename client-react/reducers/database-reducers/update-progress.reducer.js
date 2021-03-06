import {UPDATE_DATABASE_PROGRESS_CLIENT} from '../../front.constants';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DATABASE_PROGRESS_CLIENT:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};