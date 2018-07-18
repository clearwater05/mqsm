import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Icon, Button} from '@blueprintjs/core';
import classnames from 'classnames';

import {requestSavedPlaylist} from '../../actions/playlists.actions';
import PlaylistRuleDefinition from './components/mqsm-playlist-definition.component';

class ManagePlalistsComponent extends PureComponent {
    render() {
        const showPlaylists = this.props.playlists.map((item, index) => {
            const active = classnames('mqsm_is_active_playlist', item.is_active ? 'active' : 'inactive');

            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><PlaylistRuleDefinition rules={item.definition}/></td>
                    <td className={active}><Icon icon="tick"/></td>
                    <td>edit</td>
                </tr>
            );
        });
        return (
            <div className="mqsm-manage-playlists">
                <Button icon="plus">Add Playlist Rule</Button>
                <table className="table table-bordered table-dark mqsm-plalists-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Definition</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {showPlaylists}
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     *
     */
    componentDidMount() {
        this.props.requestSavedPlaylist();
    }
}

function mapStateToProps(state) {
    return {
        playlists: state.playlistsReducer.playlists
    };
}

export default connect(mapStateToProps, {
    requestSavedPlaylist
})(ManagePlalistsComponent);