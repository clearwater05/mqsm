import React from 'react';
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Button,
    Alignment
} from '@blueprintjs/core';

import './mqsm-top-panel.scss';

export default (props) => {
    return (
        <div className="mqsm-navbar-container">
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>MQSM</NavbarHeading>
                    <NavbarDivider/>
                    <Button className="pt-minimal" icon="home" text="Home"/>
                    <Button className="pt-minimal" icon="document" text="Files"/>
                </NavbarGroup>
            </Navbar>
        </div>
    );
};