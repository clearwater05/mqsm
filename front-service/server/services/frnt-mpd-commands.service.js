const cote = require('cote')({environment: 'mqm'});
const {REQUEST_SONGS_LIST} = require('../../front.constants');

const mpdRequester = new cote.Requester({
    namespace: 'mpd-service',
    name: 'mqm-frnt-mpd-requester'
});

module.exports = {
    /**
     *
     * @param since
     */
    getSongsList(since = null) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SONGS_LIST,
                value: since
            };

            mpdRequester.send(req, (res) => {
                resolve(res);
            });
        });
    }
};