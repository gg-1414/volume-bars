// Bars 
// background: linear-gradient(transparent, #ff00f7a8, transparent);

const one = {}

one.drawLoop = function() {
  // clear the background
    // canvasContext.clearRect(0,0,WIDTH,HEIGHT);
  
    // check if we're currently clipping
    if (meter.checkClipping())
      canvasContext.fillStyle = "red";
    else
      canvasContext.fillStyle = `rgba(${Math.random() * 255}, 
                                      ${Math.random() * 255}, 
                                      ${Math.random() * 255},
                                      ${Math.random() * 1})`;
  
    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume*WIDTH*levelNum, HEIGHT); 
    canvasContext.fillRect(WIDTH, 0, meter.volume*WIDTH*-levelNum, HEIGHT);
  
    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}
