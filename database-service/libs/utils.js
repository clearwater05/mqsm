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

module.exports = {
    /**
     *
     * @param {Object} rawData
     * @return {Song}
     */
    mapMetaTagsToProps(rawData) {
        /**
         *
         * @type {SongModel}
         */
        const data = {};

        songTags.forEach((tag) => {
            if (rawData.hasOwnProperty(tag)) {
                data[tag] = rawData[tag];
                delete rawData[tag];
            }
        });

        const tags = Object.keys(rawData);
        tags.forEach((tag) => {
            switch (tag) {
                case 'codec_name':
                    data.filetype = rawData['codec_name'];
                    delete rawData['codec_name'];
                    break;
                case 'bits_per_raw_sample':
                    data.bitrate = +rawData['bits_per_raw_sample'];
                    delete rawData['bits_per_raw_sample'];
                    break;
                case 'bit_rate':
                    data.bitrate = +rawData['bit_rate'];
                    delete rawData['bit_rate'];
                    break;
                case 'album_artist':
                    data.albumartist = rawData.album_artist;
                    delete rawData.album_artist;
                    break;
                case 'totaltracks':
                    data.tracktotal = rawData.totaltracks;
                    delete rawData.totaltracks;
                    break;
            }
        });

        data.other_tags = Object.assign({}, rawData);
        return data;
    }
};