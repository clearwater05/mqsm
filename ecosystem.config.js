const ignoreArray = [
    'node_modules',
    'database-service/data',
    // 'database-service/data/mqm.db-journal',
    // 'front-service/server/public',
    '.idea'
];

module.exports = {
    apps: [
        {
            name: 'mpd-service',
            script: './mpd-service/mpd-service.js',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            watch: ['./mpd-service'],
            ignore_watch: [...ignoreArray]
        }, {
            name: 'file-service',
            script: './file-service/file-service.js',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            watch: ['./file-service'],
            ignore_watch: [...ignoreArray]
        }, {
            name: 'frontend-service',
            script: './front-service/server/front-service.js',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            watch: ['./frontend-service/server'],
            ignore_watch: [...ignoreArray]
        }, {
            name: 'database-service',
            script: './database-service/database-service.js',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            watch: ['./database-service'],
            ignore_watch: [...ignoreArray]
        }
    ]
};
