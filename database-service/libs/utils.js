const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @typedef {Object} SongModel
 * @property filename
 * @property title
 * @property album
 * @property album_path
 * @property artist
 * @property albumartist
 * @property composer
 * @property track
 * @property tracktotal
 * @property disc
 * @property date
 * @property genre
 * @property comment
 * @property originalyear
 * @property effectiveoriginalyear
 * @property releasecountry
 * @property sourcemedia
 * @property publisher
 * @property effective_albumartist
 * @property etag
 * @property performer
 * @property compilation
 * @property duration
 * @property length
 * @property cover
 * @property fmps_playcount
 * @property lastplayed
 * @property fmps_rating
 * @property rating
 * @property skipcount
 * @property autoscore
 * @property channels
 * @property channel_layout
 * @property filetype
 * @property bitrate
 * @property sample_rate
 * @property mtime
 * @property ctime
 * @property filesize
 * 
 */

/**
 * @typedef {Object} StickersModel
 * @property {String} type
 * @property {String} uri
 * @property {String} name
 * @property {String} value
 */

/**
 *
 * @type {string[]}
 */
const songTags = [
    'filename',
    'title',
    'album',
    'album_path',
    'artist',
    'albumartist',
    'composer',
    'track',
    'tracktotal',
    'disc',
    'date',
    'genre',
    'comment',
    'originalyear',
    'effectiveoriginalyear',
    'releasecountry',
    'sourcemedia',
    'publisher',
    'effective_albumartist',
    'etag',
    'performer',
    'compilation',
    'duration',
    'length',
    'cover',
    'fmps_playcount',
    'lastplayed',
    'fmps_rating',
    'rating',
    'skipcount',
    'autoscore',
    'channels',
    'channel_layout',
    'filetype',
    'bitrate',
    'sample_rate',
    'mtime',
    'ctime',
    'filesize'
];

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

/**
 *
 * @param {Object} rawData
 * @return {SongModel}
 */
function mapMetaTagsToProps(rawData) {
    const rawCopy = {...rawData};
    /**
     *
     * @type {SongModel}
     */
    const song = {};

    songTags.forEach((tag) => {
        if (rawCopy.hasOwnProperty(tag)) {
            song[tag] = rawCopy[tag];
            delete rawCopy[tag];
        }
    });

    const tags = Object.keys(rawCopy);
    tags.forEach((tag) => {
        switch (tag) {
            case 'codec_name':
                song.filetype = rawCopy['codec_name'];
                delete rawCopy['codec_name'];
                break;
            case 'bits_per_raw_sample':
                song.bitrate = +rawCopy['bits_per_raw_sample'];
                delete rawCopy['bits_per_raw_sample'];
                break;
            case 'bit_rate':
                song.bitrate = +rawCopy['bit_rate'];
                delete rawCopy['bit_rate'];
                break;
            case 'album_artist':
                song.albumartist = rawCopy.album_artist;
                delete rawCopy.album_artist;
                break;
            case 'totaltracks':
                song.tracktotal = rawCopy.totaltracks;
                delete rawCopy.totaltracks;
                break;
        }
    });

    song.other_tags = {...rawCopy};
    return song;
}

/**
 *
 * @param {number} currentAutoRating
 * @param {number} rating
 * @param {number} playCount
 * @param {number} skipCount
 * @param {boolean} isSkip
 * @returns {number|*}
 */
function calculateAutoRating(currentAutoRating = 0, rating = 0, playCount = 1, skipCount = 0, isSkip = false) {
    if ((playCount + skipCount) === 0) {
        return 0;
    }

    const factor = Math.abs((rating * 10) - currentAutoRating) / (2 * (playCount + skipCount));

    if (isSkip && playCount > 0) {
        return currentAutoRating - factor;
    }

    if (isSkip && playCount === 0) {
        return factor;
    }

    return currentAutoRating + factor;
}

/**
 *
 * @param {number} rating
 * @param {number} playcount
 * @returns {number}
 */
function calculateCurrentAutoScore(rating, playcount) {
    let autoscore = 0;
    for(let i = 1; i < playcount; i++) {
        autoscore = calculateAutoRating(autoscore, rating, i);
    }

    return autoscore;
}

module.exports = {
    operatorsAliases,
    mapMetaTagsToProps,
    calculateAutoRating,
    calculateCurrentAutoScore,

    /**
     *
     * @param {Object} definition
     */
    mapPlaylistDefinitionToQuery(definition) {
        console.log(definition);
    }
};