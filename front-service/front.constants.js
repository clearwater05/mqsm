module.exports = {
    CURRENT_SONG: 'EVENT:CURRENT_SONG',
    CURRENT_MPD_STATUS: 'EVENT:CURRENT_MPD_STATUS',
    UPDATE_DATABASE_PROGRESS: 'EVENT:UPDATE_DATABASE_PROGRESS',
    INCREASE_SONG_PLAYCOUNT: 'EVENT:INCREASE_SONG_PLAYCOUNT',
    INCREASE_SONG_SKIP_COUNT: 'EVENT:INCREASE_SONG_SKIP_COUNT',
    CURRENT_PLAYLIST: 'EVENT:CURRENT_PLAYLIST',
    CLEANUP_DATABASE: 'EVENT:CLEANUP_DATABASE',
    CLEANED_SONG_COUNT: 'EVENT:CLEANED_SONG_COUNT',
    CURRENT_SONG_RATING_STICKER_VALUE: 'EVENT:CURRENT_SONG_RATING_STICKER_VALUE',
    SYSTEM_ERROR: 'EVENT:SYSTEM_ERROR',
    SYSTEM_EVENT: 'EVENT:SYSTEM_EVENT',

    CURRENT_MPD_STATUS_CLIENT: 'CLIENT:CURRENT_MPD_STATUS',
    CURRENT_SONG_INFO_CLIENT: 'CLIENT:CURRENT_SONG_INFO',
    CURRENT_PLAYLIST_CLIENT: 'CLIENT:CURRENT_PLAYLIST',
    UPDATE_DATABASE_PROGRESS_CLIENT: 'CLIENT:UPDATE_DATABASE_PROGRESS',
    CLEANED_SONG_COUNT_CLIENT: 'CLIENT:CLEANED_SONG_COUNT',
    SYSTEM_ERROR_CLIENT: 'CLIENT:SYSTEM_ERROR',
    SYSTEM_MESSAGE_CLIENT: 'CLIENT:SYSTEM_MESSAGE',
    DIR_LIST_CLIENT: 'CLIENT:DIR_LIST',
    SAVED_PLAYLISTS_CLIENT: 'CLIENT:SAVED_PLAYLISTS',
    SONG_DETAILS_CLIENT: 'CLIENT:SONG_DETAILS_CLIENT',
    SONG_ATTRIBUTES_LIST: 'CLIENT:SONG_ATTRIBUTES_LIST',

    REQUEST_SONG_INFO: 'COMMAND:REQUEST_SONG_INFO',
    REQUEST_CURRENT_SONG: 'COMMAND:REQUEST_CURRENT_SONG',
    REQUEST_MPD_STATUS: 'COMMAND:REQUEST_MPD_STATUS',
    REQUEST_COVER: 'COMMAND:REQUEST_COVER',
    REQUEST_FILE_METADATA: 'COMMAND:REQUEST_FILE_METADATA',
    REQUEST_FILES_LIST_METADATA: 'COMMAND:REQUEST_FILES_LIST_METADATA',
    REQUEST_SONGS_LIST: 'COMMAND:REQUEST_SONGS_LIST',
    UPDATE_DATABASE: 'COMMAND:UPDATE_DATABASE',
    UPDATE_DATABASE_SINCE: 'COMMAND:UPDATE_DATABASE_SINCE',
    UPDATE_DATABASE_DIR_NAME: 'COMMAND:UPDATE_DATABASE_DIR_NAME',
    INCREASE_SONG_PLAYCOUNT_COMMAND: 'COMMAND:INCREASE_SONG_PLAYCOUNT',
    INCREASE_SONG_SKIP_COUNT_COMMAND: 'COMMAND:INCREASE_SONG_SKIP_COUNT',
    CALCULATE_SONG_AUTO_RATING_COMMAND: 'COMMAND:CALCULATE_SONG_AUTO_RATING',
    CURRENT_PLAYLIST_COMMAND: 'COMMAND:CURRENT_PLAYLIST',
    CLEANUP_DATABASE_COMMAND: 'COMMAND:CLEANUP_DATABASE',
    UPDATE_SONG_RATING_COMMAND: 'COMMAND:UPDATE_SONG_RATING',
    REQUEST_DIR_LIST: 'COMMAND:REQUEST_DIR_LIST',
    REQUEST_STOP: 'COMMAND:REQUEST_STOP',
    REQUEST_PLAY: 'COMMAND:REQUEST_PLAY',
    REQUEST_PAUSE: 'COMMAND:REQUEST_PAUSE',
    REQUEST_NEXT: 'COMMAND:REQUEST_NEXT',
    REQUEST_PREVIOUS: 'COMMAND:REQUEST_PREVIOUS',
    MPD_PLAYER_COMMAND: 'COMMAND:MPD_PLAYER_COMMAND',
    REQUEST_CURRENT_PLAYLIST: 'COMMAND:REQUEST_CURRENT_PLAYLIST',
    REQUEST_SAVED_PLAYLISTS: 'COMMAND:REQUEST_SAVED_PLAYLISTS',
    REQUEST_SELECTED_SONG_DETAILS: 'COMMAND:REQUEST_SELECTED_SONG_DETAILS',
    REQUEST_SAVED_PLAYLIST_PREVIEW: 'COMMAND:REQUEST_SAVED_PLAYLIST_PREVIEW',
    REQUEST_SONG_ATTRIBUTES_LIST: 'COMMAND:REQUEST_SONG_ATTRIBUTES_LIST',
    DUMP_DATABASE_COMMAND: 'COMMAND:DUMP_DATABASE',
    REQUEST_LIST_STATISTICS: 'COMMAND:REQUEST_LIST_STATISTICS',
    DUMP_STATISTICS_TO_FILES: 'COMMAND:DUMP_STATISTICS_TO_FILES'
};