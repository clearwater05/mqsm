import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {Toaster} from '@blueprintjs/core';

import ProgressToast from './toasts/mqsm-update-progress.config';
import CleanedCount from './toasts/mqsm-cleaned-count.config';

class DatabaseProgress extends PureComponent {
    /**
     *
     * @param ref
     */
    refHandlers(ref) {
        this.toaster = ref;
    }

    /**
     *
     * @return {*}
     */
    render() {
        return (
            <Fragment>
                <Toaster ref={this.refHandlers.bind(this)} />
            </Fragment>
        );
    }

    /**
     *
     * @param props
     * @return {*}
     */
    showToast(props) {
        if (props.updateProgress.state === 'start' || props.updateProgress.state === 'ongoing') {
            this.toaster.show(ProgressToast(this.props), 'progress');
        }
        if (props.cleanedSongCount.showMessage) {
            this.toaster.show(CleanedCount(this.props), 'cleanCount');
        }
    }

    /**
     *
     */
    componentDidUpdate() {
        this.showToast(this.props);
    }
}

function mapStateToProps(state) {
    return {
        updateProgress: state.updateDatabaseProgress,
        cleanedSongCount: state.cleanedSongCount
    };
}

export default connect(mapStateToProps, null)(DatabaseProgress);