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
     * @returns {Promise<any>}
     */
    requestCurrentStatus() {
        return new Promise((resolve, reject) => {
            mpdClient.sendCommand(cmd('status', []), (err, msg) => {
                if (err) {
                    reject(err);
                }
                const status = parseKeyValueMessage(msg);
                mpdState = Object.assign(mpdState, status);

                resolve(status);
            });
        });
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
     * @returns {Promise}
     */
    getCurrentSong() {
        return new Promise((resolve, reject) => {
            try {
                mpdClient.sendCommand(cmd('currentsong', []), (err, msg) => {
                    if (err) {
                        reject(err);
                    }

                    const song = parseKeyValueMessage(msg);
                    resolve(song.file);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
};