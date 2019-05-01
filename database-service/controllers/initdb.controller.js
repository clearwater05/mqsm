const Song = require('../models/song.model');
const Playlist = require('../models/playlist.model');
const State = require('../models/state.model');
const StickersDb = require('../models/stickers-db.model');

module.exports = () => {
    return {
        Song,
        Playlist,
        State,
        StickersDb
    };
};