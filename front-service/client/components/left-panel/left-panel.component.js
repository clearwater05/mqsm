import React, {Component} from 'react';
import UpdateDatabaseComponent from './system/update-database/update-database';

export default class LeftPanel extends Component {
    render() {
        return (
            <div>
                <UpdateDatabaseComponent />
            </div>
        );
    }
}