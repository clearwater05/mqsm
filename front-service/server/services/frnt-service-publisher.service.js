const cote = require('cote')({environment: 'mqm'});

const publisher = new cote.Publisher(
    {
        name: 'frnt-service-events-publisher'
    }
);

module.exports = {
    /**
     *
     * @param event
     * @param payload
     */
    publishEvents(event, payload = null) {
        publisher.publish(event, payload);
    }
};