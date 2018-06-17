const publisher = require('./mpd-events-publisher.service').getPublisher();

const {
    SYSTEM_ERROR,
    SYSTEM_EVENT
} = require('../mpd-service.contants');


module.exports = {
    /**
     *
     * @param {string} message
     * @param {Object} error
     */
    errorLog(message, error) {
        const when = new Date();
        const strError = JSON.stringify(error);
        publisher.publish(SYSTEM_ERROR, {message, error: strError, when});
    },

    /**
     *
     * @param {string} message
     * @param {Object} event
     */
    eventLog(message, event) {
        const when = new Date();
        const strEvent = JSON.stringify(event);
        publisher.publish(SYSTEM_EVENT, {message, event: strEvent, when});
    }
};