import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

import {updateDatabase} from '../../../../actions/system.actions';

class UpdateDatabaseComponent extends PureComponent {
    /**
     *
     */
    onClick() {
        this.props.updateDatabase();
    }

    /**
     *
     * @return {*[]}
     */
    render() {
        return (
            [
                <div key="done">{this.props.progress.done || 0}</div>,
                <Button key="button" onClick={this.onClick.bind(this)}>
                    <span aria-hidden="true">Update database</span>
                </Button>
            ]
        );
    }
}

function mapStateToProps(state) {
    return {
        progress: state.updateDatabaseReducer.dbUpdateProgress
    };
}

export default connect(mapStateToProps, {updateDatabase})(UpdateDatabaseComponent);