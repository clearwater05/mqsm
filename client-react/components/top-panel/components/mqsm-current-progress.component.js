import React from 'react';
import {ProgressBar, Intent} from '@blueprintjs/core';

export default (props) => {
    return (
        <ProgressBar animate={false}
                     className="mqsm-current-song-progress"
                     intent={Intent.PRIMARY}
                     value={props.progress}/>
    );
};