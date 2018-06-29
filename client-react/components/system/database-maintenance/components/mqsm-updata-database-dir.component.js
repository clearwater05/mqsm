import React from 'react';
import {Button, InputGroup, ControlGroup} from '@blueprintjs/core';

export default (props) => {
    let dirs;
    if (props.dirs && props.dirs.length > 0 && props.showDirsList) {
        dirs = (
            <div className="mqsm-dirs-select-list pt-dark">
                {props.dirs.map((dir, index) => (
                    <div className="mqsm-dir-list-option"
                         key={index}
                         onMouseDown={() => {
                             props.selectDir(dir);
                         }}>{dir}</div>
                ))}
            </div>
        );
    }

    return (
        <div className="mqsm-update-database-dir-component">
            <h5>Update Database from Dir:</h5>
            <ControlGroup fill={false} vertical={false}>
                <InputGroup placeholder="Enter dir name..."
                            onChange={props.handleDirChange}
                            onFocus={props.handleFocus}
                            value={props.inputValue}
                            onBlur={props.handleBlur}/>
                <Button icon="folder-new"
                        onClick={props.updateDir}>Update</Button>
            </ControlGroup>
            {dirs}
        </div>
    );
};