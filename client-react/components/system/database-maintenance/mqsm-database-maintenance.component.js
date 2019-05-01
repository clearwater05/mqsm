import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import CompleteUpdate from './components/mqsm-complete-database-update.component';
import UpdateSince from './components/mqsm-update-database-since.component';
import UpdateFromDir from './components/mqsm-updata-database-dir.component';
import SynchronizeDatabase from './components/mqsm-synchronize-database.component';
import DumpStatistics from './components/mqsm-dump-statistics.component';

import {
    updateDatabase,
    updateDatabaseSince,
    updateDatabaseFromDirName,
    databaseCleanUp,
    requestDirList,
    dumpStatistics
} from '../../../actions/system.actions';


class MQSMDatabaseMaintenance extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            updateSince: null,
            dirName: '',
            showDirList: false
        };

        this.mainClass = 'bp3-dark mqsm-database-maintenance-component';
        this.sectionClass = 'mqsm-database-maintenance-section';
        this.requestDirList = _.debounce(this.props.requestDirList, 500);

        this.completeDBUpdate = this.completeDBUpdate.bind(this);
        this.handleSinceDateChange = this.handleSinceDateChange.bind(this);
        this.updateSince = this.updateSince.bind(this);
        this.synchronizeIt = this.synchronizeIt.bind(this);
        this.handleDirChange = this.handleDirChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.selectDir = this.selectDir.bind(this);
        this.updateDir = this.updateDir.bind(this);
        this.dumpStatistics = this.dumpStatistics.bind(this);
    }

    /**
     *
     */
    completeDBUpdate() {
        this.props.updateDatabase();
    }

    /**
     *
     * @param event
     */
    handleDirChange(event) {
        this.setState({
            dirName: event.target.value
        });
        this.requestDirList(event.target.value);
    }

    /**
     *
     * @param event
     */
    handleFocus(event) {
        this.setState({
            showDirList: true
        });
    }

    handleBlur(event) {
        this.setState({
            showDirList: false
        });
    }

    /**
     *
     * @param {string} dir
     */
    selectDir(dir) {
        this.setState({
            dirName: dir
        });
    }

    /**
     *
     * @param date
     */
    handleSinceDateChange(date) {
        this.setState({
            updateSince: date
        });
    }

    /**
     *
     */
    updateDir() {
        if (this.state.dirName) {
            this.props.updateDatabaseFromDirName(this.state.dirName);
        }
    }

    /**
     *
     */
    updateSince() {
        if (this.state.updateSince) {
            const ms = moment(this.state.updateSince).valueOf() / 1000;
            this.props.updateDatabaseSince(ms);
        }
    }

    /**
     *
     */
    synchronizeIt() {
        this.props.databaseCleanUp();
    }

    /**
     *
     */
    dumpStatistics() {
        this.props.dumpStatistics();
    }

    /**
     *
     * @return {*}
     */
    render() {
        return (
            <Card interactive={false}
                  elevation={Elevation.TWO}
                  className={this.mainClass}>
                <h2>Database Maintenance</h2>
                <hr/>
                <div className="row">
                    <div className="col-6">
                        <div className={this.sectionClass}>
                            <CompleteUpdate onUpdateRequest={this.completeDBUpdate}/>
                        </div>
                        <div className={this.sectionClass}>
                            <UpdateFromDir handleDirChange={this.handleDirChange}
                                           handleBlur={this.handleBlur}
                                           handleFocus={this.handleFocus}
                                           showDirsList={this.state.showDirList}
                                           selectDir={this.selectDir}
                                           dirs={this.props.dirs}
                                           updateDir={this.updateDir}
                                           inputValue={this.state.dirName}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={this.sectionClass}>
                            <UpdateSince handleSinceDateChange={this.handleSinceDateChange}
                                         doUpdate={this.updateSince}/>
                        </div>
                        <div className={this.sectionClass}>
                            <SynchronizeDatabase synchronizeIt={this.synchronizeIt}/>
                        </div>
                        <div className={this.sectionClass}>
                            <DumpStatistics dumpStatistics={this.dumpStatistics}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        dirs: state.fsRequests.readDir
    };
}

export default connect(mapStateToProps, {
    updateDatabase,
    updateDatabaseSince,
    updateDatabaseFromDirName,
    databaseCleanUp,
    requestDirList,
    dumpStatistics
})(MQSMDatabaseMaintenance);