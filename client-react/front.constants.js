module.exports = {
    CLEANUP_DATABASE: 'EVENT:CLEANUP_DATABASE',

    CURRENT_MPD_STATUS_CLIENT: 'CLIENT:CURRENT_MPD_STATUS',
    CURRENT_SONG_INFO_CLIENT: 'CLIENT:CURRENT_SONG_INFO',
    CURRENT_PLAYLIST_CLIENT: 'CLIENT:CURRENT_PLAYLIST',
    UPDATE_DATABASE_PROGRESS_CLIENT: 'CLIENT:UPDATE_DATABASE_PROGRESS',
    CLEANED_SONG_COUNT_CLIENT: 'CLIENT:CLEANED_SONG_COUNT',
    SYSTEM_ERROR_CLIENT: 'CLIENT:SYSTEM_ERROR',
    SYSTEM_MESSAGE_CLIENT: 'CLIENT:SYSTEM_MESSAGE',
    DIR_LIST_CLIENT: 'CLIENT:DIR_LIST',
    SAVED_PLAYLISTS_CLIENT: 'CLIENT:SAVED_PLAYLISTS',

    REQUEST_SONG_INFO: 'COMMAND:REQUEST_SONG_INFO',
    REQUEST_MPD_STATUS: 'COMMAND:REQUEST_MPD_STATUS',
    REQUEST_CURRENT_SONG: 'COMMAND:REQUEST_CURRENT_SONG',
    REQUEST_COVER: 'COMMAND:REQUEST_COVER',
    REQUEST_FILE_METADATA: 'COMMAND:REQUEST_FILE_METADATA',
    REQUEST_FILES_LIST_METADATA: 'COMMAND:REQUEST_FILES_LIST_METADATA',
    REQUEST_SONGS_LIST: 'COMMAND:REQUEST_SONGS_LIST',
    UPDATE_DATABASE: 'COMMAND:UPDATE_DATABASE',
    UPDATE_DATABASE_SINCE: 'COMMAND:UPDATE_DATABASE_SINCE',
    UPDATE_DATABASE_DIR_NAME: 'COMMAND:UPDATE_DATABASE_DIR_NAME',
    CURRENT_PLAYLIST_COMMAND: 'COMMAND:CURRENT_PLAYLIST',
    CLEANUP_DATABASE_COMMAND: 'COMMAND:CLEANUP_DATABASE',
    REQUEST_DIR_LIST: 'COMMAND:REQUEST_DIR_LIST',
    REQUEST_STOP: 'COMMAND:REQUEST_STOP',
    REQUEST_PLAY: 'COMMAND:REQUEST_PLAY',
    REQUEST_PAUSE: 'COMMAND:REQUEST_PAUSE',
    REQUEST_NEXT: 'COMMAND:REQUEST_NEXT',
    REQUEST_PREVIOUS: 'COMMAND:REQUEST_PREVIOUS',
    REQUEST_CURRENT_PLAYLIST: 'COMMAND:REQUEST_CURRENT_PLAYLIST',
    REQUEST_SAVED_PLAYLISTS: 'COMMAND:REQUEST_SAVED_PLAYLISTS'
};