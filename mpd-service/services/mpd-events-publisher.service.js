const cote = require('cote')({environment: 'mqm'});
const {
    CURRENT_SONG,
    INCREASE_SONG_PLAYCOUNT,
    CURRENT_MPD_STATUS
} = require('../mpd-service.contants');

const publisher = new cote.Publisher(
    {
        name: 'mqm-mpd-events-publisher'
    }
);


module.exports = {
    /**
     *
     * @param {string} currentSong
     */
    async publishCurrentSong(currentSong) {
        await publisher.publish(CURRENT_SONG, currentSong);
    },

    /**
     * @param {string} song
     */
    async updateSongStatistics(song) {
        await publisher.publish(INCREASE_SONG_PLAYCOUNT, song);
    },

    /**
     *
     * @param {playerStatus} status
     */
    async publishCurrentStatus(status) {
        await publisher.publish(CURRENT_MPD_STATUS, status);
    }
};