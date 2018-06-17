const responder = require('../services/fis-command-responder.service');
const fileMethods = require('../services/files-methods.service');

const {
    REQUEST_COVER,
    REQUEST_FILE_METADATA,
    REQUEST_FILES_LIST_METADATA
} = require('../file-service.constants');

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
        try {
            const metadata = await fileMethods.getMetadata(file);
            cb(metadata);
        } catch (e) {
            cb({filename: file});
        }
    });

    /**
     *
     */
    responder.on(REQUEST_FILES_LIST_METADATA, async (req, cb) => {
        const completeList = req.value.slice(0);
        const result = await fileMethods.proceedFilesQueue(completeList);

        cb(result);
    });
};