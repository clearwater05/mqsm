require('events').EventEmitter.defaultMaxListeners = 15;
require ('./controllers/initdb.controller')();
require('./controllers/database-commands.controller')();