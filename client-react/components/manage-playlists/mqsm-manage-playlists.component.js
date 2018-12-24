import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Icon} from '@blueprintjs/core';
import classNames from 'classnames';

import {
    requestSavedPlaylist,
    requestPreviewSavedPlaylist
} from '../../actions/playlists.actions';

import ManagePlaylistControls from './components/mqsm-playlist-controls.component';
import PlaylistRuleDefinition from './components/mqsm-playlist-definition.component';
import ActionMenu from '../mqsm-common-components/mqsm-action-menu.component';

class ManagePlalistsComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.previewRule = this.previewRule.bind(this);

        this.actions = [
            {
                id: 'preview',
                name: 'Preview',
                action: this.previewRule,
                icon: 'eye-open'
            },
            {
                id: 'activate',
                name: 'Activate',
                action: (name) => {
                    console.log(name);
                },
                icon: 'play'
            },
            {
                id: 'delete',
                name: 'Delete',
                action: (name) => {
                    console.log(name, 'delete');
                },
                icon: 'trash'
            }
        ];
    }

    /**
     *
     * @param ruleId
     */
    previewRule(ruleId) {
        this.props.requestPreviewSavedPlaylist(ruleId);
    }

    /**
     *
     * @return {*}
     */
    render() {
        const showPlaylists = this.props.playlists.map((item, index) => {
            const active = classNames('mqsm_is_active_playlist', item.is_active ? 'active' : 'inactive');

            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><PlaylistRuleDefinition rules={item.definition}/></td>
                    <td className={active}><Icon icon="tick"/></td>
                    <td><ActionMenu actions={this.actions} actionId={item.name}/></td>
                </tr>
            );
        });
        return (
            <div className="mqsm-manage-playlists">
                <ManagePlaylistControls/>
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
    requestSavedPlaylist,
    requestPreviewSavedPlaylist
})(ManagePlalistsComponent);