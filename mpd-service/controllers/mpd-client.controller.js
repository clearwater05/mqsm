const mpdClientService = require('../services/mpd-client.service');
const eventsPublisher = require('../services/mpd-events-publisher.service');
const mpdState = require('../services/mpd-state.service');
const { MPD_STATUS_PUBLISH_DELAY } = require('../mpd-service.config');

const mpdClient = mpdClientService.getMpdClient();

/**
 *
 */
module.exports = () => {
    const publishCurrentPlaylist = async () => {
        const list = await mpdClientService.getCurrentPlaylist();
        await eventsPublisher.publishCurrentPlaylist(list);
    };

    /**
     *
     */
    const publishSongSkiped = () => {
        const songIsLocked = mpdState.getMpdStatePropValue('statisticLock');
        const previousSong = mpdState.getMpdStatePropValue('previousSong');
        const currentSong = mpdState.getMpdStatePropValue('currentSong');
        const isSkipLock = mpdState.getMpdStatePropValue('skipLock');

        if (!songIsLocked && currentSong !== previousSong && !isSkipLock) {
            eventsPublisher.increaseSongSkipCount(previousSong);
        }
    };

    /**
     *
     */
    mpdClient.on('ready', async () => {
        const song = await mpdClientService.requestCurrentSong();
        const status = await mpdClientService.requestCurrentStatus();

        mpdState.setState('skipLock', true);

        if (song) {
            mpdClientService.manageCurrentSong(song);
            eventsPublisher.publishCurrentSong(song);
        }

        if (status) {
            eventsPublisher.publishCurrentStatus(status);
        }
    });


    /**
     *
     */
    mpdClient.on('system-player', async () => {
        const song = await mpdClientService.requestCurrentSong();
        const status = await mpdClientService.requestCurrentStatus();
        const currentSongStateChanged = mpdClientService.manageCurrentSong(song);

        if (currentSongStateChanged && song) {
            publishSongSkiped();

            mpdState.toggleStatisticsLock(false);
            await eventsPublisher.publishCurrentSong(song);
            mpdState.setState('skipLock', true);
            publishCurrentPlaylist();
        }

        if (status) {
            eventsPublisher.publishCurrentStatus(status);
        }
    });


    /**
     *
     */
    mpdClient.on('system-sticker', async () => {
        const song = await mpdClientService.requestCurrentSong();
        if (song) {
            const rating = await mpdClientService.getSongStickerInfo(song, 'rating');
            if (rating) {
                eventsPublisher.publishSongStickerRating(song, rating);
            }
        }
    });

    /**
     *
     */
    mpdClient.on('system-playlist', async () => {
        await publishCurrentPlaylist();
    });

    /**
     *
     */
    setInterval(async () => {
        if (mpdState.getMpdStatePropValue('state') === 'play') {
            const status = await mpdClientService.requestCurrentStatus();

            if (status) {
                eventsPublisher.publishCurrentStatus(status);
                const durationOneThird = status.duration / 3;
                const durationTwoThird = durationOneThird * 2;
                const elapsed = status.elapsed;
                const isLocked = mpdState.getMpdStatePropValue('statisticLock');

                if (durationOneThird < elapsed) {
                    mpdState.setState('skipLock', false);
                }

                if (durationTwoThird < elapsed && !isLocked) {
                    const song = mpdState.getMpdStatePropValue('currentSong');
                    mpdState.toggleStatisticsLock(true);

                    if (song) {
                        eventsPublisher.updateSongStatistics(song);
                    }
                }
            }
        }
    }, MPD_STATUS_PUBLISH_DELAY);
};