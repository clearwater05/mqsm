const path = require('path');
const Sequelize = require('sequelize');

const {mapMetaTagsToProps} = require('../libs/utils');
const sequelize = require('../services/sequelize.service');
const logger = require('../services/database-logger.service');

const scriptName = path.basename(__filename);

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
 * @return {Promise<*>}
 */
Song.getSongInfo = async (song) => {
    try {
        return await Song.findOne({
            where: {
                filename: song
            }
        }).then((found) => {
            return found.toJSON();
        });
    } catch (e) {
        const errMsg = `getSongInfo(${song}) failed: (${scriptName}): `;
        logger.errorLog(errMsg, e);
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
        const errMsg = `songUpsert(${song}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
};

/**
 *
 * @param song
 * @return {Promise<Song>}
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
 * @param song
 * @return {Promise<*>}
 */
Song.updateSongStatistic = async (song) => {
    const savedStatistics = await Song.getSongStatistics(song);

    savedStatistics.lastplayed = new Date();
    savedStatistics.fmps_playcount = +savedStatistics.get('fmps_playcount') + 1;
    try {
        await savedStatistics.save(
            {
                fields: ['lastplayed', 'fmps_playcount']
            }
        );
        return true;
    } catch (e) {
        const errMsg = `updateSongStatistic(${song}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
        return null;
    }
};

/**
 *
 * @param song
 * @returns {Promise<Song|*>}
 */
Song.getSongSkipCount = async (song) => {
    try {
        return await Song.findOne({
            attributes: ['filename', 'skipcount'],
            where: {
                filename: song
            }
        });
    } catch (e) {
        const errMsg = `getSongSkipCount(${song}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
        return null;
    }
};

/**
 *
 * @param song
 * @returns {Promise<null|boolean>}
 */
Song.increaseSkipCount = async (song) => {
    try {
        const songModel = await Song.getSongSkipCount(song);
        songModel.skipcount = +songModel.get('skipcount') + 1;

        await songModel.save(
            {
                fields: ['skipcount']
            }
        );
        return true;
    } catch (e) {
        const errMsg = `increaseSkipCount(${song}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
        return null;
    }
};

/**
 *
 * @param {string[]} list
 * @return {Promise<Array<Model>>}
 */
Song.getSonglist = async (list) => {
    try {
        return await Song.findAll({
            attributes: ['filename', 'track', 'title', 'rating', 'album', 'artist', 'duration', 'album_path', 'date'],
            where: {
                filename: {
                    $in: list
                }
            }
        });
    } catch (e) {
        const errMsg = `getSonglist() failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
};

/**
 *
 * @param {string[]} fullSongList
 * @return {Promise<number>}
 */
Song.cleanUpSongTable = async (fullSongList) => {
    try {
        const cleaned = await Song.destroy({
            where: {
                filename: {
                    $notIn: fullSongList
                }
            }
        });

        return (cleaned);
    } catch (e) {
        const errMsg = `cleanUpSongTable(${fullSongList}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
        return 0;
    }
};

/**
 *
 * @param {string} song
 * @param {number} rating
 * @return {Promise<*>}
 */
Song.setRating = async (song, rating) => {
    try {
        return await Song.update({
            rating: +rating,
            fmps_rating: +rating / 10
        }, {
            where: {
                filename: song
            }
        });
    } catch (e) {
        const errMsg = `setRating(${song}, ${rating}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
        return null;
    }
};

/**
 *
 * @returns {Promise<null>}
 */
Song.getAttributes = async () => {
    try {
        return await Song.describe();
    } catch (e) {
        const errMsg = `getAttributes() failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
        return null;
    }
};

/**
 *
 * @param {Array} list
 * @returns {Promise<*>}
 */
Song.getStatistics = async list => {
    try {
        return await Song.findAll({
            attributes: ['filename', 'lastplayed', 'rating', 'fmps_playcount', 'fmps_rating'],
            where: {
                filename: {
                    $in: list
                }
            }
        });
    } catch (e) {
        const errMsg = `getStatistics() failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
};

Song.sync();

module.exports = Song;