import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import reducer from './reducers/index';
import App from './components/app';
import './all.less';

const address = `${window.location.hostname}:${window.location.port}`;
const socket = io(address);
const socketIoMiddleware = createSocketIoMiddleware(socket, 'public:action:');
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('.app-container'));