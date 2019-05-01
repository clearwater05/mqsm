import {
    REQUEST_SAVED_PLAYLISTS,
    REQUEST_SAVED_PLAYLIST_PREVIEW,
    REQUEST_SONG_ATTRIBUTES_LIST
} from '../front.constants';

/**
 *
 * @return {{type: string}}
 */
export function requestSavedPlaylist() {
    return {
        type: REQUEST_SAVED_PLAYLISTS
    };
}

/**
 *
 * @param playlist
 * @return {{type: string, value: *}}
 */
export function requestPreviewSavedPlaylist(playlist) {
    return {
        type: REQUEST_SAVED_PLAYLIST_PREVIEW,
        value: playlist
    };
}

/**
 *
 * @returns {{type: string}}
 */
export function requestSongModelAttributesList() {
    return {
        type: REQUEST_SONG_ATTRIBUTES_LIST
    };
}