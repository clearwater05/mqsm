import React, {PureComponent} from 'react';
import {ButtonGroup, Button, Intent} from '@blueprintjs/core';
import {connect} from 'react-redux';

import {sendMPDPlayerCommand} from '../../../actions/current.actions';

import {
    REQUEST_STOP,
    REQUEST_PLAY,
    REQUEST_NEXT,
    REQUEST_PREVIOUS,
    REQUEST_PAUSE
} from '../../../front.constants';


class MPDPlayControls extends PureComponent {
    /**
     *
     * @return {*}
     */
    render() {
        const state = this.props.status.state;

        return (
            <ButtonGroup minimal={false} large={true}>
                <Button icon="step-backward" intent={Intent.PRIMARY}
                        onClick={() => {
                            this.props.sendMPDPlayerCommand(REQUEST_PREVIOUS);
                        }}
                        disabled={state === 'pause' || state === 'stop'}/>
                <Button icon={state === 'stop' ? 'play' : 'stop'}
                        disabled={state === 'pause'}
                        onClick={() => {
                            const command = state === 'stop' ? REQUEST_PLAY : REQUEST_STOP;
                            this.props.sendMPDPlayerCommand(command);
                        }}
                        intent={Intent.PRIMARY}/>
                <Button icon={state === 'pause' ? 'play' : 'pause'}
                        disabled={state === 'stop'}
                        onClick={() => {
                            const command = state === 'pause' ? REQUEST_PLAY : REQUEST_PAUSE;
                            this.props.sendMPDPlayerCommand(command);
                        }}
                        intent={Intent.PRIMARY}/>
                <Button icon="step-forward" intent={Intent.PRIMARY}
                        onClick={() => {
                            this.props.sendMPDPlayerCommand(REQUEST_NEXT);
                        }}
                        disabled={state === 'pause'|| state === 'stop'}/>
            </ButtonGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        status: state.mpdEvents.mpdStatus
    };
}

export default connect(mapStateToProps, {
    sendMPDPlayerCommand
})(MPDPlayControls);