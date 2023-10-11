const init = () => {
  draw();
};

player.locX = Math.floor(500 * Math.random() + 10); // horizontal axis
player.locY = Math.floor(500 * Math.random() + 10); // vertical axis

const draw = () => {
  //reset the context traslate back to default
  context.setTransform(1, 0, 0, 1, 0, 0);
  
  //clearRect clears out the canvas, so we can draw on a clean canvas next frame/draw()
  context.clearRect(0, 0, canvas.width, canvas.height);

  //clamp the screen/vp to the players location (x,y)
  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;

  //translate moves the cavnas/context to where the player is at
  context.translate(camX, camY);

  context.beginPath();
  context.fillStyle = 'rgb(255,0,0)';
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2);
  // context.arc(200,200,10,0,Math.PI*2) //draw an arc/circle
  //arg1 and arg2 are center x and centery of the arc
  //arg3 = radius of the circle
  //arg4 = where to start drawing in radians - 0 = 3:00
  //arg 5 = where to stop drawing in radians - Pi = 90deg
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'rgb(0,255,0)'; // draw a green line
  context.stroke(); // draw the line border

  // requestAnimationFrame is like a controlled loop
  // it runs recursively, every paint/frame. If the framerate is 35 fps
  requestAnimationFrame(draw);
};

canvas.addEventListener('mousemove', (event) => {
  // Get the mouse position
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };

  // Calculate the angle in degrees
  const angleRad = Math.atan2(
    mousePosition.y - canvas.height / 2,
    mousePosition.x - canvas.width / 2
  );
  const angleDeg = (angleRad * 180) / Math.PI;

  // Calculate x and y vectors based on the angle
  let xVector, yVector;

  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -angleDeg / 90;
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  // Set the speed and vectors
  const speed = 10;
  const xV = xVector;
  const yV = yVector;

  // Update player position based on vectors
  if ((player.locX < 5 && xV < 0) || (player.locX > 500 && xV > 0)) {
    player.locY -= speed * yV;
  } else if ((player.locY < 5 && yV > 0) || (player.locY > 500 && yV < 0)) {
    player.locX += speed * xV;
  } else {
    player.locX += speed * xV;
    player.locY -= speed * yV;
  }
});
