import React from 'react';
import {ButtonGroup, Button, Intent} from '@blueprintjs/core';

import {
    REQUEST_STOP,
    REQUEST_PLAY,
    REQUEST_NEXT,
    REQUEST_PREVIOUS,
    REQUEST_PAUSE
} from '../../../front.constants';

export default (props) => {
    return (
        <ButtonGroup minimal={false} large={true}>
            <Button icon="step-backward" intent={Intent.PRIMARY}
                    onClick={() => {
                        props.sendMPDPlayerCommand(REQUEST_PREVIOUS);
                    }}
                    disabled={props.state === 'pause' || props.state === 'stop'}/>
            <Button icon={props.state === 'stop' ? 'play' : 'stop'}
                    disabled={props.state === 'pause'}
                    onClick={() => {
                        const command = props.state === 'stop' ? REQUEST_PLAY : REQUEST_STOP;
                        props.sendMPDPlayerCommand(command);
                    }}
                    intent={Intent.PRIMARY}/>
            <Button icon={props.state === 'pause' ? 'play' : 'pause'}
                    disabled={props.state === 'stop'}
                    onClick={() => {
                        const command = props.state === 'pause' ? REQUEST_PLAY : REQUEST_PAUSE;
                        props.sendMPDPlayerCommand(command);
                    }}
                    intent={Intent.PRIMARY}/>
            <Button icon="step-forward" intent={Intent.PRIMARY}
                    onClick={() => {
                        props.sendMPDPlayerCommand(REQUEST_NEXT);
                    }}
                    disabled={props.state === 'pause'|| props.state === 'stop'}/>
        </ButtonGroup>
    );
};