const path = require('path');
const express = require('express');

require('events').EventEmitter.defaultMaxListeners = 15;

const actionsMiddleware = require('./middleware/actions.middleware');

const {
    SERVER_PORT,
    SERVER_PUBLIC_PATH
} = require('../front-service.config');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(SERVER_PORT);

app.use(express.static(path.join(__dirname, SERVER_PUBLIC_PATH)));
io.use(actionsMiddleware);

require('./controllers/frnts-events.controller')(io);
