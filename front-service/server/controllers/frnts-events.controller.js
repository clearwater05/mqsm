const path = require('path');
const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntDatabaseCommandsService = require('../services/frnt-database-commands.service');
const frntMpdCommandService = require('../services/frnt-mpd-commands.service');
const subscriber = require('../services/frnt-events-subscriber.service');
const logger = require('../services/frnt-logger.service');

const {
    CURRENT_MPD_STATUS,
    CURRENT_SONG,
    UPDATE_DATABASE_PROGRESS,
    INCREASE_SONG_PLAYCOUNT,
    UPDATE_DATABASE_PROGRESS_CLIENT,
    CURRENT_MPD_STATUS_CLIENT,
    CURRENT_PLAYLIST,
    CURRENT_PLAYLIST_CLIENT,
    CURRENT_SONG_INFO_CLIENT,
    CLEANED_SONG_COUNT,
    CLEANED_SONG_COUNT_CLIENT,
    CURRENT_SONG_RATING_STICKER_VALUE,
    SYSTEM_ERROR_CLIENT,
    SYSTEM_MESSAGE_CLIENT,
    SYSTEM_EVENT,
    SYSTEM_ERROR
} = require('../../front.constants');

const {
    groupPlaylistByAlbum,
    songsArrayToSongsObject
} = require('../libs/frnt-utils');

module.exports = (io) => {
    /**
     *
     * @param list
     * @return {Promise<Array|*>}
     */
    const createFullSongList = async (list) => {
        const dbInfo = await frntDatabaseCommandsService.getPlaylist(list);
        const cachedList = songsArrayToSongsObject(dbInfo);

        const result = list.map((item) => {
            const obj = cachedList[item];
            return {...obj};
        });

        const groupedList = groupPlaylistByAlbum(result);

        for (let i = 0, j = groupedList.length; i < j; i++) {
            groupedList[i].cover = await frntFileCommandService.getCoverForAlbum(groupedList[i].album_path);
        }

        return groupedList;
    };

    /**
     *
     */
    subscriber.on(CURRENT_MPD_STATUS, (status) => {
        io.emit('action', {type: CURRENT_MPD_STATUS_CLIENT, data: {...status}});
    });

    /**
     *
     */
    subscriber.on(CURRENT_SONG, async (song) => {
        try {
            const songInfo = await frntDatabaseCommandsService.getSong(song);
            const cover = await frntFileCommandService.getCoverForAlbum(path.dirname(song));

            songInfo.cover = cover;
            await io.emit('action', {type: CURRENT_SONG_INFO_CLIENT, data: {...songInfo}});
        } catch (e) {
            // console.log(e);
            // logger.errorLog('');
        }
    });

    /**
     *
     */
    subscriber.on(INCREASE_SONG_PLAYCOUNT, async (song) => {
        const result = await frntDatabaseCommandsService.updateSongStatistics(song);
        if (result) {
            await frntMpdCommandService.requestCurrentSong();
        }
    });

    /**
     *
     */
    subscriber.on(UPDATE_DATABASE_PROGRESS, async (progress) => {
        await io.emit('action', {type: UPDATE_DATABASE_PROGRESS_CLIENT, data: progress});
    });

    /**
     *
     */
    subscriber.on(CURRENT_PLAYLIST, async (playlist) => {
        const groupedList = await createFullSongList(playlist);

        await io.emit('action', {type: CURRENT_PLAYLIST_CLIENT, data: groupedList});
    });

    /**
     *
     */
    subscriber.on(CLEANED_SONG_COUNT, async (count) => {
        await io.emit('action', {type: CLEANED_SONG_COUNT_CLIENT, data: count});
    });

    /**
     *
     */
    subscriber.on(CURRENT_SONG_RATING_STICKER_VALUE, async (value) => {
        const result = await frntDatabaseCommandsService.updateSongRating(value.song, value.rating);
        if (Array.isArray(result) && result[0] === 1) {
            await frntMpdCommandService.requestCurrentSong();
        }
    });

    /**
     *
     */
    subscriber.on(SYSTEM_ERROR, async (value) => {
        logger.errorLog(value.message, value.error, value.when);
        await io.emit('action', {type: SYSTEM_ERROR_CLIENT, data: value});
    });

    /**
     *
     */
    subscriber.on(SYSTEM_EVENT, async (value) => {
        logger.eventLog(value.message, value.event, value.when);
        await io.emit('action', {type: SYSTEM_MESSAGE_CLIENT, data: value});
    });
};