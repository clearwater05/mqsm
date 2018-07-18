const path = require('path');
const Sequelize = require('sequelize');

const sequelize = require('../services/sequelize.service');
const logger = require('../services/database-logger.service');

const scriptName = path.basename(__filename);

const Playlist = sequelize.define('playlist', {
    name: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    description: {type: Sequelize.STRING},
    definition: {type: Sequelize.JSON},
    is_active: {type: Sequelize.BOOLEAN}
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

/**
 *
 * @return {Promise<Array<Model>>}
 */
Playlist.getAllPlaylists = async () => {
    try {
        return await Playlist.findAll();
    } catch (e) {
        const errMsg = `getAllPlaylists() failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
};

/**
 *
 * @param playlistName
 * @return {Promise<Model>}
 */
Playlist.getPlaylist = async (playlistName) => {
    try {
        return await Playlist.findOne({
            where: {
                name: {
                    [Op.in]: playlistName
                }
            }
        });
    } catch (e) {
        const errMsg = `getPlaylist() failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
};


Playlist.sync();

module.exports = Playlist;