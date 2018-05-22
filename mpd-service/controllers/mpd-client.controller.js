const mpdApi = require('../services/mpd-client.service');
const eventsPublisher = require('../services/mpd-events-publisher.service');

const mpdClient = mpdApi.getMpdClient();
/**
 *
 */
module.exports = () => {
    /**
     *
     */
    mpdClient.on('ready', async () => {
        const song = await mpdApi.getCurrentSong();
        const status = await mpdApi.requestCurrentStatus();
        mpdApi.manageCurrentSongState(song);

        eventsPublisher.publishCurrentSong(song);
        eventsPublisher.publishCurrentStatus(status);
    });


    /**
     *
     */
    mpdClient.on('system-player', async () => {
        const song = await mpdApi.getCurrentSong();
        const status = await mpdApi.requestCurrentStatus();

        const currentSongStateChanged = mpdApi.manageCurrentSongState(song);

        if (currentSongStateChanged) {
            eventsPublisher.publishCurrentSong(song);
        }

        eventsPublisher.publishCurrentStatus(status);
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
        console.log('system-playlist');
    });

    /**
     *
     */
    setInterval(async () => {
        if (mpdApi.getState().state === 'play') {
            const status = await mpdApi.requestCurrentStatus();
            eventsPublisher.publishCurrentStatus(status);
        }
    }, 1000);
};