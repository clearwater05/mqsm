const responder = require('../services/mpd-command-responder.service');
const mpdClientService = require('../services/mpd-client.service');
const eventsPublisher = require('../services/mpd-events-publisher.service');

const {
    REQUEST_SONGS_LIST,
    REQUEST_CURRENT_SONG
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
        await eventsPublisher.publishCurrentSong(song);
        cb('current song');
    });
};