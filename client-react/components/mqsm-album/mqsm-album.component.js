import React from 'react';
import classNames from 'classnames';

import {fmtTime} from '../../libs/mqsm-client-utils';
import MQSMCover from '../mqsm-cover/mqsm-cover.component';
import Song from '../mqsm-song/mqsm-song.component';

/**
 *
 * @param props
 * @return {*}
 */
export default (props) => {
    const cover = props.cover;
    const albumName = props.album;
    const thumbWidth = 50;
    const songsList = props.songs || [];
    const albumDuration = fmtTime(props.duration);

    const songs = songsList.map((song, index) => {
        const active = song.index === +props.currentSongIndex && 'mqsm-album-active-song';
        const songClassName = classNames('col-12', 'mqsm-album-song', active);

        return (
            <div className="row mqsm-album-songs-wrapper" key={index}>
                <div className={songClassName}>
                    <Song {...song} />
                </div>
            </div>
        );
    });

    return (
        <div className="bp3-dark mqsm-album-main-wrapper">
            <div className="mqsm-album-main row">
                <div className="col-1 mqsm-album-cover">
                    <MQSMCover cover={cover} albumName={albumName} thumbWidth={thumbWidth}/>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-5">
                            {props.artist}
                        </div>
                        <div className="col-6">
                            {albumName}
                        </div>
                        <div className="col-1">
                            {props.date}
                        </div>
                    </div>
                </div>
                <div className="col-1">{albumDuration}</div>
            </div>
            {songs}
        </div>
    );
};