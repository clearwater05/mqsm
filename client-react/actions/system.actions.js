import {
    UPDATE_DATABASE,
    UPDATE_DATABASE_SINCE,
    UPDATE_DATABASE_DIR_NAME,
    CLEANUP_DATABASE,
    REQUEST_DIR_LIST,
    DUMP_DATABASE_COMMAND
} from '../front.constants';

/**
 *
 * @return {{type: string}}
 */
export function updateDatabase() {
    return {
        type: UPDATE_DATABASE
    };
}

/**
 *
 * @param {number} date
 * @return {{type: string, value: number}}
 */
export function updateDatabaseSince(date) {
    return {
        type: UPDATE_DATABASE_SINCE,
        value: date
    };
}

/**
 *
 * @param {string} dirName
 * @return {{type: string, value: string}}
 */
export function updateDatabaseFromDirName(dirName) {
    return {
        type: UPDATE_DATABASE_DIR_NAME,
        value: dirName
    };
}

/**
 *
 * @return {{type: string}}
 */
export function databaseCleanUp() {
    return {
        type: CLEANUP_DATABASE
    };
}

/**
 *
 * @param baseDir
 * @return {{type: string, value: *}}
 */
export function requestDirList(baseDir) {
    return {
        type: REQUEST_DIR_LIST,
        value: baseDir
    };
}

/**
 *
 * @returns {{type: string}}
 */
export function dumpStatistics() {
    return {
        type: DUMP_DATABASE_COMMAND
    };
}