import React, {Component} from 'react';
import Song from '../../mqsm-song/mqsm-song.component';
import {connect} from 'react-redux';

class CurrentSongInfo extends Component {
    render() {
        return (
            <div className="mqsm-current-song-info">
                <Song {...this.props.currentSong}/>
                <div className="mqsm-artist-album-info">{this.props.currentSong.artist} - {this.props.currentSong.album}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSong: state.mpdEvents.currentSong
    };
}

export default connect(mapStateToProps, null)(CurrentSongInfo);