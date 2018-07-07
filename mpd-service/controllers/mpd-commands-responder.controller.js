const responder = require('../services/mpd-command-responder.service');
const mpdClientService = require('../services/mpd-client.service');
const eventsPublisher = require('../services/mpd-events-publisher.service');

const {
    REQUEST_SONGS_LIST,
    REQUEST_CURRENT_SONG,
    REQUEST_MPD_STATUS,
    REQUEST_STOP,
    REQUEST_PLAY,
    REQUEST_PAUSE,
    REQUEST_NEXT,
    REQUEST_PREVIOUS,
    MPD_PLAYER_COMMAND,
    REQUEST_CURRENT_PLAYLIST
} = require('../mpd-service.contants');

module.exports = () => {
    /**
     *
     */
    responder.on(REQUEST_SONGS_LIST, async (req, cb) => {
        const filter = req.value;
        const list = await mpdClientService.getSongList(filter);

        cb(list);
    });

    /**
     *
     */
    responder.on(REQUEST_CURRENT_SONG, async (req, cb) => {
        const song = await mpdClientService.getCurrentSong();
        if (song) {
            await eventsPublisher.publishCurrentSong(song);
            cb(true);
            return;
        }
        cb(false);
    });

    /**
     *
     */
    responder.on(REQUEST_CURRENT_PLAYLIST, async (req, cb) => {
        const playList = await mpdClientService.getCurrentPlaylist();
        if (Array.isArray(playList)) {
            await eventsPublisher.publishCurrentPlaylist(playList);
            cb(true);
            return;
        }
        cb(false);
    });

    /**
     *
     */
    responder.on(REQUEST_MPD_STATUS, async (req, cb) => {
        const status = await mpdClientService.requestCurrentStatus();
        if (status) {
            // eventsPublisher.publishCurrentStatus(status);
            cb(status);
            return;
        }
        cb(false);
    });

    /**
     *
     */
    responder.on(MPD_PLAYER_COMMAND, async (req, cb) => {
        switch (req.value) {
            case REQUEST_STOP:
                mpdClientService.sendPlayerCommand('stop');
                cb(true);
                return;
            case REQUEST_PLAY:
                mpdClientService.sendPlayerCommand('play');
                cb(true);
                return;
            case REQUEST_NEXT:
                mpdClientService.sendPlayerCommand('next');
                cb(true);
                return;
            case REQUEST_PREVIOUS:
                mpdClientService.sendPlayerCommand('previous');
                cb(true);
                return;
            case REQUEST_PAUSE:
                mpdClientService.sendPlayerCommand('pause');
                cb(true);
                return;
        }
    });
};