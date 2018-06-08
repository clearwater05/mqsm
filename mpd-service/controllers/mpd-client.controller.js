const mpdClientService = require('../services/mpd-client.service');
const eventsPublisher = require('../services/mpd-events-publisher.service');
const { MPD_STATUS_PUBLISH_DELAY } = require('../mpd-service.config');

const mpdClient = mpdClientService.getMpdClient();
/**
 *
 */
module.exports = () => {
    let systemPlayerEvent = false;

    /**
     *
     * @param {boolean} state
     */
    function setPlayerEventState(state) {
        systemPlayerEvent = state;
    }


    /**
     *
     */
    mpdClient.on('ready', async () => {
        const song = await mpdClientService.getCurrentSong();
        const status = await mpdClientService.requestCurrentStatus();
        mpdClientService.manageCurrentSong(song);

        eventsPublisher.publishCurrentSong(song);
        eventsPublisher.publishCurrentStatus(status);
    });


    /**
     *
     */
    mpdClient.on('system-player', async () => {
        setPlayerEventState(true);
        const song = await mpdClientService.getCurrentSong();
        const status = await mpdClientService.requestCurrentStatus();

        const currentSongStateChanged = mpdClientService.manageCurrentSong(song);

        if (currentSongStateChanged && status.state === 'play') {
            const previousSong = mpdClientService.getPreviousSong();
            if (previousSong) {
                await eventsPublisher.updateSongStatistics(previousSong);
            }
            await eventsPublisher.publishCurrentSong(song);
        }

        await eventsPublisher.publishCurrentStatus(status);
        setPlayerEventState(false);
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
    mpdClient.on('system-playlist', async () => {
        const list = await mpdClientService.getCurrentPlaylist();
        await eventsPublisher.publishCurrentPlaylist(list);
    });

    /**
     *
     */
    setInterval(async () => {
        if (mpdClientService.getState().state === 'play' && !systemPlayerEvent) {
            const status = await mpdClientService.requestCurrentStatus();
            await eventsPublisher.publishCurrentStatus(status);
        }
    }, MPD_STATUS_PUBLISH_DELAY);
};