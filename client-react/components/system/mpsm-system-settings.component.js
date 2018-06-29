import React from 'react';

import MQSMDatabaseMaintenance from './database-maintenance/mqsm-database-maintenance.component';

export default () => {
    return (
        <div className="mqsm-system-settings">
            <h1>System Settings</h1>
            <MQSMDatabaseMaintenance />
        </div>
    );
};