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
     * @returns {XML}
     */
    render() {
        return (
            <Button onClick={this.onClick.bind(this)}>
                <span aria-hidden="true">Update database</span>
            </Button>
        );
    }
}

export default connect(null, {updateDatabase})(UpdateDatabaseComponent);