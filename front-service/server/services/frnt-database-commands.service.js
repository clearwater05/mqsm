const cote = require('cote')({environment: 'mqm'});
const {
    UPDATE_DATABASE,
    INCREASE_SONG_PLAYCOUNT_COMMAND
} = require('../../front.constants');

const dbRequester = new cote.Requester({
    namespace: 'database-service',
    name: 'mqm-frnt-db-requester'
});

module.exports = {
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
    }
};