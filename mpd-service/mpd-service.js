require('events').EventEmitter.defaultMaxListeners = 15;

require('./controllers/mpd-client.controller')();
require('./controllers/mpd-commands-responder.controller')();