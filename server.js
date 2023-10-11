const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(__dirname+'/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) => {

    socket.on('event', () => {

    })
})



console.info('Starting server: http://localhost:9000')

module.exports = {
    app,
    io
}