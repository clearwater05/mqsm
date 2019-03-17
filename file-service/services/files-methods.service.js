const path = require('path');
const fs = require('fs');
const ls = require('ls');
// const util = require('util');
const ffmetadata = require('ffmetadata');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

const logger = require('./fs-logger.service');
const {prepareMetaDataTags} = require('../libs/utils');

const promisedTimeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
};

const scriptName = path.basename(__filename);

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
                    const errMsg = `readDirectory(${dir}) failed (${scriptName}): `;
                    logger.errorLog(errMsg, err);
                    reject(errMsg, err);
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
            return files.find((file) => {
                return /\.(jpg|jpeg|png)$/i.test(file);
            });
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
                    const errMsg = `readCoverFile(${cover}) failed (${scriptName}): `;
                    logger.errorLog(errMsg, err);
                    reject(errMsg, err);
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
        try {
            const files = await this.readDirectory(dirName);
            const coverName = this.searchForCover(files);
            const cover = await this.readCoverFile({dirName, coverName});
            return cover;
        } catch (e) {
            const errMsg = `getCover(${dirName}) failed (${scriptName}): `;
            logger.errorLog(errMsg, e);
        }
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
                    const errMsg = `getMetadata(${file}) failed (${scriptName}): `;
                    logger.errorLog(errMsg, err);
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
                    const errMsg = `getFileInfo(${file}) failed (${scriptName}): `;
                    logger.errorLog(errMsg, err);
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
                    const errMsg = `getFileStat(${file}) failed (${scriptName}): `;
                    logger.errorLog(errMsg, err);
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
            const statisticsFile = path.join(pathObj.dir, `${pathObj.name}.json`);
            fs.readFile(statisticsFile, (err, rawData) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        reject('ENOENT');
                        return;
                    }
                    const errMsg = `getSongSavedStatistics(${file}) failed (${scriptName}): `;
                    logger.errorLog(errMsg, err);
                    reject(err);
                    return;
                }

                try {
                    resolve(JSON.parse(rawData));
                } catch (e) {
                    const errMsg = `Wrong metadata getSongSavedStatistics(${file}) (${scriptName}): `;
                    logger.errorLog(errMsg, e);
                    reject(e);
                }
            });
        });
    },

    /**
     *
     * @param {Array} list
     * @returns {Promise<Object[]>}
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
                stat = {lastPlayed: '1970-01-01T00:00:00.000Z'};
            }

            return {...meta, ...prob, ...details, ...stat};
        }));
    },

    /**
     *
     * @param {Array} songList
     * @returns {Promise<Array>}
     */
    async proceedFilesQueue(songList) {
        const result = [];
        try {
            while (songList.length > 0) {
                const list = songList.splice(0, READ_CHUNK_SIZE);
                const songs = await this.getFilesListMetadata(list);
                result.push(...songs);
                await promisedTimeout(READ_PAUSE);
            }

            return result;
        } catch (e) {
            logger.errorLog(`Can't proceed with files queue proceedFilesQueue(${songList}) (${scriptName}): `, e);
        }
    },

    /**
     *
     * @param statData
     * @param file
     * @returns {Promise}
     */
    async saveStatisticsToFile(statData, file) {
        return new Promise((resolve, reject) => {
            try {
                const fullPath = this.getFullPath(file);
                const pathObj = path.parse(fullPath);
                const statFile = path.join(pathObj.dir, `${pathObj.name}.json`);
                const statString = JSON.stringify(statData);

                fs.writeFile(statFile, statString, (err) => {
                    if (err) {
                        logger.errorLog(`Can't save statistics file ${statFile} (${scriptName}): `, err);
                        reject(err);
                        return;
                    }

                    resolve();
                });
            } catch (e) {
                logger.errorLog(`Can't save statistics for ${file} (${scriptName}): `, e);
                reject(e);
            }
        });
    },

    /**
     *
     * @param statistics
     * @returns {Promise<boolean>}
     */
    async dumpStatistics(statistics) {
        try {
            if (Array.isArray(statistics)) {
                for (let i = 0, j = statistics.length; i < j; i++) {
                    const {filename, ...st } = statistics[i];

                    await this.saveStatisticsToFile(st, filename);
                    await promisedTimeout(5);
                }
                return statistics.length;
            }
        } catch (e) {
            logger.errorLog(`Can't save statistics (${scriptName}): `, e);
        }
    },

    /************************* Other requests *****************************/
    /**
     *
     * @param search
     * @return {Promise<*>}
     */
    async getDirList(search) {
        return new Promise((resolve) => {
            const dirToRead = path.join(BASE_PATH, `${search}*`);
            const dirs = [];
            for (let file of ls(dirToRead)) {
                if (file.stat.isDirectory()) {
                    dirs.push(file.full.slice(BASE_PATH.length + 1));
                }
            }
            resolve(dirs);
        });
    }
};