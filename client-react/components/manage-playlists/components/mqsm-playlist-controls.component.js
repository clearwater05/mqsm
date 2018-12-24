import React, {Fragment, PureComponent} from 'react';
import {Button, ButtonGroup} from '@blueprintjs/core';

import MQSMOverlay from '../../mqsm-common-components/mqsm-overlay.component';
import AddRuleDialogComponent from './add-rule-dialog/mqsm-playlist-add-rule-dialog.component';

const AddRuleDialog = MQSMOverlay(AddRuleDialogComponent);

export default class ManagePlaylistControls extends PureComponent {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            showAddDialog: false,
            showCreatePlaylistDialog: false
        };

        this.showAddPlaylistPopup = this.showAddPlaylistPopup.bind(this);
    }

    /**
     *
     */
    showAddPlaylistPopup() {
        this.setState((prevState) => {
            return {
                showAddDialog: !prevState.showAddDialog
            };
        });
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const addRuleDialogProps = {
            showOverlay: this.state.showAddDialog,
            toggleOverlay: this.showAddPlaylistPopup,
            ruleName: this.props.ruleName
        };

        return (
            <Fragment>
                <ButtonGroup className="mqsm-manage-playlists-controls">
                    <Button icon="plus" onClick={this.showAddPlaylistPopup}>Add Playlist Rule</Button>
                    <Button icon="plus">Create Playlist</Button>
                </ButtonGroup>
                <AddRuleDialog {...addRuleDialogProps} />
            </Fragment>
        );
    }
}