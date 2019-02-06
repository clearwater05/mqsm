const path = require('path');
const Sequelize = require('sequelize');

const sequelize = require('../services/stickers-db.service');
const logger = require('../services/database-logger.service');
const scriptName = path.basename(__filename);

const StickersModel = sequelize.define(
    'sticker',
    {
        type: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        uri: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        name: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        value: {type: Sequelize.STRING, allowNull: false}
    }, {
        timestamps: false,
        freezeTableName: true
    });

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
                stickers.push({
                    type,
                    uri,
                    name,
                    value: rawData[name]
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
        const allowedTags = ['rating', 'fmps_rating', 'lastplayed', 'fmps_playcount'];
        allowedTags.forEach((name) => {
            switch (name) {
                case 'rating':
                    stickers.push({
                        type,
                        uri,
                        name,
                        value: rawData[name] || 0
                    });
                    break;
                case 'fmps_rating':
                    stickers.push({
                        type,
                        uri,
                        name,
                        value: rawData[name] || 0
                    });
                    break;
                case 'lastplayed':
                    stickers.push({
                        type,
                        uri,
                        name,
                        value: rawData[name] || '1970-01-01T00:00:00.000Z'
                    });
                    break;
                case 'fmps_playcount':
                    stickers.push({
                        type,
                        uri,
                        name: 'playcount',
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
 * @returns {Promise<void>}
 */
async function updateStickers(stickers) {
    for (let i = 0, j = stickers.length; i < j; i++) {
        try {
            const sticker = await StickersModel.getSticker(stickers[i].uri, stickers[i].name);
            if (sticker) {
                sticker.value = stickers[i].value;
                await sticker.save();
            } else {
                await StickersModel.create(
                    stickers[i], {
                        fields: ['type', 'uri', 'name', 'value']
                    });

            }
        } catch (e) {
            const errMsg = `stickerUpsert(${stickers[i]}) failed (${scriptName}): `;
            logger.errorLog(errMsg, e);
        }
    }
}

/**
 *
 * @param songInfo
 * @returns {Promise<void>}
 */
StickersModel.updateAllSongStickers = (songInfo) => {
    const stickers = mapMetaTagsToStickers(songInfo);
    return updateStickers(stickers);
};

/**
 *
 * @param songInfo
 * @returns {Promise<void>}
 */
StickersModel.updateStatisticsStickers = (songInfo) => {
    const statistics = mapMetaTagsToStatisticsStickers(songInfo);
    return updateStickers(statistics);
};

StickersModel.sync();

module.exports = StickersModel;
