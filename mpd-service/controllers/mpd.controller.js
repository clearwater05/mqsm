const mpdClientApi = require('../services/mpd-client.service');

const mpdClient = mpdClientApi.getMpdClient();
/**
 *
 */
module.exports = () => {
    /**
     *
     */
    mpdClient.on('ready', async () => {
        console.log('ready');
    });


    /**
     *
     */
    mpdClient.on('system-player', async () => {
        console.log('system-player');
    });


    /**
     *
     */
    mpdClient.on('system-sticker', async () => {
        console.log('system-sticker');
    });

    /**
     *
     */
    mpdClient.on('system-playlist', () => {
        console.lo('system-playlist');
    });
};