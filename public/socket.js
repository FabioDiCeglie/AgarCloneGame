const socket = io.connect('http://localhost:9000');

// init is called inside of start-game click listener
const init = async () => {
  const initData = await socket.emitWithAck('init', {
    playerName: player.name,
  });

  setInterval(() => {
    socket.emit('tock', {
      xVector: player.xVector ? player.xVector : 0.1,
      yVector: player.yVector ? player.yVector : 0.1,
    });
  }, 33);

  orbs = initData.orbs;
  player.indexInPlayers = initData.indexInPlayers;

  draw();
};

// the server sends out the location/data of all players 30/second
socket.on('tick', (playersArray) => {
  players = playersArray;
  if (players[player.indexInPlayers].playerData) {
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
  }
});

socket.on('orbSwitch', (orbData) => {
  // the server just told us that an orb was absorbed. Replace it in the orbs array!
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on('playerAbsorbed', (absorbData) => {
  console.log(absorbData);
});
