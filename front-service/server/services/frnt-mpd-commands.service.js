const cote = require('cote')({environment: 'mqm'});
const {
    REQUEST_SONGS_LIST,
    REQUEST_CURRENT_SONG
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
    }
};