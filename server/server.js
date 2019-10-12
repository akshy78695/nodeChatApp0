const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    
    

    socket.on('createMessage', (message) => {
        console.log('A New Message : ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});