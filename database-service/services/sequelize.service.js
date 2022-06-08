const sqlite = require('sqlite3');
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
const {operatorsAliases} = require('../libs/utils');

const {DB_PATH} = require('../database-service.config');
new sqlite.Database(DB_PATH);

const sequelize = new Sequelize('mqm', null, null, {
    dialect: 'sqlite',
    storage: DB_PATH,
    logging: false,
    operatorsAliases,
    define: {
        timestamps: false
    },
    retry: {
        max: 5
    }
});

sequelize.query('PRAGMA journal_mode=WAL;');

module.exports = sequelize;