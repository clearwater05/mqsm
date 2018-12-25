const responder = require('../services/fis-command-responder.service');
const fileMethods = require('../services/files-methods.service');

const {
    REQUEST_COVER,
    REQUEST_FILE_METADATA,
    REQUEST_FILES_LIST_METADATA,
    REQUEST_DIR_LIST,
    DUMP_STATISTICS_TO_FILES
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

    /**
     *
     */
    responder.on(REQUEST_DIR_LIST, async (req, cb) => {
        const dirList = await fileMethods.getDirList(req.value);

        cb(dirList);
    });

    /**
     *
     */
    responder.on(DUMP_STATISTICS_TO_FILES, async (req, cb) => {
        try {
            const result = await fileMethods.dumpStatistics(req.value);
            cb(result);
        } catch (e) {
            cb(0);
        }
    });
};