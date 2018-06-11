const cote = require('cote')({environment: 'mqm'});
const {
    CURRENT_SONG,
    INCREASE_SONG_PLAYCOUNT,
    CURRENT_MPD_STATUS,
    CURRENT_PLAYLIST,
    CURRENT_SONG_RATING_STICKER_VALUE
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
    },

    /**
     *
     * @param {string[]} playlist
     * @return {Promise<void>}
     */
    async publishCurrentPlaylist(playlist) {
        await publisher.publish(CURRENT_PLAYLIST, playlist);
    },

    /**
     *
     * @param {string} song
     * @param {number} rating
     * @return {Promise<void>}
     */
    async publishSongStickerRating(song, rating) {
        await publisher.publish(CURRENT_SONG_RATING_STICKER_VALUE, {
            song,
            rating
        });
    }
};