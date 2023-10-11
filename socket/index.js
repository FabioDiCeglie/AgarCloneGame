const io = require('../server').io;

const Orb = require('./classes/Orb');

const orbs = [];

const initGame = () => {
  //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
};

initGame()

io.on('connect', (socket) => {
    socket.emit('init', {
        orbs
    })
})
