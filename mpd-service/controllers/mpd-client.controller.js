const mpdClientService = require('../services/mpd-client.service');
const eventsPublisher = require('../services/mpd-events-publisher.service');
const mpdState = require('../services/mpd-state.service');
const { MPD_STATUS_PUBLISH_DELAY } = require('../mpd-service.config');

const mpdClient = mpdClientService.getMpdClient();

/**
 *
 */
module.exports = () => {
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
        const song = await mpdClientService.getCurrentSong();
        const status = await mpdClientService.requestCurrentStatus();
        const currentSongStateChanged = mpdClientService.manageCurrentSong(song);

        if (currentSongStateChanged) {
            mpdState.toggleStatisticsLock(false);
            await eventsPublisher.publishCurrentSong(song);
        }

        await eventsPublisher.publishCurrentStatus(status);
    });


    /**
     *
     */
    mpdClient.on('system-sticker', async () => {
        const song = await mpdClientService.getCurrentSong();
        if (song) {
            const rating = await mpdClientService.getSongStickerInfo(song, 'rating');
            eventsPublisher.publishSongStickerRating(song, rating);
        }
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
        if (mpdState.getMpdStatePropValue('state') === 'play') {
            const status = await mpdClientService.requestCurrentStatus();
            await eventsPublisher.publishCurrentStatus(status);
            const durationTwoThird = (status.duration / 3) * 2;
            const elapsed = status.elapsed;
            const isLocked = mpdState.getMpdStatePropValue('statisticLock');

            if (durationTwoThird < elapsed && !isLocked) {
                const song = mpdState.getMpdStatePropValue('currentSong');
                mpdState.toggleStatisticsLock(true);

                if (song) {
                    await eventsPublisher.updateSongStatistics(song);
                }
            }
        }
    }, MPD_STATUS_PUBLISH_DELAY);
};