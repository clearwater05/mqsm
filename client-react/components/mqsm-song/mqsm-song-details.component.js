import React from 'react';
import moment from 'moment';
import MQSMRating from '../mqsm-common-components/mqsm-star-rating.component';

export default (props) => {
    return (
        <table className="pt-html-table pt-html-table-striped mqsm-song-details-table">
            <tbody>
            <tr>
                <td>Track# {props.track} {props.tracktotal && ` of ${props.tracktotal}`}</td>
                <td colSpan={2}><h5>{props.title}</h5></td>
                <td>
                    <MQSMRating rating={props.rating}/>
                </td>
            </tr>
            <tr>
                <td>{`Playcount - ${props.fmps_playcount}`}</td>
                <td>{`Last Played - ${moment(props.lastplayed).format('lll')}`}</td>
                <td>{`Skipcount - ${props.skipcount || ''}`}</td>
                <td>{`Autoscore - ${props.autoscore || ''}`}</td>
            </tr>
            <tr>
                <td>Artist</td>
                <td>{props.artist}</td>
                <td>Composer</td>
                <td>{props.composer}</td>
            </tr>
            <tr>
                <td>Album</td>
                <td>
                    {props.album} {props.disc && `(disc# ${props.disc})`}
                    {props.compilation && ' Compilation album'}
                </td>
                <td>Date</td>
                <td>{props.date}</td>
            </tr>
            <tr>
                <td>Album Artist</td>
                <td>{props.albumartist}</td>
                <td>Genre</td>
                <td>{props.genre}</td>
            </tr>
            <tr>
                <td>Effective Albumartist</td>
                <td>{props.effective_albumartist}</td>
                <td>Performer</td>
                <td>{props.performer}</td>
            </tr>
            <tr>
                <td>Release Country</td>
                <td>{props.releasecountry}</td>
                <td>Source Media</td>
                <td>{props.sourcemedia}</td>
            </tr>
            <tr>
                <td>Publisher</td>
                <td>{props.publisher}</td>
                <td>Original year</td>
                <td>{props.originalyear}</td>
            </tr>

            <tr>
                <td>Etag</td>
                <td>{props.etag}</td>
                <td>File Type</td>
                <td>{props.filetype}</td>
            </tr>
            <tr>
                <td>Channels</td>
                <td>{props.channels}</td>
                <td>Channel Layout</td>
                <td>{props.channel_layout}</td>
            </tr>
            <tr>
                <td>Bitrate</td>
                <td>{props.bitrate}</td>
                <td>Sample Rate</td>
                <td>{props.sample_rate}</td>
            </tr>
            <tr>
                <td>Modified</td>
                <td>{moment(props.mtime).format('lll')}</td>
                <td>Filesize</td>
                <td>{props.filesize}</td>
            </tr>
            <tr>
                <td colSpan={4}>
                    {props.comment}
                </td>
            </tr>
            <tr>
                <td colSpan={4}>
                    {props.filename}
                </td>
            </tr>
            </tbody>
        </table>
    );
};

/*
other_tags: {type: Sequelize.JSON}
*/
