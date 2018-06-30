const mpd = require('mpd');
const path = require('path');

const {parseSimplePlaylist} = require('../libs/utils');
const mpdState = require('./mpd-state.service');
const logger = require('./mpd-logger.service');

const cmd = mpd.cmd;
const parseKeyValueMessage = mpd.parseKeyValueMessage;
const scriptName = path.basename(__filename);

/**
 * @typedef {Object} mpdState
 * @property {string} currentSong
 * @property {string} previousSong
 * @property {Array} currentPlaylist
 * @property {boolean} statisticLock
 * @type {mpdState}
 */

const {
    MPD_ADDRESS,
    MPD_PORT
} = require('../mpd-service.config');

const mpdClient = mpd.connect({
    port: MPD_PORT,
    host: MPD_ADDRESS
});

module.exports = {
    /**
     *
     */
    getMpdClient() {
        return mpdClient;
    },

    /**
     *
     * @param {string} currentSong
     * @returns {boolean}
     */
    manageCurrentSong(currentSong) {
        const cachedCurrentSong = mpdState.getMpdStatePropValue('currentSong');
        let changed = false;
        if (cachedCurrentSong !== currentSong && currentSong) {
            mpdState.setState('previousSong', cachedCurrentSong);
            changed = true;
        }

        if (currentSong) {
            mpdState.setState('currentSong', currentSong);
        }

        return changed;
    },

    /**
     *
     * @return {string|*|string}
     */
    getPreviousSong() {
        return mpdState.getMpdStatePropValue('previousSong') || '';
    },

    /**
     *
     * @param command
     * @returns {Promise<any>}
     */
    mpdClientSendCommand(command) {
        return new Promise((resolve, reject) => {
            mpdClient.sendCommand((command), (err, msg) => {
                if (err) {
                    const errMsg = `mpdClientSendCommand(${command}) failed (72: ${scriptName}): `;
                    logger.errorLog(errMsg, err);
                    reject(err);
                }
                resolve(msg);
            });
        });
    },

    /**
     * @typedef {Object} playerStatus
     * @property volume
     * @property repeat
     * @property random
     * @property single
     * @property consume
     * @property playlist
     * @property playlistlength
     * @property mixrampdb
     * @property state
     * @property song
     * @property songid
     * @property time
     * @property elapsed
     * @property bitrate
     * @property duration
     * @property audio
     * @property nextsong
     * @property nextsongid
     * @returns {Promise<playerStatus>}
     */
    async requestCurrentStatus() {
        const command = cmd('status', []);

        try {
            const rawStatus = await this.mpdClientSendCommand(command);
            const status = parseKeyValueMessage(rawStatus);
            mpdState.addStatus(status);

            return status;
        } catch (e) {
            const errMsg = `requestCurrentStatus() failed (107: ${scriptName}): `;
            logger.errorLog(errMsg, e);
            return null;
        }
    },

    /**
     *
     * @returns {Promise<string>}
     */
    async getCurrentSong() {
        const command = cmd('currentsong', []);
        try {
            const rawSong = await this.mpdClientSendCommand(command);
            const song = parseKeyValueMessage(rawSong);
            return song.file;
        } catch (e) {
            const errMsg = `getCurrentSong() failed (127: ${scriptName}): `;
            logger.errorLog(errMsg, e);
            return null;
        }
    },

    /**
     *
     * @return {string}
     */
    getCachedCurrentSong() {
        return mpdState.getMpdStatePropValue('currentSong');
    },

    /**
     *
     * @param filter
     * @returns {Promise<Array>}
     */
    async getSongList(filter) {
        const cmdParams = ['file'];

        if (filter) {
            cmdParams.push(filter.name, filter.value);
        }

        cmdParams.push('group', 'album');
        const command = cmd('list', cmdParams);

        try {
            const rawList = await this.mpdClientSendCommand(command);
            let list = mpd.parseArrayMessage(rawList);

            if (list.length === 1 && Object.keys(list[0]).length < 1) {
                list = [];
            }
            return list;
        } catch (e) {
            const errMsg = `getSongList(${filter}) failed (153: ${scriptName}): `;
            logger.errorLog(errMsg, e);
            return [];
        }
    },

    /**
     *
     * @return {Promise<Array|*>}
     */
    async getCurrentPlaylist() {
        const command = cmd('playlist', []);
        try {
            const rawPlaylist = await this.mpdClientSendCommand(command);

            return parseSimplePlaylist(rawPlaylist);
        } catch (e) {
            const errMsg = `getCurrentPlaylist() failed (182: ${scriptName}): `;
            logger.errorLog(errMsg, e);
            return [];
        }
    },

    /**
     *
     * @param {string} song
     * @param {string} stickerName
     * @return {Promise<number>}
     */
    async getSongStickerInfo(song, stickerName) {
        const stickerCmd = cmd('sticker', ['get', 'song', song, stickerName]);
        try {
            const rawSticker = await this.mpdClientSendCommand(stickerCmd);
            const sticker = parseKeyValueMessage(rawSticker);

            return (sticker.sticker.split('=')[1]);
        } catch (e) {
            if (e.toString().indexOf('no such sticker') !== -1) {
                const msg = `No such sticker getSongStickerInfo(${song}, ${stickerName}) - (200: ${scriptName}): `;
                logger.eventLog(msg, {song, stickerName});
                return null;
            } else {
                const errMsg = `getSongStickerInfo(${song}, ${stickerName}) failed (200: ${scriptName}): `;
                logger.errorLog(errMsg, e);
                return null;
            }
        }

    },

    /**
     *
     * @param {string} playerCommand
     * @return {Promise<void>}
     */
    async sendPlayerCommand(playerCommand) {
        const command = cmd(playerCommand, []);
        try {
            await this.mpdClientSendCommand(command);
        } catch (e) {
            const errMsg = `sendPlayerCommand(${command}) failed (222: ${scriptName}): `;
            logger.errorLog(errMsg, e);
        }
    }
};