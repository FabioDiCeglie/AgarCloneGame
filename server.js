const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(__dirname+'/public'));

const PORT = 9000
const expressServer = app.listen(PORT);
const io = socketio(expressServer);

console.info(`Starting server: http://localhost:${PORT}`)

module.exports = {
    app,
    io
}