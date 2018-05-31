const cote = require('cote')({environment: 'mqm'});
const {UPDATE_DATABASE} = require('../../front.constants');

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
    }
};