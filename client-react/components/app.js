import React, {Component} from 'react';
import {Navbar} from 'reactstrap';

import LeftPanel from './left-panel/left-panel.component';

export default class App extends Component {
    render() {
        return (
            <div className="app-main container-fluid">
                <div className="row">
                    <Navbar color="dark" dark expand="md">
                        Navbar
                    </Navbar>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <LeftPanel />
                    </div>
                    <div className="col-sm-8">
                        rigth column
                    </div>
                </div>
            </div>
        );
    }
}