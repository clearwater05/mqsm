import { CURRENT_MPD_STATUS_CLIENT } from '../../../front.constants';

const initialState = {
    mpdState: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_MPD_STATUS_CLIENT:
            return {
                ...state,
                mpdState: action.data
            };
        default:
            return state;
    }
};