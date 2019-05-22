const path = require('path');
const Sequelize = require('sequelize');

const sequelize = require('../services/stickers-db.service');
const logger = require('../services/database-logger.service');
const scriptName = path.basename(__filename);

const StickersModel = sequelize.define(
    'sticker',
    {
        type: {type: Sequelize.STRING, allowNull: false},
        uri: {type: Sequelize.STRING, allowNull: false},
        name: {type: Sequelize.STRING, allowNull: false},
        value: {type: Sequelize.STRING, allowNull: false}
    }, {
        timestamps: false,
        freezeTableName: true
    });

StickersModel.removeAttribute('id');
/**
 *
 * @param uri
 * @param name
 * @returns {Promise<StickersModel>}
 */
StickersModel.getSticker = async (uri, name) => {
    return StickersModel.findOne({
        attributes: ['type', 'uri', 'name', 'value'],
        where: {
            uri,
            name
        }
    });
};

/**
 *
 * @param rawData
 * @returns {StickersModel[]}
 */
function mapMetaTagsToStickers(rawData) {
    if (rawData.filename) {
        const type = 'song';
        const uri = rawData.filename;
        const props = Object.keys(rawData);
        const stickers = [];
        props.forEach((name) => {
            if (name !== 'filename') {
                const value = rawData[name] ? '' + rawData[name] : '';
                stickers.push({
                    type,
                    uri,
                    name,
                    value
                });
            }
        });
        return stickers;
    } else {
        return [];
    }
}

function mapMetaTagsToStatisticsStickers(rawData) {
    if (rawData.filename) {
        const type = 'song';
        const uri = rawData.filename;
        const stickers = [];
        const allowedTags = ['rating', 'fmps_rating', 'lastplayed', 'fmps_playcount', 'skipcount', 'autoscore'];
        allowedTags.forEach((name) => {
            switch (name) {
                case 'lastplayed': {
                    const value = rawData[name] ? '' + rawData[name] : '1970-01-01T00:00:00.000Z';
                    stickers.push({
                        type,
                        uri,
                        name,
                        value
                    });
                    break;
                }

                default:
                    stickers.push({
                        type,
                        uri,
                        name,
                        value: rawData[name] || 0
                    });
            }
        });
        return stickers;
    } else {
        return [];
    }
}


/**
 *
 * @param stickers
 * @returns {Promise<Array>}
 */
async function updateStickers(stickers) {
    for (let i = 0, j = stickers.length; i < j; i++) {
        try {
            const [sticker, created] = await StickersModel.findOrCreate({
                where: {
                    type: 'song',
                    uri: stickers[i].uri,
                    name: stickers[i].name
                },
                defaults: {
                    value: ''
                }
            });
            sticker.value = stickers[i].value;
            await sticker.save();
        } catch (e) {
            const errMsg = `stickerUpsert(${stickers[i]}) failed (${scriptName}): `;
            logger.errorLog(errMsg, e);
        }
    }
}

/**
 *
 * @param songInfo
 * @returns {Promise<Array>}
 */
StickersModel.updateAllSongStickers = async (songInfo) => {
    const stickers = mapMetaTagsToStickers(songInfo);
    return updateStickers(stickers);
};

/**
 *
 * @param songInfo
 * @returns {Promise<Array>}
 */
StickersModel.updateStatisticsStickers = (songInfo) => {
    const statistics = mapMetaTagsToStatisticsStickers(songInfo);
    return updateStickers(statistics);
};

StickersModel.sync();

module.exports = StickersModel;
