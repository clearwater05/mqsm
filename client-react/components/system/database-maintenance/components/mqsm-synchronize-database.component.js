import React from 'react';
import { Button } from '@blueprintjs/core';


export default (props) => {
    return (
        <div>
            <h5>Synchronize Database:</h5>
            <Button onClick={props.synchronizeIt}>Synchronize</Button>
        </div>
    );
};