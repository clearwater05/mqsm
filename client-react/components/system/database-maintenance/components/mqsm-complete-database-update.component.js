import React from 'react';
import { Button } from '@blueprintjs/core';


export default (props) => {
    return (
        <div>
            <h5>Complete Database Update</h5>
            <Button onClick={props.onUpdateRequest}>Update</Button>
        </div>
    );
};