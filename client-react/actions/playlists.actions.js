import {REQUEST_SAVED_PLAYLISTS} from '../front.constants';

/**
 *
 * @return {{type: string}}
 */
export function requestSavedPlaylist() {
    return {
        type: REQUEST_SAVED_PLAYLISTS
    };
}
