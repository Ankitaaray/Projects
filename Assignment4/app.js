const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const port=3000
const { Server } = require('socket.io');
require('dotenv').config()
const Message=require('./models/messages')
const indexRoutes=require('./routes/indexRoutes')
const authRoutes= require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const userRoutes=require('./routes/userRoutes')
const msgRoutes=require('./routes/messageRoutes')
const {createTable}=require('./models/users')
const createMsg=require('./models/messages')

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
const server = createServer(app);
const io = new Server(server);

createTable()

createMsg.createTable()
app.use('/auth',authRoutes)
app.use('/',indexRoutes)
app.use('/users',authMiddleware,userRoutes)
app.use('/messages',authMiddleware,msgRoutes)

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