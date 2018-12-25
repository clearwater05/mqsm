const frntMpdCommandService = require('../services/frnt-mpd-commands.service');
const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntDBCommandService = require('../services/frnt-database-commands.service');
const frntLoggerService = require('../services/frnt-logger.service');

module.exports = {
    /**
     *
     * @param filter
     * @returns {Promise<void>}
     */
    async updateDatabaseSongsList(filter = null) {
        const rawSongList = await frntMpdCommandService.getSongsList(filter);
        if (rawSongList) {
            const metaSongList = await frntFileCommandService.getFilesListMetaData(rawSongList);
            await frntDBCommandService.updateDatabase(metaSongList);
        }
    },

    /**
     *
     * @return {Promise<void>}
     */
    async databaseCleanup() {
        const fullSongList = await frntMpdCommandService.getSongsList();
        if (fullSongList) {
            const list = fullSongList.map(item => item.file);
            await frntDBCommandService.databaseCleanup(list);
        }
    },

    /**
     *
     * @param filter
     * @returns {Promise<void>}
     */
    async dumpStatistics(filter = null) {
        try {
            const songList = await frntMpdCommandService.getSongsList(filter);
            const fileList = songList.map(item => item.file);
            const statistics = await frntDBCommandService.requestListStatistics(fileList);
            const dumped = await frntFileCommandService.dumpStatistics(statistics);
            if (dumped) {
                frntLoggerService.eventLog(
                    `dumped statistics for ${dumped} files`,
                    null,
                    new Date()
                );
            } else {
                frntLoggerService.errorLog(`${__filename}: dumpStatistics() failed`, null, new Date);
            }
        } catch (e) {
            frntLoggerService.errorLog(`${__filename}: dumpStatistics() failed`, e, new Date);
        }

    }
};