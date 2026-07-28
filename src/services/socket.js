import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = userId => {
  if (socket?.connected) return socket;
const SOCKET_URL =
  __DEV__
    ? "http://192.168.0.4:3000"
    : "https://www.nestme.in";
  // const SOCKET_URL =
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://192.168.0.4:3000'
  //     : 'https://www.nestme.in';
  console.log('Connecting to:', SOCKET_URL);
  socket = io(SOCKET_URL, {
    transports: ['polling', 'websocket'],
    withCredentials: true,
  });
  socket.on('connect', () => {
    console.log('✅ Socket Connected:', socket.id);

    socket.emit('join', userId);
    console.log('✅ Joined room:', userId);
  });

  socket.on('connect_error', err => {
    console.log('❌ Socket Error:', err.message);
  });

  socket.on('disconnect', reason => {
    console.log('❌ Socket Disconnected:', reason);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
