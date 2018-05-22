const cote = require('cote')({environment: 'mqm'});

const {CURRENT_MPD_STATUS, CURRENT_SONG} = require('../../front.constants');
const frntFileCommandService = require('../services/frnt-file-command.service');

const subscriber = new cote.Subscriber({
    name: 'mqm-frnt-events-subscriber'
});

module.exports = () => {
    /**
     *
     */
    subscriber.on(CURRENT_MPD_STATUS, (status) => {
        // console.log(status);
    });

    /**
     *
     */
    subscriber.on(CURRENT_SONG, async (song) => {
        try {
            const cover = await frntFileCommandService.getCoverForAlbum(song);
            const metaData = await frntFileCommandService.getFileMetaData(song); //TODO temporary change to database request

            console.log(metaData);
        } catch (e) {
            console.log(e);
        }
    });
};