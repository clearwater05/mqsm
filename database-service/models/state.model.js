const Sequelize = require('sequelize');

const sequelize = require('../services/sequelize.service');

const State = sequelize.define('state', {
    state_name: Sequelize.STRING,
    state_value: Sequelize.STRING
}, {
    timestamps: false
});

State.sync();

module.exports = State;