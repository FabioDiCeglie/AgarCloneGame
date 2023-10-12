const express = require('express');
const socketio = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
// const bcrypt = require('bcrypt');

const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = 9000;
const expressServer = app.listen(PORT);
const io = socketio(expressServer,{
    cors: {
        origin: ['http://localhost:3030'],
        credentials: true,
    }
});

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash('admin', salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "$2b$10$m4M.dz4eg5sG.E98mucqQuES66xxn/H64E5koueW2PCsWBXn/WJ.C" // "changeit" encrypted with bcrypt
    },
    mode: "development",
});

console.info(`Starting server: http://localhost:${PORT}`);

module.exports = {
  app,
  io,
};
