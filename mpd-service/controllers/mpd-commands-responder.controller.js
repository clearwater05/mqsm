const responder = require('../services/mpd-command-responder.service');
const mpdClientService = require('../services/mpd-client.service');

const {REQUEST_SONGS_LIST} = require('../mpd-service.contants');

module.exports = () => {
    /**
     *
     */
    responder.on(REQUEST_SONGS_LIST, async (req, cb) => {
        const filter = req.value;
        const list = await mpdClientService.getSongList(filter);

        cb(list);
    });
};