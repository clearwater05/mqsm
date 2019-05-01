import React from 'react';
import {ProgressBar, Intent} from '@blueprintjs/core';


/**
 *
 * @param props
 * @return {number}
 */
function calculateProgress(props) {
    const total = props.updateProgress.total;
    const done = props.updateProgress.done;
    return done / total || 0;
}


export default (props) => {
    const progress = calculateProgress(props);

    return {
        className: 'bp3-dark',
        icon: 'cloud-upload',
        message: (
            <ProgressBar animate={false}
                         className="mqsm-update-progress-bar"
                         intent={Intent.PRIMARY}
                         value={progress}/>
        )
    };
};