/**
 * @typedef {Object} mpdState
 * @property {string} currentSong
 * @property {string} previousSong
 * @property {Array} currentPlaylist
 * @property {boolean} statisticLock
 * @type {mpdState}
 */

let mpdState = {};


module.exports = {
    /**
     *
     * @return {mpdState}
     */
    getState() {
        return mpdState;
    },

    /**
     *
     * @param {string} propName
     * @return {*}
     */
    getMpdStatePropValue(propName) {
        return mpdState[propName];
    },

    /**
     *
     * @param prop
     * @param value
     */
    setState(prop, value) {
        mpdState[prop] = value;
    },

    /**
     *
     * @param {boolean} state
     */
    toggleStatisticsLock(state) {
        this.setState('statisticLock', state);
    },

    /**
     *
     * @param {playerStatus} status
     */
    addStatus(status) {
        mpdState = {...mpdState, ...status};
    }
};