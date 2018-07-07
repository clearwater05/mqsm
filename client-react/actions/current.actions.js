import {
    REQUEST_CURRENT_PLAYLIST,
    REQUEST_CURRENT_SONG,
    REQUEST_MPD_STATUS
} from '../front.constants';

/**
 *
 * @param {string} command
 * @return {{type: <string>}}
 */
export function sendMPDPlayerCommand(command) {
    return {
        type: command
    };
}

/**
 *
 * @return {{type: string}}
 */
export function requestCurrentSong() {
    return {
        type: REQUEST_CURRENT_SONG
    };
}

/**
 *
 * @return {{type: string}}
 */
export function requestMPDStatus() {
    return {
        type: REQUEST_MPD_STATUS
    };
}

/**
 *
 * @return {{type: string}}
 */
export function requestCurrentPlaylist() {
    return {
        type: REQUEST_CURRENT_PLAYLIST
    };
}