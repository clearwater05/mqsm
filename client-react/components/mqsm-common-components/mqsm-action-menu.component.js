import React from 'react';
import {Menu, MenuItem, Popover, Button, Position} from '@blueprintjs/core';

export default (props) => {
    const menuItems = props.actions.map((item) => {
        return (
            <MenuItem icon={item.icon}
                      text={item.name}
                      onClick={() => {
                          item.action(props.actionId);
                      }}
                      key={item.id}/>
        );
    });

    const menu = (
        <Menu>
            {menuItems}
        </Menu>
    );

    return (
        <Popover content={menu} position={Position.RIGHT_BOTTOM}>
            <Button icon="list"/>
        </Popover>
    );
}