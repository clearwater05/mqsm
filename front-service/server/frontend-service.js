const path = require('path');
const express = require('express');

require('events').EventEmitter.defaultMaxListeners = 15;

const { SERVER_PORT, SERVER_PUBLIC_PATH } = require('../frontend-service.config');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(SERVER_PORT);

app.use(express.static(path.join(__dirname, SERVER_PUBLIC_PATH)));
