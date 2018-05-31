const frntMpdCommandService = require('../services/frnt-mpd-commands.service');
const frntFileCommandService = require('../services/frnt-file-commands.service');
const frntDBCommandService = require('../services/frnt-database-commands.service');

module.exports = {
    /**
     *
     * @param since
     * @returns {Promise<void>}
     */
    async updateDatabaseSongsList(since = null) {
        const rawSongList = await frntMpdCommandService.getSongsList(since);
        const metaSongList = await frntFileCommandService.getFilesListMetaData(rawSongList);
        await frntDBCommandService.updateDatabase(metaSongList);
    }
};