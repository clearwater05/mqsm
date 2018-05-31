const util = require('util');

const dbCommandResponder = require('../services/database-command-responder.service');
const dbEventPublisher = require('../services/database-events-publisher.service');
const songModel = require('../models/song.model');

const promisedTimeout = util.promisify(setTimeout);

const {
    UPDATE_DATABASE
} = require('../database-service.constants');

module.exports = () => {
    /**
     *
     */
    dbCommandResponder.on(UPDATE_DATABASE, async (req, cb) => {
        try {
            const list = req.value;
            if (Array.isArray(list)) {
                await dbEventPublisher.publishProgress('start', list.length);

                for (let i = 0, j = list.length; i < j; i++) {
                    await songModel.songUpsert(list[i]);
                    await dbEventPublisher.publishProgress('ongoing', j, i);
                    await promisedTimeout(5);
                }

                await dbEventPublisher.publishProgress('finish', list.length);
            }
        } catch (e) {
            console.log(e);
            //TODO error handler
        }
        cb(true);
    });
};