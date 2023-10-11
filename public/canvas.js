const init = () => {
  draw();
};

let randomX = Math.floor(500 * Math.random() + 10); // horizontal axis
let randomY = Math.floor(500 * Math.random() + 10); // vertical axis
context.beginPath();
context.fillStyle = 'rgb(255,0,0)';
context.arc(randomX, randomY, 10, 0, Math.PI * 2);
// context.arc(200,200,10,0,Math.PI*2) //draw an arc/circle
//arg1 and arg2 are center x and centery of the arc
//arg3 = radius of the circle
//arg4 = where to start drawing in radians - 0 = 3:00
//arg 5 = where to stop drawing in radians - Pi = 90deg
context.fill();
context.lineWidth = 3;
context.strokeStyle = 'rgb(0,255,0)'; // draw a green line
context.stroke(); // draw the line border

const draw = () => {};
