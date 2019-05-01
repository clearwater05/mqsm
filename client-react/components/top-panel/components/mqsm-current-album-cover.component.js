import React, {Component} from 'react';
import {connect} from 'react-redux';

function CurrentAlbumCoverWrapper(MQSMCover) {
    class CurrentAlbumCover extends Component {
        /**
         *
         */
        render() {
            const cover = this.props.currentSong.cover;
            const albumName = this.props.currentSong.album;
            const thumbWidth = 50;

            return (
                <MQSMCover cover={cover} albumName={albumName} thumbWidth={thumbWidth}/>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            currentSong: state.mpdEvents.currentSong
        };
    }

    return connect(mapStateToProps, null)(CurrentAlbumCover);
}

export default CurrentAlbumCoverWrapper;