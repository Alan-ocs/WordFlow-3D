import { io } from 'socket.io-client';

const socket = io('/', {
    transports: ['websocket'],
    path: '/socket.io'
});

export default socket;
