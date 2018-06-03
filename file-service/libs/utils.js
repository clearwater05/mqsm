/**
 *
 * @param obj
 * @returns {*}
 */
function prepareMetaDataTags(obj) {
    Object.keys(obj).forEach(function (key) {
        const k = key.toLowerCase().replace(/\s+/, '');

        if (k !== key) {
            obj[k] = obj[key];
            delete obj[key];
        }
    });
    return (obj);
}

module.exports = {
    prepareMetaDataTags
};