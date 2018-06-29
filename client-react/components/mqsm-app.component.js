import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import MQSMTopPanel from './top-panel/mqsm-top-panel.component';
import MQSMLeftMenu from './left-menu/mqsm-left-menu.component';
import CurrntPlsylist from './current-playlist/mqsm-current-playlist.component';
import SystemSettings from './system/mpsm-system-settings.component';
import ManagePlaylists from './manage-playlists/mqsm-manage-playlists.component';
import DatabaseProgress from './system/toaster/mqsm-toaster.component';

export default () => {
    return (
        <Router>
            <Fragment>
                <div className="mqsm-app-main container-fluid">
                    <MQSMTopPanel/>
                    <div className="row">
                        <div className="col-sm-1">
                            <MQSMLeftMenu/>
                        </div>
                        <div className="col-sm-11">
                            <Route path="/" exact={true} component={ CurrntPlsylist }/>
                            <Route path="/playlists" component={ ManagePlaylists }/>
                            <Route path="/settings" component={ SystemSettings }/>
                        </div>
                    </div>
                </div>
                <DatabaseProgress/>
            </Fragment>
        </Router>
    );
};