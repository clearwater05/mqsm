const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntDatabaseCommandsService = require('../services/frnt-database-commands.service');
const frntMpdCommandService = require('../services/frnt-mpd-commands.service');
const subscriber = require('../services/frnt-events-subscriber.service');

/**
 *
 * @param {Object[]} arr
 * @return {Object}
 */
function songsArrayToSongsObject(arr) {
    return arr.reduce((obj, song) => {
        obj[song.filename] = {...song};
        return obj;
    }, {});
}

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
} = require('../../front.constants');



module.exports = (io) => {
    let cachedRawPlaylist = [];
    let cachedFullPlaylist = {};

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
            const songInfo = await frntDatabaseCommandsService.getSong(song);
            const cover = await frntFileCommandService.getCoverForAlbum(song);

            songInfo.cover = cover;
            await io.emit('action', {type: CURRENT_SONG_INFO_CLIENT, data: {...songInfo}});
        } catch (e) {
            console.log(e);
        }
    });

    /**
     *
     */
    subscriber.on(INCREASE_SONG_PLAYCOUNT, async (song) => {
        const result = await frntDatabaseCommandsService.updateSongStatistics(song);
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
        const b = new Set(cachedRawPlaylist);
        const difference = playlist.filter(x => !b.has(x));

        const list = await frntDatabaseCommandsService.getPlaylist(difference);

        for (let i = 0, j = list.length; i < j; i++) {
            list[i].cover = await frntFileCommandService.getCoverForAlbum(list[i].filename);
        }

        const cachedList = songsArrayToSongsObject(list);

        const result = playlist.map((item) => {
            const obj = cachedList[item] || cachedFullPlaylist[item];
            return {...obj};
        });

        cachedRawPlaylist = playlist.slice(0);
        cachedFullPlaylist = songsArrayToSongsObject(result);
        await io.emit('action', {type: CURRENT_PLAYLIST_CLIENT, data: result});
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
};