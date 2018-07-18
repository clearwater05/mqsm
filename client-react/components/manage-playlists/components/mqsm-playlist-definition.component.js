import React from 'react';
import {Intent} from '@blueprintjs/core';

import RulePresentation from './mqsm-playlist-rules-presentation.component';
import RuleLimit from './mqsm-playlist-rule-limit.component';

export default (props) => {
    if (props.rules) {
        return (
            <div className="msqm-playlist-rule">
                <RulePresentation definitions={props.rules.positive} intent={Intent.SUCCESS}/>
                <RulePresentation definitions={props.rules.negative} intent={Intent.WARNING}/>
                <RuleLimit limit={props.rules.limit} />
            </div>
        );
    }

    return (<div className="msqm-playlist-rule"/>);
};