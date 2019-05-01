const cote = require('cote')({environment: 'mqm'});
const {
    REQUEST_SONGS_LIST,
    REQUEST_CURRENT_SONG,
    REQUEST_MPD_STATUS,
    MPD_PLAYER_COMMAND,
    REQUEST_CURRENT_PLAYLIST
} = require('../../front.constants');

const mpdRequester = new cote.Requester({
    namespace: 'mpd-service',
    name: 'mqm-frnt-mpd-requester'
});

module.exports = {
    /**
     * @typedef {Object} mpdFilter
     * @property name
     * @property value
     *
     * @param {mpdFilter} filter
     * @return {Promise<string[]>}
     */
    getSongsList(filter = null) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SONGS_LIST,
                value: filter
            };

            mpdRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @return {Promise<any>}
     */
    requestCurrentSong() {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_CURRENT_SONG
            };

            mpdRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @return {Promise<any>}
     */
    requestMPDStatus() {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_MPD_STATUS
            };

            mpdRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @return {Promise<any>}
     */
    requestCurrentPlaylist() {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_CURRENT_PLAYLIST
            };

            mpdRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @param {string} command
     * @return {Promise<any>}
     */
    sendMPDCommand(command) {
        return new Promise((resolve) => {
            const req = {
                type: MPD_PLAYER_COMMAND,
                value: command
            };

            mpdRequester.send(req, (res) => {
                resolve(res);
            });
        });
    }
};