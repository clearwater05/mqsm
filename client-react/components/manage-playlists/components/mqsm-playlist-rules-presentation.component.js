import React, {Fragment} from 'react';
import {Tag} from '@blueprintjs/core';

export default (props) => {
    const rules = props.definitions.map((item, index) => {
        const fieldName = item[0];
        const condition = item[1];
        const value = item[2];
        return (
            <Tag key={index} intent={props.intent}>
                <span className="msqm-playlist-rule-field">{fieldName}</span>
                <span className="msqm-playlist-rule-condition">{condition}</span>
                <span className="msqm-playlist-rule-value">{value}</span>
            </Tag>
        );
    });

    return (
        <Fragment>
            {rules}
        </Fragment>
    );
};