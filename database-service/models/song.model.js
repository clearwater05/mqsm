const Sequelize = require('sequelize');

const {mapMetaTagsToProps} = require('../libs/utils');
const sequelize = require('../services/sequelize.service');

const Op = Sequelize.Op;

const Song = sequelize.define('song', {
    filename: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    track: {type: Sequelize.INTEGER},
    title: {type: Sequelize.STRING},
    album: {type: Sequelize.STRING},
    album_path: {type: Sequelize.STRING},
    artist: {type: Sequelize.STRING},
    albumartist: {type: Sequelize.STRING},
    composer: {type: Sequelize.STRING},
    disc: {type: Sequelize.INTEGER},
    date: {type: Sequelize.STRING},
    genre: {type: Sequelize.STRING},
    comment: {type: Sequelize.STRING},
    compilation: {type: Sequelize.BOOLEAN},
    effective_albumartist: {type: Sequelize.STRING},
    etag: {type: Sequelize.STRING},
    performer: {type: Sequelize.STRING},
    duration: {type: Sequelize.FLOAT},
    originalyear: {type: Sequelize.STRING},
    effectiveoriginalyear: {type: Sequelize.STRING},
    releasecountry: {type: Sequelize.STRING},
    sourcemedia: {type: Sequelize.STRING},
    publisher: {type: Sequelize.STRING},
    length: {type: Sequelize.FLOAT},
    tracktotal: {type: Sequelize.INTEGER},
    cover: {type: Sequelize.STRING},
    fmps_playcount: {type: Sequelize.INTEGER},
    lastplayed: {type: Sequelize.DATE},
    fmps_rating: {type: Sequelize.FLOAT},
    rating: {type: Sequelize.INTEGER},
    skipcount: {type: Sequelize.INTEGER},
    autoscore: {type: Sequelize.FLOAT},
    filetype: {type: Sequelize.STRING},
    channels: {type: Sequelize.INTEGER},
    channel_layout: {type: Sequelize.STRING},
    bitrate: {type: Sequelize.INTEGER},
    sample_rate: {type: Sequelize.INTEGER},
    mtime: {type: Sequelize.INTEGER},
    ctime: {type: Sequelize.INTEGER},
    filesize: {type: Sequelize.INTEGER},
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

/**
 *
 * @param song
 * @return {Promise<Model>}
 */
Song.getSongInfo = async (song) => {
    try {
        return await Song.findOne({
            where: {
                filename: song
            }
        });
    } catch (e) {
        console.log(e);
    }
};

/**
 *
 * @param songInfo
 * @returns {Promise.<>}
 */
Song.songUpsert = async (songInfo) => {
    try {
        const props = mapMetaTagsToProps(songInfo);
        await Song.upsert(props);
    } catch (e) {
        console.log(e);
        //TODO error handler
    }
};

/**
 *
 * @param song
 * @return {Promise<Model>}
 */
Song.getSongStatistics = async (song) => {
    return await Song.findOne({
        attributes: ['filename', 'fmps_playcount', 'lastplayed'],
        where: {
            filename: song
        }
    });
};

/**
 *
 * @param {string} song
 * @return {Promise<void>}
 */
Song.updateSongStatistic = async (song) => {
    try {
        const savedStatistics = await Song.getSongStatistics(song);
        savedStatistics.set('lastplayed', new Date());
        savedStatistics.increment('fmps_playcount');
        savedStatistics.save();
    } catch (e) {
        console.log(e);
    }
};

/**
 *
 * @param {string[]} rawList
 * @return {Promise<Array<Model>>}
 */
Song.getPlaylist = async (rawList) => {
    try {
        return await Song.findAll({
            where: {
                filename: {
                    [Op.in]: rawList
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
};

Song.sync();

module.exports = Song;