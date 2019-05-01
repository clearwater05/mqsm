import {fromJS} from 'immutable';

import {SONG_DETAILS_CLIENT} from '../../front.constants';

export default (state = {}, action) => {
    switch (action.type) {
        case SONG_DETAILS_CLIENT: {
            const data = fromJS(action.data);
            return data.toJS();
        }
        default:
            return {
                ...state
            };
    }
};