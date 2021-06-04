import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

const server = createServer(app);

app.use(express.static(path.join(__dirname, '..', 'public')));

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Socket conectado:', socket.id);
});

export { server, io };