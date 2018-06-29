import React from 'react';
import {Icon} from '@blueprintjs/core';

/**
 * @typedef {Object} bigIconProps
 * @property {string} name
 *
 * @param {bigIconProps} props
 * @return {*}
 */
export default (props) => {
    return (
        <div className="mqsm-icon-wrapper">
            <Icon icon={props.name}
                  iconSize={24}
                  intent="pt-dark-icon-color">
            </Icon>
        </div>
    );
};