const frntCommandsController = require('../controllers/frnt-commands.controller');
const frntPublisher = require('../services/frnt-service-publisher.service');

const {
    UPDATE_DATABASE,
    UPDATE_DATABASE_SINCE,
    UPDATE_DATABASE_DIR_NAME
} = require('../../front.constants');


/**
 *
 * @param socket
 * @param next
 */
module.exports = (socket, next) => {
    socket.on('action', (data) => {
        switch (data.type) {
            case UPDATE_DATABASE: {
                frntCommandsController.updateDatabaseSongsList(data.value);
                break;
            }
            case UPDATE_DATABASE_SINCE: {
                const filterValue = {
                    name: 'modified-since',
                    value: data.value
                };
                frntCommandsController.updateDatabaseSongsList(filterValue);
                break;
            }
            case UPDATE_DATABASE_DIR_NAME: {
                const filterValue = {
                    name: 'base',
                    value: data.value
                };
                frntCommandsController.updateDatabaseSongsList(filterValue);
                break;
            }
            default: {
                frntPublisher.publishEvents(data.type);
                break;
            }
        }
    });

    next();
};