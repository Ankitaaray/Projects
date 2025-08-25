const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const port=3000
const { Server } = require('socket.io');
require('dotenv').config()
const Message=require('./models/messages')

const app = express();
app.use(express.json())
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', { from: 'Server', text: 'Welcome!', createdAt: Date.now() });

    socket.on('createMessage', (message) => {
        console.log('New message:', message);
        io.emit('newMessage', message); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});