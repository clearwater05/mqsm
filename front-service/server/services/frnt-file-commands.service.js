const cote = require('cote')({environment: 'mqm'});

const {
    REQUEST_COVER,
    REQUEST_FILE_METADATA,
    REQUEST_FILES_LIST_METADATA,
    REQUEST_DIR_LIST,
    DUMP_STATISTICS_TO_FILES
} = require('../../front.constants');

const fsRequester = new cote.Requester({
    namespace: 'file-service',
    name: 'mqm-frnt-file-requester'
});

module.exports = {
    /**
     *
     * @param {string} albumPath
     * @returns {Promise<any>}
     */
    getCoverForAlbum(albumPath) {
        return new Promise((resolve, reject) => {
            if (albumPath) {
                const req = {
                    type: REQUEST_COVER,
                    value: albumPath
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
    },

    /**
     *
     * @param baseDir
     */
    requestDirList(baseDir) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_DIR_LIST,
                value: baseDir
            };

            fsRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @param {Array} statistics
     * @returns {Promise<any>}
     */
    dumpStatistics(statistics) {
        return new Promise(resolve => {
            const req = {
                type: DUMP_STATISTICS_TO_FILES,
                value: statistics
            };

            fsRequester.send(req, res => {
                resolve(res);
            });
        });
    }
};