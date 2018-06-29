import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@blueprintjs/core';

/**
 *
 * @param props
 * @return {*}
 */
export default (props) => {
    return (
        <Link to={`/${props.link}`}>
            <div className="list-group-item flex-column justify-content-center mqsm-left-menu-item">
                <Button large={true} icon={props.icon}/>
                <span className="mqsm-left-menu-item-text">{props.menuText}</span>
            </div>
        </Link>
    );
};