const {UPDATE_DATABASE} = require('../../front.constants');
const frntCommandsController = require('../controllers/frnt-commands.controller');
const frntPublisher = require('../services/frnt-service-publisher.service');


/**
 *
 * @param socket
 * @param next
 */
module.exports = (socket, next) => {
    socket.on('action', (data) => {
        switch (data.type) {
            case UPDATE_DATABASE:
                frntCommandsController.updateDatabaseSongsList(data.value);
                break;
            default: {
                frntPublisher.publishEvents(data.type);
                break;
            }
        }
    });

    next();
};