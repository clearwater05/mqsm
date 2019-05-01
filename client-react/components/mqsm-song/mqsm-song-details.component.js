import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

import MQSMRating from '../mqsm-common-components/mqsm-star-rating.component';
import {requestSelectedSongDetails} from '../../actions/current.actions';


class SongDetails extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     *
     * @return {*}
     */
    render() {
        const song = this.props.song || {};

        return (
            <table className="pt-html-table pt-html-table-striped mqsm-song-details-table">
                <tbody>
                <tr>
                    <td>Track# {song.track} {song.tracktotal && ` of ${song.tracktotal}`}</td>
                    <td colSpan={2}><h5>{song.title}</h5></td>
                    <td>
                        <MQSMRating rating={song.rating}/>
                    </td>
                </tr>
                <tr>
                    <td>{`Playcount - ${song.fmps_playcount}`}</td>
                    <td>{`Last Played - ${moment(song.lastplayed).format('lll')}`}</td>
                    <td>{`Skipcount - ${song.skipcount || ''}`}</td>
                    <td>{`Autoscore - ${song.autoscore || ''}`}</td>
                </tr>
                <tr>
                    <td>Artist</td>
                    <td>{song.artist}</td>
                    <td>Composer</td>
                    <td>{song.composer}</td>
                </tr>
                <tr>
                    <td>Album</td>
                    <td>
                        {song.album} {song.disc && `(disc# ${song.disc})`}
                        {song.compilation && ' Compilation album'}
                    </td>
                    <td>Date</td>
                    <td>{song.date}</td>
                </tr>
                <tr>
                    <td>Album Artist</td>
                    <td>{song.albumartist}</td>
                    <td>Genre</td>
                    <td>{song.genre}</td>
                </tr>
                <tr>
                    <td>Effective Albumartist</td>
                    <td>{song.effective_albumartist}</td>
                    <td>Performer</td>
                    <td>{song.performer}</td>
                </tr>
                <tr>
                    <td>Release Country</td>
                    <td>{song.releasecountry}</td>
                    <td>Source Media</td>
                    <td>{song.sourcemedia}</td>
                </tr>
                <tr>
                    <td>Publisher</td>
                    <td>{song.publisher}</td>
                    <td>Original year</td>
                    <td>{song.originalyear}</td>
                </tr>

                <tr>
                    <td>Etag</td>
                    <td>{song.etag}</td>
                    <td>File Type</td>
                    <td>{song.filetype}</td>
                </tr>
                <tr>
                    <td>Channels</td>
                    <td>{song.channels}</td>
                    <td>Channel Layout</td>
                    <td>{song.channel_layout}</td>
                </tr>
                <tr>
                    <td>Bitrate</td>
                    <td>{song.bitrate}</td>
                    <td>Sample Rate</td>
                    <td>{song.sample_rate}</td>
                </tr>
                <tr>
                    <td>Modified</td>
                    <td>{moment(song.mtime).format('lll')}</td>
                    <td>Filesize</td>
                    <td>{song.filesize}</td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        {song.comment}
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        {song.filename}
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    /**
     *
     */
    componentDidMount() {
        this.props.requestSelectedSongDetails(this.props.filename);
    }

    /**
     *
     * @param nextProps
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps) {
        return this.props.song && this.props.song.filename !== nextProps.filename;
    }
}

/**
 *
 */
function mapStateToProps(state) {
    return {
        song: state.selectedSong
    };
}


export default connect(mapStateToProps, {
    requestSelectedSongDetails
})(SongDetails);

/*
other_tags: {type: Sequelize.JSON}
*/
