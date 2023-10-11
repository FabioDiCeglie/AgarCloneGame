const socket = io.connect('http://localhost:9000');

// init is called inside of start-game click listener
const init = async () => {
  const initData = await socket.emitWithAck('init', {
    playerName: player.name,
  });

  setInterval(() => {
    socket.emit('tock', {
      xVector: player.xVector ? player.xVector : .1,
      yVector: player.yVector ? player.yVector : .1,
    })
  },33)
  
  orbs = initData.orbs;
  player.indexInPlayers = initData.indexInPlayers

  draw();
};

// the server sends out the location/data of all players 30/second
socket.on('tick', (playersArray) => {
    players = playersArray;
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
})