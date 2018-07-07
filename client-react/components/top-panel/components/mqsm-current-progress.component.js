import React, {PureComponent} from 'react';
import {ProgressBar, Intent} from '@blueprintjs/core';
import {connect} from 'react-redux';

class SongProgress extends PureComponent {
    /**
     *
     * @return {number}
     */
    calculateProgress() {
        return this.props.status.elapsed / this.props.status.duration || 0;
    }

    /**
     *
     * @return {*}
     */
    render() {
        const progress = this.calculateProgress();
        return (
            <ProgressBar animate={false}
                         className="mqsm-current-song-progress"
                         intent={Intent.PRIMARY}
                         value={progress}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        status: state.mpdEvents.mpdStatus
    };
}

export default connect(mapStateToProps, null)(SongProgress);