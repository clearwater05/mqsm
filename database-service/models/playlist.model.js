const Sequelize = require('sequelize');

const sequelize = require('../services/sequelize.service');

const Playlist = sequelize.define('playlist', {
    name: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    description: {type: Sequelize.STRING},
    body: {type: Sequelize.STRING}
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

Playlist.sync();

module.exports = Playlist;