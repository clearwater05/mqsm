const cote = require('cote')({environment: 'mqm'});

const {
    UPDATE_DATABASE_PROGRESS,
    CLEANED_SONG_COUNT
} = require('../database-service.constants');

const publisher = new cote.Publisher(
    {
        name: 'database-service-events-publisher'
    }
);

module.exports = {
    /**
     *
     * @param event
     * @param payload
     */
    async publishEvents(event, payload = null) {
        await publisher.publish(event, payload);
    },

    /**
     *
     * @param state
     * @param total
     * @param done
     * @return {Promise<void>}
     */
    async publishProgress(state = 'finish', total, done = 0) {
        const progress = {};

        switch (state) {
            case 'ongoing':
                progress.state = state;
                progress.done = done;
                break;
            case 'start':
                progress.state = state;
                progress.total = total;
                progress.done = 0;
                break;
            default:
                progress.state = state;
                progress.total = total;
                progress.done = total;
                break;
        }
        await publisher.publish(UPDATE_DATABASE_PROGRESS, progress);
    },

    /**
     *
     * @param count
     * @return {Promise<void>}
     */
    async publishCleanedSongCount(count) {
        await publisher.publish(CLEANED_SONG_COUNT, count);
    }
};