const mpd = require('mpd');

const { MPD_ADDRESS, MPD_PORT } = require('../mpd-service.config');

const cmd = mpd.cmd;
const parseKeyValueMessage = mpd.parseKeyValueMessage;
const {parseSimplePlaylist} = require('../libs/utils');

/**
 * @typedef {Object} mpdState
 * @property {string} currentSong
 * @property {string} previousSong
 * @property {Array} currentPlaylist
 * @type {mpdState}
 */
let mpdState = {};


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
     * @return {mpdState}
     */
    getState() {
        return mpdState;
    },

    /**
     *
     * @param {string} currentSong
     * @returns {boolean}
     */
    manageCurrentSong(currentSong) {
        let changed = false;
        if (mpdState.currentSong !== currentSong) {
            mpdState.previousSong = mpdState.currentSong;
            changed = true;
        }

        mpdState.currentSong = currentSong;
        return changed;
    },

    /**
     *
     * @return {string|*|string}
     */
    getPreviousSong() {
        return mpdState.previousSong || '';
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
            mpdState = Object.assign(mpdState, status);

            return status;
        } catch (e) {
            // console.log(e); //TODO error handling
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
            // console.log(e); //TODO error handling
        }
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
            // console.log(e); //TODO error handling
        }
    },

    /**
     *
     * @return {Promise<Array|*>}
     */
    async getCurrentPlaylist() {
        const command = cmd('playlist', []);
        const rawPlaylist = await this.mpdClientSendCommand(command);
        return parseSimplePlaylist(rawPlaylist);
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
                return null;
            } else {
                throw new Error('get sticker problem');
            }
        }

    }
};