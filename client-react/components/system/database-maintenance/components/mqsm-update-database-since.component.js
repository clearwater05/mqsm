import React from 'react';
import {Alert, Button} from '@blueprintjs/core';
import {DateInput} from '@blueprintjs/datetime';
import moment from 'moment';

function momentFormatter(format) {
    return {
        formatDate: (date) => moment(date).format(format),
        parseDate: (str) => moment(str, format),
        placeholder: format
    };
}

export default (props) => {
    return (
        <div>
            <h5>Update Database Since:</h5>
            <DateInput {...momentFormatter('LL')}
                       onChange={props.handleSinceDateChange}
                       canClearSelection={false}
                       maxDate={new Date()}
                       placeholder="mmm DD, YYYY"
                       value={props.selectedDate}/>
            <Button onClick={props.doUpdate}>Update</Button>
        </div>
    );
};
