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
 * @param name
 * @return {Promise<Model>}
 */
Playlist.getPlaylist = async (name) => {
    try {
        return await Playlist.findOne({
            where: {
                name
            }
        });
    } catch (e) {
        const errMsg = `getPlaylist(${name}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
};

Playlist.getPlaylistDefinition = async (name) => {
    try {
        return await Playlist.findOne({
            attributes: ['definition'],
            where: {
                name
            }
        }).then((found) => {
            return found.toJSON();
        });
    } catch (e) {
        const errMsg = `getPlaylistDefinition(${name}) failed (${scriptName}): `;
        logger.errorLog(errMsg, e);
    }
}


Playlist.sync();

module.exports = Playlist;