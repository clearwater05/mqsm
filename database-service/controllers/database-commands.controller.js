const util = require('util');

const dbCommandResponder = require('../services/database-command-responder.service');
const dbEventPublisher = require('../services/database-events-publisher.service');
const songModel = require('../models/song.model');

const promisedTimeout = util.promisify(setTimeout);

const {
    UPDATE_DATABASE,
    INCREASE_SONG_PLAYCOUNT_COMMAND,
    CURRENT_PLAYLIST_COMMAND,
    REQUEST_SONG_INFO,
    CLEANUP_DATABASE_COMMAND
} = require('../database-service.constants');

module.exports = () => {
    /**
     *
     */
    dbCommandResponder.on(REQUEST_SONG_INFO, async (req, cb) => {
        try {
            const song = req.value;
            const songInfo = await songModel.getSongInfo(song)
            cb(songInfo.toJSON());
        } catch (e) {
            console.log(e);
            cb({});
        }
    });

    /**
     *
     */
    dbCommandResponder.on(UPDATE_DATABASE, async (req, cb) => {
        try {
            const list = req.value;
            if (Array.isArray(list)) {
                await dbEventPublisher.publishProgress('start', list.length);

                for (let i = 0, j = list.length; i < j; i++) {
                    await songModel.songUpsert(list[i]);
                    await dbEventPublisher.publishProgress('ongoing', j, i);
                    await promisedTimeout(5);
                }

                await dbEventPublisher.publishProgress('finish', list.length);
            }
        } catch (e) {
            console.log(e);
            //TODO error handler
        }
        cb(true);
    });

    /**
     *
     */
    dbCommandResponder.on(INCREASE_SONG_PLAYCOUNT_COMMAND, async (req, cb) => {
        const song = req.value;
        const result = await songModel.updateSongStatistic(song);

        cb(true);
    });

    /**
     *
     */
    dbCommandResponder.on(CURRENT_PLAYLIST_COMMAND, async (req, cb) => {
        const list = await songModel.getPlaylist(req.value);
        cb(list);
    });

    /**
     *
     */
    dbCommandResponder.on(CLEANUP_DATABASE_COMMAND, async (req, cb) => {
        const result = await songModel.cleanUpSongTable(req.value);
        cb(result);
    });
};