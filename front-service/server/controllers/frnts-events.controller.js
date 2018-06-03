const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntDatabaseCommandsService = require('../services/frnt-database-commands.service');
const subscriber = require('../services/frnt-events-subscriber.service');

const {
    CURRENT_MPD_STATUS,
    CURRENT_SONG,
    UPDATE_DATABASE_PROGRESS,
    INCREASE_SONG_PLAYCOUNT,
    UPDATE_DATABASE_PROGRESS_CLIENT,
    CURRENT_MPD_STATUS_CLIENT
} = require('../../front.constants');



module.exports = (io) => {
    /**
     *
     */
    subscriber.on(CURRENT_MPD_STATUS, (status) => {
        io.emit('action', {type: CURRENT_MPD_STATUS_CLIENT, data: status});
    });

    /**
     *
     */
    subscriber.on(CURRENT_SONG, async (song) => {
        try {
            // const cover = await frntFileCommandService.getCoverForAlbum(song);
            // const metaData = await frntFileCommandService.getFileMetaData(song); //TODO temporary change to database request

            // console.log(metaData);
        } catch (e) {
            console.log(e);
        }
    });

    /**
     *
     */
    subscriber.on(INCREASE_SONG_PLAYCOUNT, async (song) => {
        const result = await frntDatabaseCommandsService.updateSongStatistics(song);
        console.log(result);
    });

    /**
     *
     */
    subscriber.on(UPDATE_DATABASE_PROGRESS, async (progress) => {
        await io.emit('action', {type: UPDATE_DATABASE_PROGRESS_CLIENT, data: progress});
    });
};