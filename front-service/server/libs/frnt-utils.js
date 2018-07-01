/**
 *
 * @param {Object[]} arr
 * @return {Object}
 */
function songsArrayToSongsObject(arr) {
    return arr.reduce((obj, song) => {
        obj[song.filename] = JSON.parse(JSON.stringify(song));
        return obj;
    }, {});
}

/**
 *
 * @param playlist
 * @return {Array}
 */
function groupPlaylistByAlbum(playlist) {
    const grouped = [];
    if (Array.isArray(playlist)) {
        playlist.forEach((song, index) => {
            if (index === 0 || (grouped[grouped.length - 1] && grouped[grouped.length - 1].album_path !== song.album_path)) {
                const entry = {
                    album: song.album,
                    album_path: song.album_path,
                    artist: song.artist,
                    date: song.date,
                    songs: [JSON.parse(JSON.stringify(song))]
                };
                grouped.push(entry);
            } else {
                grouped[grouped.length - 1].songs.push(JSON.parse(JSON.stringify(song)));
            }
        });
    }
    return grouped;
}

module.exports = {
    songsArrayToSongsObject,
    groupPlaylistByAlbum
};