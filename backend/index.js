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

const CHAT_BOT = 'ChatBot';
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room

        // Add this
        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
