const frntCommandsController = require('../controllers/frnt-commands.controller');
const frntPublisher = require('../services/frnt-service-publisher.service');
const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntMpdService = require('../services/frnt-mpd-commands.service');
const frntDatabaseService = require('../services/frnt-database-commands.service');

const {
    UPDATE_DATABASE,
    UPDATE_DATABASE_SINCE,
    UPDATE_DATABASE_DIR_NAME,
    CLEANUP_DATABASE,
    REQUEST_DIR_LIST,
    DIR_LIST_CLIENT,
    REQUEST_CURRENT_SONG,
    REQUEST_MPD_STATUS,
    CURRENT_MPD_STATUS_CLIENT,
    REQUEST_STOP,
    REQUEST_PLAY,
    REQUEST_NEXT,
    REQUEST_PREVIOUS,
    REQUEST_PAUSE,
    REQUEST_CURRENT_PLAYLIST,
    REQUEST_SAVED_PLAYLISTS,
    SAVED_PLAYLISTS_CLIENT
} = require('../../front.constants');


/**
 *
 * @param socket
 * @param next
 */
module.exports = (socket, next) => {
    socket.on('action', async (data) => {
        switch (data.type) {
            case UPDATE_DATABASE: {
                frntCommandsController.updateDatabaseSongsList(data.value);
                break;
            }
            case UPDATE_DATABASE_SINCE: {
                const filterValue = {
                    name: 'modified-since',
                    value: data.value
                };
                frntCommandsController.updateDatabaseSongsList(filterValue);
                break;
            }
            case REQUEST_DIR_LIST: {
                const baseDir = data.value;
                const dirList = await frntFileCommandService.requestDirList(baseDir);
                socket.emit('action', {type: DIR_LIST_CLIENT, data: [...dirList]});
                break;
            }
            case UPDATE_DATABASE_DIR_NAME: {
                const filterValue = {
                    name: 'base',
                    value: data.value
                };
                frntCommandsController.updateDatabaseSongsList(filterValue);
                break;
            }
            case CLEANUP_DATABASE:
                frntCommandsController.databaseCleanup();
                break;
            case REQUEST_CURRENT_SONG: {
                frntMpdService.requestCurrentSong();
                break;
            }
            case REQUEST_CURRENT_PLAYLIST:
                frntMpdService.requestCurrentPlaylist();
                break;
            case REQUEST_MPD_STATUS: {
                const status = await frntMpdService.requestMPDStatus();
                if (status) {
                    socket.emit('action', {type: CURRENT_MPD_STATUS_CLIENT, data: {...status}});
                }
                break;
            }
            case REQUEST_STOP:
            case REQUEST_PLAY:
            case REQUEST_NEXT:
            case REQUEST_PREVIOUS:
            case REQUEST_PAUSE:
                frntMpdService.sendMPDCommand(data.type);
                break;
            case REQUEST_SAVED_PLAYLISTS:{
                const playlists = await frntDatabaseService.requestSavedPlaylist(data.value);
                if (playlists) {
                    socket.emit('action', {type: SAVED_PLAYLISTS_CLIENT, data: playlists});
                }
                break;
            }
            default: {
                frntPublisher.publishEvents(data.type);
                break;
            }
        }
    });

    next();
};