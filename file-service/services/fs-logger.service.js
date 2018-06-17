const publisher = require('./fs-publisher-service');

const {
    SYSTEM_ERROR,
    SYSTEM_EVENT
} = require('../file-service.constants');


module.exports = {
    /**
     *
     * @param message
     * @param error
     */
    errorLog(message, error) {
        const when = new Date();
        const strError = JSON.stringify(error);
        publisher.publish(SYSTEM_ERROR, {message, error: strError, when});
    },

    /**
     *
     * @param message
     * @param event
     */
    eventLog(message, event) {
        const when = new Date();
        const strEvent = JSON.stringify(event);
        publisher.publish(SYSTEM_EVENT, {message, event: strEvent, when});
    }
};