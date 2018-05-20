const sqlite = require('sqlite3');
const Sequelize = require('sequelize');

const {DB_PATH} = require('../database-service.config');
new sqlite.Database(DB_PATH);

module.exports = new Sequelize('mqm', null, null, {
    dialect: 'sqlite',
    storage: DB_PATH,
    logging: false,
    define: {
        timestamps: false
    }
});