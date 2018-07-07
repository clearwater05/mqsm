/**
 *
 * @param s
 * @returns {string}
 */
export function fmtTime(s) {
    let time;
    if (s) {
        time = (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.round(s);
    } else {
        time = '0:00';
    }
    return time;
}