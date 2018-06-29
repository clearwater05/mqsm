import { DIR_LIST_CLIENT } from '../../front.constants';

const initialState = {
    readDir: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DIR_LIST_CLIENT:
            return {
                ...state,
                readDir: [...action.data]
            };
        default:
            return state;
    }
};