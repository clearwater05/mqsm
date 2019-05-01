import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import AlbumComponent from '../mqsm-album/mqsm-album.component';
import {requestCurrentPlaylist} from '../../actions/current.actions';

class CurrentPlaylist extends PureComponent {
    /**
     *
     * @return {*}
     */
    render() {
        const playlist = this.props.playlist || [];
        const albums = playlist.map((album, index) => {
            return (
                <div key={index}>
                    <AlbumComponent {...album} currentSongIndex={this.props.currentSongIndex}/>
                </div>
            );
        });

        return (
            <div className="mqsm-current-playlist">
                {albums}
            </div>
        );
    }

    /**
     *
     */
    componentDidMount() {
        this.props.requestCurrentPlaylist();
    }
}

function mapStateToProps(state) {
    return {
        currentSongIndex: state.mpdEvents.currentSongIndex,
        playlist: state.mpdEvents.currentPlaylist
    };
}

export default connect(mapStateToProps, {
    requestCurrentPlaylist
})(CurrentPlaylist);