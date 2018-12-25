import React from 'react';
import { Button } from '@blueprintjs/core';


export default (props) => {
    return (
        <div>
            <h5>Dump statistics:</h5>
            <Button onClick={props.dumpStatistics}>Proceed</Button>
        </div>
    );
};