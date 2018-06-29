import React from 'react';

import MQSMMenuItem from './mqsm-left-menu-item.component';

export default () => {
    return (
        <div className="list-group mqsm-left-main-tabs">
            <MQSMMenuItem icon="music" menuText="Collection" link={''}/>
            <MQSMMenuItem icon="properties" menuText="Play Lists" link={'playlists'}/>
            <MQSMMenuItem icon="wrench" menuText="Settings" link={'settings'}/>
        </div>
    );
};