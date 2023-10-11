const socket = io.connect('http://localhost:9000');

// init is called inside of start-game click listener
const init = async () => {
  const initOrbs = await socket.emitWithAck('init', {
    playerName: player.name,
  });

  setInterval(() => {
    socket.emit('tock', {
      xVector: player.xVector,
      yVector: player.yVector,
    })
  },33)
  
  orbs = initOrbs;

  draw();
};

socket.on('tick', (playersArray) => {
    players = playersArray;
})