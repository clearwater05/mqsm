import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    Navbar,
    NavbarGroup,
    NavbarDivider,
    Alignment
} from '@blueprintjs/core';

import {requestCurrentSong, requestMPDStatus } from '../../actions/current.actions';

import AlbumCover from '../mqsm-cover/mqsm-cover.component';
import CurrentAlbumCoverWrapper from './components/mqsm-current-album-cover.component';
import CurrentSongProgress from './components/mqsm-current-progress.component';
import CurrentSongInfo from './components/mqsm-current-song-info.component';
import MPDPlayControls from './components/mqsm-mpd-play-control-buttons';

const CurrentAlbumCover = CurrentAlbumCoverWrapper(AlbumCover);

class TopPanelComponent extends PureComponent {
    /**
     *
     * @return {*}
     */
    render() {
        return (
            <Navbar className="mqsm-navbar-container row">
                <NavbarGroup align={Alignment.LEFT}
                             className="mqsm-top-navigation-group col-1">
                    <CurrentAlbumCover />
                    <NavbarDivider />
                </NavbarGroup>
                <NavbarGroup className="mqsm-top-navigation-group col-9">
                    <div className="mqsm-status-wrapper">
                        <CurrentSongInfo />
                        <CurrentSongProgress />
                    </div>
                </NavbarGroup>
                <NavbarGroup className="mqsm-top-navigation-group col-2"
                             align={Alignment.RIGHT}>
                    <div className="">
                        <MPDPlayControls />
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

export default connect(null, {
    requestCurrentSong,
    requestMPDStatus
})(TopPanelComponent);