import React from 'react';
import {Tag, Intent} from '@blueprintjs/core';

export default (props) => {
    const limit = props.limit;
    if (limit) {
        return (
            <Tag intent={Intent.PRIMARY}>
                <span className="msqm-playlist-rule-field">Songs limit</span>
                <span className="msqm-playlist-rule-condition">{limit}</span>
            </Tag>
        );
    }

    return '';
};