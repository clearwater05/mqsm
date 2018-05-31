const cote = require('cote')({environment: 'mqm'});
const path = require('path');

const {
    REQUEST_COVER,
    REQUEST_FILE_METADATA,
    REQUEST_FILES_LIST_METADATA
} = require('../../front.constants');

const fsRequester = new cote.Requester({
    namespace: 'file-service',
    name: 'mqm-frnt-file-requester'
});

module.exports = {
    /**
     *
     * @param {string} song
     * @returns {Promise<any>}
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
     * @param {string} fileName
     * @returns {Promise<any>}
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
    },

    /**
     *
     * @param {Array} list
     * @returns {Promise<Array>}
     */
    getFilesListMetaData(list) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(list) && list.length > 0) {
                const req = {
                    type: REQUEST_FILES_LIST_METADATA,
                    value: list
                };

                fsRequester.send(req, (res) => {
                    resolve(res);
                });
            } else {
                reject();
            }
        });
    }
};