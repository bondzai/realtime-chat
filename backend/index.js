require('dotenv').config()

const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const { Server } = require('socket.io');

const harperSaveMessage = require('./services/harper-save-message'); // Add this    

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
    let chatRoom = '';
    let allUsers = [];

    socket.on('join_room', (data) => {
        const { username, room } = data;
        socket.join(room);
        chatRoom = room;

        console.log("[room]" + room)
        console.log("[chatRoom]" + chatRoom)

        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);

        let __createdtime__ = Date.now();

        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
        });

        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });
    });

    socket.on('send_message', (data) => {
        const { message, username, room, __createdtime__ } = data;
        io.in(room).emit('receive_message', data); // Send to all users in room, including sender
        harperSaveMessage(message, username, room, __createdtime__) // Save message in db
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    });

});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
