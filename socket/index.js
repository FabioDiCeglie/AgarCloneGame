const io = require('../server').io;
const checkForOrbCollisions =
  require('./checkCollisions').checkForOrbCollisions;
const checkForPlayerCollisions =
  require('./checkCollisions').checkForPlayerCollisions;

//================CLASSES================
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Orb = require('./classes/Orb');

const orbs = [];
const settings = {
  defaultNumberOfOrbs: 500, //number of orbs on the map
  defaultSpeed: 8, //player speed
  defaultSize: 6, //default player speed
  defaultZoom: 1.5, // as the player gets bigger, zoom needs to go out
  worldWidth: 500,
  worldHeight: 500,
  defaultGenericOrbSize: 5, //smaller than player orbs
};

const players = [];
const playersForUsers = [];
let tickTockInterval;

const initGame = () => {
  //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    orbs.push(new Orb(settings));
  }
};

const getLeaderBoard = () => {
  const leaderBoardArray = players.map((curPlayer) => {
    if (curPlayer.playerData) {
      return {
        name: curPlayer.playerData.name,
        score: curPlayer.playerData.score,
      };
    } else {
      return {};
    }
  });
  return leaderBoardArray;
};

initGame();

setInterval(() => {
  // send the event to the game room
  io.to('game').emit('tick', players);
}, 33);

io.on('connect', (socket) => {
  let player = {};
  socket.on('init', ({ playerName }, ackCallback) => {
    if (players.length === 0) {
      tickTockInterval = setInterval(() => {
        // send the event to the game room
        io.to('game').emit('tick', playersForUsers);
      }, 33);
    }

    socket.join('game'); // add this socket to the game room
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(player); // server use only
    playersForUsers.push({ playerData });

    ackCallback({ orbs, indexInPlayers: playersForUsers.length - 1 });
  });

  // the client sent over a tock!
  socket.on('tock', (data) => {
    //a tock has come in before the player is set up.
    //this is because the client kept tocking after disconnect
    if (!player.playerConfig) {
      return;
    }

    speed = player.playerConfig.speed;
    const xV = (player.playerConfig.xVector = data.xVector);
    const yV = (player.playerConfig.yVector = data.yVector);

    //if player can move in the x, move
    if (
      (player.playerData.locX > 5 && xV < 0) ||
      (player.playerData.locX < settings.worldWidth && xV > 0)
    ) {
      player.playerData.locX += speed * xV;
    }

    //if player can move in the y, move
    if (
      (player.playerData.locY > 5 && yV > 0) ||
      (player.playerData.locY < settings.worldHeight && yV < 0)
    ) {
      player.playerData.locY -= speed * yV;
    }

    // check for the tocking palayer to hit orbs
    const capturedOrbI = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    );
    // function returns null if not collision, an index if there is a collision

    if (capturedOrbI !== null) {
      orbs.splice(capturedOrbI, 1, new Orb(settings));

      //now update the clients with the new orb
      const orbData = {
        capturedOrbI,
        newOrb: orbs[capturedOrbI],
      };
      // emit to all sockets playing the game, the orbSwitch event so it can update orbs...
      io.to('game').emit('orbSwitch', orbData);
      // emit to all sockets playing the game, the updateLeaderBoard event because someone just scored
      io.to('game').emit('updateLeaderBoard', getLeaderBoard());
    }

    // player collisions of tocking player
    const absorbData = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      playersForUsers,
      socket.id
    );
    if (absorbData) {
      io.to('game').emit('playerAbsorbed', absorbData);
      io.to('game').emit('updateLeaderBoard', getLeaderBoard());
    }
  });

  socket.on('disconnect', () => {
    if (players.length === 0) {
      clearInterval(tickTockInterval);
    }
  });
});
