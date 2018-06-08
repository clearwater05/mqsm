const cote = require('cote')({environment: 'mqm'});
const {
    UPDATE_DATABASE,
    INCREASE_SONG_PLAYCOUNT_COMMAND,
    CURRENT_PLAYLIST_COMMAND,
    REQUEST_SONG_INFO
} = require('../../front.constants');

const dbRequester = new cote.Requester({
    namespace: 'database-service',
    name: 'mqm-frnt-db-requester'
});

module.exports = {
    /**
     *
     * @param {string} song
     * @return {Promise<Song>}
     */
    getSong(song) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SONG_INFO,
                value: song
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },
    /**
     *
     * @param {Array} songList
     * @returns {Promise<void>}
     */
    updateDatabase(songList) {
        return new Promise((resolve) => {
            const req = {
                type: UPDATE_DATABASE,
                value: songList
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     * @param {string} song
     */
    updateSongStatistics(song) {
        return new Promise((resolve) => {
            const req = {
                type: INCREASE_SONG_PLAYCOUNT_COMMAND,
                value: song
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     *
     * @param {string[]} playlist
     * @return {Promise<Object[]>}
     */
    getPlaylist(playlist) {
        return new Promise((resolve) => {
            if (playlist.length > 0) {
                const req = {
                    type: CURRENT_PLAYLIST_COMMAND,
                    value: playlist.slice()
                };

                dbRequester.send(req, (resultList) => {
                    resolve(resultList);
                });
            } else {
                resolve([]);
            }
        });
    }
};