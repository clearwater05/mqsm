const path = require('path');
const fs = require('fs');
const ffmetadata = require('ffmetadata');

const {keysToLowerCase} = require('../libs/utils');
const {BASE_PATH} = require('../file-service.config');

module.exports = {
    /**
     *
     * @param dir
     * @returns {Promise<Array>}
     */
    readDirectory(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    },

    /**
     *
     * @param {Array} files
     * @returns {string}
     */
    searchForCover(files) {
        if (Array.isArray(files)) {
            const cover = files.find((file) => {
                return /\.(jpg|jpeg|png)$/i.test(file);
            });
            return cover;
        }
    },

    /**
     *
     * @param dirName
     * @param coverName
     * @returns {Promise<any>}
     */
    readCoverFile({dirName, coverName}) {
        return new Promise((resolve, reject) => {
            const cover = coverName || 'no-cover.jpg';
            const dir = coverName ? dirName : __dirname;
            const ext = path.extname(cover).substr(1);

            fs.readFile(`${dir}/${cover}`, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(`data:image/${ext};base64,${data.toString('base64')}`);
            });
        });
    },

    /**
     *
     * @param {string} dirName
     */
    async getCover(dirName) {
        const files = await this.readDirectory(dirName);
        const coverName = this.searchForCover(files);
        const cover = await this.readCoverFile({dirName, coverName});

        return cover;
    },

    /**
     *
     * @param fsName
     * @returns {string}
     */
    getFullPath(fsName) {
        return path.join(BASE_PATH, fsName);
    },

    /**
     *
     * @param {string} file
     * @returns {Promise<any>}
     */
    getMetadata(file) {
        return new Promise((resolve, reject) => {
            ffmetadata.read(file, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(keysToLowerCase(data));
            });
        });
    }
};