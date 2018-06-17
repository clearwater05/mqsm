const util = require('util');
const path = require('path');

const dbCommandResponder = require('../services/database-command-responder.service');
const dbEventPublisher = require('../services/database-events-publisher.service');
const songModel = require('../models/song.model');
const logger = require('../services/database-logger.service');

const scriptName = path.basename(__filename);

const promisedTimeout = util.promisify(setTimeout);

const {
    UPDATE_DATABASE,
    INCREASE_SONG_PLAYCOUNT_COMMAND,
    CURRENT_PLAYLIST_COMMAND,
    REQUEST_SONG_INFO,
    CLEANUP_DATABASE_COMMAND,
    UPDATE_SONG_RATING_COMMAND
} = require('../database-service.constants');

module.exports = () => {
    /**
     *
     */
    dbCommandResponder.on(REQUEST_SONG_INFO, async (req, cb) => {
        const song = req.value;
        const songInfo = await songModel.getSongInfo(song);
        if (songInfo) {
            cb(songInfo);
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
            cb(true);
        } catch (e) {
            const errMsg = `dbCommandResponder.on(UPDATE_DATABASE) (${scriptName}): `;
            logger.errorLog(errMsg, e);
            cb(false);
        }
    });

    /**
     *
     */
    dbCommandResponder.on(INCREASE_SONG_PLAYCOUNT_COMMAND, async (req, cb) => {
        const song = req.value;
        const result = await songModel.updateSongStatistic(song);

        cb(result);
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
        await dbEventPublisher.publishCleanedSongCount(result);
        cb(result);
    });

    dbCommandResponder.on(UPDATE_SONG_RATING_COMMAND, async (req, cb) => {
        const result = await songModel.setRating(req.value.song, req.value.rating);
        if (Array.isArray(result) && result[0] === 1) {
            cb(result);
        }
    });
};