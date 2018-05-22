const cote = require('cote')({environment: 'mqm'});

const fileMethods = require('../services/files-methods.service');
const {REQUEST_COVER, REQUEST_FILE_METADATA} = require('../file-service.constants');

const responder = new cote.Responder({
    name: 'mqm-fs-command-responder',
    namespace: 'file-service'
});

module.exports = () => {
    /**
     *
     */
    responder.on(REQUEST_COVER, async (req, cb) => {
        const albumPath = fileMethods.getFullPath(req.value);
        const cover = await fileMethods.getCover(albumPath);

        cb(cover);
    });

    /**
     *
     */
    responder.on(REQUEST_FILE_METADATA, async (req, cb) => {
        const file = fileMethods.getFullPath(req.value);
        const metadata = await fileMethods.getMetadata(file);

        cb(metadata);
    });
};