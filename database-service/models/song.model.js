const Sequelize = require('sequelize');

const sequelize = require('../services/sequelize.service');

const Song = sequelize.define('song', {
    filename: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    title: {type: Sequelize.STRING},
    album: {type: Sequelize.STRING},
    album_path: {type: Sequelize.STRING},
    artist: {type: Sequelize.STRING},
    albumartist: {type: Sequelize.STRING},
    composer: {type: Sequelize.STRING},
    track: {type: Sequelize.INTEGER},
    tracktotal: {type: Sequelize.INTEGER},
    disc: {type: Sequelize.INTEGER},
    year: {type: Sequelize.STRING},
    genre: {type: Sequelize.STRING},
    comment: {type: Sequelize.STRING},
    compilation: {type: Sequelize.BOOLEAN},
    length: {type: Sequelize.FLOAT},
    bitrate: {type: Sequelize.INTEGER},
    samplerate: {type: Sequelize.INTEGER},
    directory: {type: Sequelize.STRING},
    mtime: {type: Sequelize.INTEGER},
    ctime: {type: Sequelize.INTEGER},
    filesize: {type: Sequelize.INTEGER},
    cover: {type: Sequelize.STRING},
    filetype: {type: Sequelize.STRING},
    playcount: {type: Sequelize.INTEGER},
    lastplayed: {type: Sequelize.DATE},
    rating: {type: Sequelize.INTEGER},
    skipcount: {type: Sequelize.INTEGER},
    autoscore: {type: Sequelize.FLOAT},
    effective_albumartist: {type: Sequelize.STRING},
    etag: {type: Sequelize.STRING},
    performer: {type: Sequelize.STRING},
    duration: {type: Sequelize.FLOAT},
    originalyear: {type: Sequelize.STRING},
    effective_originalyear: {type: Sequelize.STRING},
    releasecountry: {type: Sequelize.STRING},
    sourcemedia: {type: Sequelize.STRING},
    publisher: {type: Sequelize.STRING},
    other_tags: {type: Sequelize.JSON}
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['filename']
        },
        {
            fields: ['title', 'artist', 'album', 'album_path', 'lastplayed', 'mtime']
        }
    ]
});

Song.sync();

module.exports = Song;