const cote = require('cote')({environment: 'mqm'});
const path = require('path');

const {REQUEST_COVER, REQUEST_FILE_METADATA} = require('../../front.constants');

const fsRequester = new cote.Requester({
    namespace: 'file-service',
    name: 'mqm-frnt-file-requester'
});

module.exports = {
    /**
     *
     * @param {String} song
     */
    getCoverForAlbum(song) {
        return new Promise((resolve, reject) => {
            if (song) {
                const req = {
                    type: REQUEST_COVER,
                    value: path.dirname(song)
                };

                fsRequester.send(req, (res) => {
                    resolve(res);
                });
            } else {
                reject();
            }
        });
    },

    /**
     *
     * @param {String} fileName
     */
    getFileMetaData(fileName) {
        return new Promise((resolve, reject) => {
            if (fileName) {
                const req = {
                    type: REQUEST_FILE_METADATA,
                    value: fileName
                };

                fsRequester.send(req, (res) => {
                    resolve(res);
                });
            } else {
                reject({});
            }
        });
    }
};