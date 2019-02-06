const sqlite = require('sqlite3');
const Sequelize = require('sequelize');

const { STICKER_PATH } = require('../database-service.config');
new sqlite.Database(STICKER_PATH);
const {operatorsAliases} = require('../libs/utils');

module.exports = new Sequelize('mqm', null, null, {
    dialect: 'sqlite',
    storage: STICKER_PATH,
    logging: false,
    operatorsAliases,
    omitNull: true,
    define: {
        timestamps: false
    }
});