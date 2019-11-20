// chaos game 

let canvas = null, 
    canvasCONTEXT = null, 
    WIDTH = 500,
    HEIGHT = 500;

let ax, ay,
    bx, by, 
    cx, cy, 
    x, y; 

let radius = 70; 

let interval; 

window.onload = function() {
  canvas = document.getElementById('canvas'); 
  canvasCONTEXT = canvas.getContext("2d"); 

  canvasCONTEXT.fillStyle = "blue";
  canvasCONTEXT.fillRect(0, 0, WIDTH, HEIGHT);

  ax = WIDTH / 2; 
  ay = 0; 
  bx = 0;
  by = HEIGHT; 
  cx = WIDTH; 
  cy = HEIGHT; 
  x = Math.random() * WIDTH; 
  x = Math.random() * HEIGHT; 

  for (let i = 0; i < 1000; i++) {
    canvasCONTEXT.fillStyle = "white";
    canvasCONTEXT.fillRect(x, y, 2, 2);
    // canvasCONTEXT.beginPath(); 
    // canvasCONTEXT.arc(x, y, radius, 0, 2 * Math.PI, false);
    // canvasCONTEXT.fillStyle = "red"; 
    // canvasCONTEXT.fill();
    // canvasCONTEXT.lineWidth = 5; 
    // canvasCONTEXT.strokeStyle = "black";
    // canvasCONTEXT.stroke();
    
    
  }
  draw();
}

function draw() {
  interval = setInterval(function() {
    console.log('hello')
    canvasCONTEXT.fillStyle = "white";
    canvasCONTEXT.fillRect(x, y, 5, 5);
  }, 10000)
}