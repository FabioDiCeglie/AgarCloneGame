const io = require('../server').io;

//================CLASSES================
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Orb = require('./classes/Orb');

const orbs = [];
const settings = {
  defaultNumberOfOrbs: 5000, //number of orbs on the map
  defaultSpeed: 6, //player speed
  defaultSize: 6, //default player speed
  defaultZoom: 1.5, // as the player gets bigger, zoom needs to go out
  worldWidth: 5000,
  worldHeight: 5000,
  defaultGenericOrbSize: 5, //smaller than player orbs
};

const players = [];

const initGame = () => {
  //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    orbs.push(new Orb(settings));
  }
};

initGame();

io.on('connect', (socket) => {
  socket.on('init', ({ playerName }, ackCallback) => {
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    const player = new Player(socket.id, playerConfig, playerData);
    players.push(player)

    ackCallback(orbs)
  });
});
