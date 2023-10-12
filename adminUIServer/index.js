const express = require('express');
const app = express();
app.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'));
app.listen(3030);

console.info(`Starting server: http://localhost:3030`);