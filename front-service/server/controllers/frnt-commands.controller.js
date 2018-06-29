const frntMpdCommandService = require('../services/frnt-mpd-commands.service');
const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntDBCommandService = require('../services/frnt-database-commands.service');

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
    }
};