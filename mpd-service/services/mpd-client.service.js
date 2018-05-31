const mpd = require('mpd');
// const path = require('path');
// const co = require('co');

const { MPD_ADDRESS, MPD_PORT } = require('../mpd-service.config');

// const scriptName = path.basename(__filename);
const cmd = mpd.cmd;
const parseKeyValueMessage = mpd.parseKeyValueMessage;
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
     */
    getState() {
        return mpdState;
    },

    /**
     *
     * @param {String} currentSong
     * @returns {boolean}
     */
    manageCurrentSongState(currentSong) {
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
     *
     * @returns {Promise<{}|*>}
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
    }
};