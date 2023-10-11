const socket = io.connect('http://localhost:9000');

// init is called inside of start-game click listener
const init = async () => {
  const initOrbs = await socket.emitWithAck('init', {
    playerName: player.name,
  });

  orbs = initOrbs;

  draw();
};
