/**
 *
 * @param rawList
 * @returns {Array}
 */
function parseSimplePlaylist(rawList) {
    const list = [];
    rawList.split(/\n/g).forEach((line) => {
        const parsed = line.split(':').map((i) => i.trim());
        if (parsed[0] !== '') {
            const idx = +parsed[0];
            list[idx] = parsed[2];
        }
    });
    return list;
}

module.exports = {
    parseSimplePlaylist
};