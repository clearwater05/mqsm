const cote = require('cote')({environment: 'mqm'});
const {
    CURRENT_SONG,
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
     * @param {String} currentSong
     */
    publishCurrentSong(currentSong) {
        publisher.publish(CURRENT_SONG, currentSong);
    },

    /**
     *
     * @param status
     */
    publishCurrentStatus(status) {
        publisher.publish(CURRENT_MPD_STATUS, status);
    }
};