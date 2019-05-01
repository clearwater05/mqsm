const sqlite = require('sqlite3');
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
const {operatorsAliases} = require('../libs/utils');

const {DB_PATH} = require('../database-service.config');
new sqlite.Database(DB_PATH);

module.exports = new Sequelize('mqm', null, null, {
    dialect: 'sqlite',
    storage: DB_PATH,
    logging: false,
    operatorsAliases,
    define: {
        timestamps: false
    }
});