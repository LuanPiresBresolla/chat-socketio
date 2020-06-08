import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);

interface Messages {
  username: string
  message: string;
}

let messages: Messages[] = [];

io.on('connection', socket => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.emit('previousMessage', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen(3333, () => {
  console.log('Server iniciado na porta 3333 🥱');
});