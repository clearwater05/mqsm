const path = require('path');
const fs = require('fs');
const util = require('util');
const ffmetadata = require('ffmetadata');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

const promisedTimeout = util.promisify(setTimeout);

const {prepareMetaDataTags} = require('../libs/utils');
const {
    BASE_PATH,
    READ_CHUNK_SIZE,
    READ_PAUSE
} = require('../file-service.config');

module.exports = {
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

    /***************************** Cover *******************************/
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

    /********************************** Metadata **************************/
    /**
     *
     * @param {string} rawFileName
     * @returns {Promise<any>}
     */
    getMetadata(rawFileName) {
        return new Promise((resolve, reject) => {
            const file = this.getFullPath(rawFileName);

            ffmetadata.read(file, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                data.filename = rawFileName;
                resolve(prepareMetaDataTags(data));
            });
        });
    },

    /**
     *
     * @param {string} rawFileName
     * @returns {Promise<any>}
     */
    getFileInfo(rawFileName) {
        return new Promise((resolve, reject) => {
            const file = this.getFullPath(rawFileName);
            ffprobe(file, {path: ffprobeStatic.path}, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                delete data.streams[0].disposition;
                resolve(prepareMetaDataTags(data.streams[0]));
            });
        });
    },

    /**
     *
     * @param {string} rawFileName
     * @returns {Promise<any>}
     */
    getFileStat(rawFileName) {
        return new Promise((resolve, reject) => {
            const file = this.getFullPath(rawFileName);
            fs.stat(file, (err, stats) => {
                if (err) {
                    reject(err);
                }
                const mtime = stats.mtimeMs;
                const ctime = stats.ctimeMs;
                const filesize = stats.size;
                const album_path = path.dirname(rawFileName);

                resolve({mtime, ctime, filesize, album_path});
            });
        });
    },

    /**
     *
     * @param {string} rawFileName
     * @return {Promise<any>}
     */
    getSongSavedStatistics(rawFileName) {
        return new Promise((resolve, reject) => {
            const file = this.getFullPath(rawFileName);
            const pathObj = path.parse(file);
            const statFile = path.join(pathObj.dir, `${pathObj.name}.json`);
            fs.readFile(statFile, (err, rawData) => {
                if (err) {
                    reject(err);
                }

                try {
                    resolve(JSON.parse(rawData));
                } catch (e) {
                    reject(e);
                }
            });
        });
    },

    /**
     *
     * @param {Array} list
     * @returns {Promise<any[]>}
     */
    async getFilesListMetadata(list) {
        return await Promise.all(list.map(async (item) => {
            const file = item.file;
            let meta;
            let prob;
            let details;
            let stat;
            try {
                meta = await this.getMetadata(file);
            } catch (e) {
                meta = {
                    filename: file
                };
                //TODO error handling
            }

            try {
                prob = await this.getFileInfo(file);
            } catch (e) {
                prob = {};
            }

            try {
                details = await this.getFileStat(file);
            } catch (e) {
                details = {};
            }
            
            try {
                stat = await this.getSongSavedStatistics(file);
            } catch (e) {
                stat = {lastPlayed: '1970-01-01T00:00:00.000Z', fmps_playcount: 0, fmps_rating: 0};
            }

            return Object.assign({}, meta, prob, details, stat);
        }));
    },

    /**
     *
     * @param {Array} songList
     * @returns {Promise<Array>}
     */
    async proceedFilesQueue(songList) {
        const result = [];
        while (songList.length > 0) {
            const list = songList.splice(0, READ_CHUNK_SIZE);
            const songs = await this.getFilesListMetadata(list);
            result.push(...songs);
            await promisedTimeout(READ_PAUSE);
        }

        return result;
    }
};