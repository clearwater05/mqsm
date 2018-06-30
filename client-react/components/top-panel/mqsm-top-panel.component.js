import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    Navbar,
    NavbarGroup,
    NavbarDivider,
    Alignment
} from '@blueprintjs/core';

import {requestCurrentSong, requestMPDStatus, sendMPDPlayerCommand} from '../../actions/system.actions';

import AlbumCover from '../mqsm-common-components/mqsm-cover.component';
import CurrentSongProgress from './components/mqsm-current-progress.component';
import CurrentSongInfo from './components/mqsm-current-song-info.component';
import MPDPlayControls from './components/mqsm-mpd-play-control-buttons';

class TopPanelComponent extends PureComponent {
    /**
     *
     * @return {number}
     */
    calculateProgress() {
        return this.props.status.elapsed / this.props.status.duration || 0;
    }

    /**
     *
     * @return {*}
     */
    render() {
        const cover = this.props.currentSong.cover;
        const albumName = this.props.currentSong.album;
        const thumbWidth = 50;

        return (
            <Navbar className="mqsm-navbar-container">
                <NavbarGroup align={Alignment.LEFT}
                             className="mqsm-top-navigation-group">
                    <AlbumCover cover={cover} albumName={albumName} thumbWidth={thumbWidth}/>
                    <NavbarDivider />
                </NavbarGroup>
                <NavbarGroup className="mqsm-top-navigation-group">
                    <div className="mqsm-status-wrapper">
                        <CurrentSongInfo {...this.props.currentSong} />
                        <CurrentSongProgress progress={this.calculateProgress()}/>
                    </div>
                </NavbarGroup>
                <NavbarGroup className="mqsm-top-navigation-group"
                             align={Alignment.RIGHT}>
                    <div className="">
                        <MPDPlayControls
                            sendMPDPlayerCommand={this.props.sendMPDPlayerCommand}
                            state={this.props.status.state}/>
                    </div>
                </NavbarGroup>
            </Navbar>
        );
    }

    /**
     *
     */
    componentDidMount() {
        this.props.requestCurrentSong();
        this.props.requestMPDStatus();
    }
}

function mapStateToProps(state) {
    return {
        status: state.mpdEvents.mpdStatus,
        currentSong: state.mpdEvents.currentSong
    };
}

export default connect(mapStateToProps, {
    requestCurrentSong,
    requestMPDStatus,
    sendMPDPlayerCommand
})(TopPanelComponent);