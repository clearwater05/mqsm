const cote = require('cote')({environment: 'mqm'});
const {
    UPDATE_DATABASE,
    INCREASE_SONG_PLAYCOUNT_COMMAND,
    INCREASE_SONG_SKIP_COUNT_COMMAND,
    CURRENT_PLAYLIST_COMMAND,
    REQUEST_SONG_INFO,
    CLEANUP_DATABASE_COMMAND,
    UPDATE_SONG_RATING_COMMAND,
    REQUEST_SAVED_PLAYLISTS,
    REQUEST_SAVED_PLAYLIST_PREVIEW,
    REQUEST_SONG_ATTRIBUTES_LIST,
    REQUEST_LIST_STATISTICS
} = require('../../front.constants');

const dbRequester = new cote.Requester({
    namespace: 'database-service',
    name: 'mqm-frnt-db-requester'
});

module.exports = {
    /**
     *
     * @param {string} song
     * @return {Promise<Song>}
     */
    getSong(song) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SONG_INFO,
                value: song
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },
    /**
     *
     * @param {Array} songList
     * @returns {Promise<void>}
     */
    updateDatabase(songList) {
        return new Promise((resolve) => {
            const req = {
                type: UPDATE_DATABASE,
                value: songList
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     * @param {string} song
     */
    updateSongStatistics(song) {
        return new Promise((resolve) => {
            const req = {
                type: INCREASE_SONG_PLAYCOUNT_COMMAND,
                value: song
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     * @param {string} song
     */
    increaseSongScipCount(song) {
        return new Promise((resolve) => {
            const req = {
                type: INCREASE_SONG_SKIP_COUNT_COMMAND,
                value: song
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     *
     * @param {string[]} playlist
     * @return {Promise<Object[]>}
     */
    getPlaylist(playlist) {
        return new Promise((resolve) => {
            if (playlist.length > 0) {
                const req = {
                    type: CURRENT_PLAYLIST_COMMAND,
                    value: playlist.slice()
                };

                dbRequester.send(req, (resultList) => {
                    resolve(resultList);
                });
            } else {
                resolve([]);
            }
        });
    },

    /**
     *
     * @param {string[]} fullList
     * @return {Promise<any>}
     */
    databaseCleanup(fullList) {
        return new Promise((resolve) => {
            const req = {
                type: CLEANUP_DATABASE_COMMAND,
                value: fullList
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     *
     * @param song
     * @param rating
     * @return {Promise<any>}
     */
    updateSongRating(song, rating) {
        return new Promise((resolve) => {
            const req = {
                type: UPDATE_SONG_RATING_COMMAND,
                value: {
                    song,
                    rating
                }
            };

            dbRequester.send(req, (result) => {
                resolve(result);
            });
        });
    },

    /**
     *
     * @param playlistName
     * @return {Promise<any>}
     */
    requestSavedPlaylist(playlistName) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SAVED_PLAYLISTS
            };
            if (playlistName) {
                req.value = playlistName;
            }

            dbRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @param playlistName
     * @return {Promise<any>}
     */
    requestSavedPlaylistPreview(playlistName) {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SAVED_PLAYLIST_PREVIEW,
                value: playlistName
            };

            dbRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @returns {Promise<any>}
     */
    requestSongAttributesList() {
        return new Promise((resolve) => {
            const req = {
                type: REQUEST_SONG_ATTRIBUTES_LIST
            };

            dbRequester.send(req, (res) => {
                resolve(res);
            });
        });
    },

    /**
     *
     * @param {array} list
     * @returns {Promise<Array>}
     */
    requestListStatistics(list) {
        return new Promise(resolve => {
            const req = {
                type: REQUEST_LIST_STATISTICS,
                value: list
            };

            dbRequester.send(req, res => {
                resolve(res);
            });
        });
    }
};