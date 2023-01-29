const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const { Server } = require('socket.io'); // Add this

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

app.get('/', (req, res) => {
  res.send("test endpoint");
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
