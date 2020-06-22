import express from 'express';
import http from 'http';
import socket from 'socket.io';
import mongoose from 'mongoose';
import redisService from './services/Redis';

import Chat from './models/Chat';

const app = express();
const server = http.createServer(app);
const io = socket(server);
const redis = new redisService();

interface Messages {
  id: string;
  username: string;
  message: string;
}

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

io.on('connection', async socket => {
  console.log(`Socket conectado: ${socket.id}`);

  // const userConnected = await redis.recover(socket.id);
  // console.log(userConnected);
  // if(!userConnected) {
  //   const messages = await Chat.find();

  //   if(messages){
  //     socket.emit('previousMessage', messages);
  //   }
  // }
  
  // await redis.save(socket.id, 'user');

  socket.on('sendMessage', async data => {
    await Chat.create(data);
    
    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen(3333, () => {
  console.log('Server iniciado na porta 3333 🥱');
});