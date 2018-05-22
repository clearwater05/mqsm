/**
 *
 * @param obj
 * @returns {*}
 */
function keysToLowerCase(obj) {
    Object.keys(obj).forEach(function (key) {
        const k = key.toLowerCase();

        if (k !== key) {
            obj[k] = obj[key];
            delete obj[key];
        }
    });
    return (obj);
}

module.exports = {
    keysToLowerCase
};