const cote = require('cote');
const Publisher = cote.Publisher;

class MpdEventsPublisher {
    /**
     *
     */
    constructor() {
        this.publisher = new Publisher({
            name: 'mqm-mpd-events-publisher'
        });
    }
}

module.exports = new MpdEventsPublisher();