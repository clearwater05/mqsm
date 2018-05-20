const mpd = require('mpd');
const path = require('path');
const co = require('co');

const { MPD_ADDRESS, MPD_PORT } = require('../mpd-service.config');
const mpdEventsPublisher = require('./mpd-events-publisher.service');

// const scriptName = path.basename(__filename);
// const cmd = mpd.cmd;

// const parseKeyValueMessage = mpd.parseKeyValueMessage;
const mpdState = {};


const mpdClient = mpd.connect({
    port: MPD_PORT,
    host: MPD_ADDRESS
});

module.exports = {
    /**
     *
     */
    getMpdClient() {
        return mpdClient;
    }
};