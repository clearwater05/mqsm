import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Calendar } from 'react-date-range';
import moment from 'moment';

import {
    updateDatabase,
    updateDatabaseSince,
    updateDatabaseFromDirName,
    databaseCleanUp
} from '../../../../actions/system.actions';

class UpdateDatabaseComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            modifiedSinceSeconds: moment(),
            updateDirName: ''
        };
        this.onUpdateDatabaseFromDirName = this.onUpdateDatabaseFromDirName.bind(this);
        this.onChangeDirName = this.onChangeDirName.bind(this);
        this.cleanUpDatabase = this.cleanUpDatabase.bind(this);
    }
    /**
     *
     */
    onClick() {
        this.props.updateDatabase();
    }

    /**
     *
     */
    onUpdateSince() {
        this.props.updateDatabaseSince(this.state.modifiedSinceSeconds);
    }

    /**
     *
     */
    onUpdateDatabaseFromDirName() {
        this.props.updateDatabaseFromDirName(this.state.updateDirName);
    }

    /**
     *
     * @param event
     */
    onChangeDirName(event) {
        this.setState({
            updateDirName: event.target.value
        });
    }

    /**
     *
     * @param {moment} date
     */
    handleSelectDate(date){
        this.setState({
            modifiedSince: date,
            modifiedSinceSeconds: date.valueOf() / 1000
        });
    }

    /**
     *
     */
    cleanUpDatabase() {
        this.props.databaseCleanUp();
    }

    /**
     *
     * @return {*}
     */
    render() {
        return (
            <Fragment>
                <div key="done">{this.props.progress.done || 0}</div>,
                <Button key="button" onClick={this.onClick.bind(this)}>
                    <span aria-hidden="true">Complete Database Update</span>
                </Button>
                <hr />
                <Calendar
                    onInit={this.handleSelectDate.bind(this)}
                    onChange={this.handleSelectDate.bind(this)}/>
                <Button onClick={this.onUpdateSince.bind(this)}>
                    <span>Update database since...</span>
                </Button>
                <hr />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">BASE DIR/</InputGroupAddon>
                    <Input placeholder="directory path"
                           value={this.state.updateDirName}
                           onChange={this.onChangeDirName} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.onUpdateDatabaseFromDirName}>
                            <span>Update database from dir...</span>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <hr/>
                <Button onClick={this.cleanUpDatabase}>Cleanup Database</Button>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        progress: state.updateDatabaseReducer.dbUpdateProgress,
        cleanedSongCount: state.cleanedSongCount.cleanedSongCount
    };
}

export default connect(mapStateToProps, {
    updateDatabase,
    updateDatabaseSince,
    updateDatabaseFromDirName,
    databaseCleanUp
})(UpdateDatabaseComponent);