import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from '@blueprintjs/core';

import {requestSongModelAttributesList} from '../../../../actions/playlists.actions';
import RuleItem from './mqsm-playlist-rule-select-tag.component';

class AddRuleDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedSongAttributes: []
        };

        this.setSongTag = this.setSongTag.bind(this);
    }

    /**
     *
     * @param {string} attribute
     */
    setSongTag(attribute) {
        console.log(attribute);
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="mqsm-playlist-add-rule-dialog">
                <div className="mqsm-playlist-add-rule-dialog-header">
                    Rule Name
                </div>
                <div className="mqsm-playlist-add-rule-dialog-body">
                    <RuleItem attributes={this.props.songAttributes}
                              setSongTag={this.setSongTag}/>
                </div>
                <div className="mqsm-playlist-add-rule-dialog-footer">
                    <ButtonGroup>
                        <Button>Add</Button>
                        <Button>Cancel</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }

    /**
     *
     */
    componentDidMount() {
        if (this.props.songAttributes.length < 1) {
            this.props.requestSongModelAttributesList();
        }
    }
}

/**
 *
 * @param state
 * @returns {{songAttributes: Array}}
 */
function mapStateToProps(state) {
    return {
        songAttributes: state.playlistsReducer.songAttributes
    };
}

export default connect(mapStateToProps, {
    requestSongModelAttributesList
})(AddRuleDialog);