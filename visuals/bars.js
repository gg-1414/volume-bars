// BARS VISUAL 

var rafID; 

const bars = {
  label: 'bars',
  stop: false,
};

bars.draw = function(canvas, context, meter) {
  this.stop = false; 

  function mainLoop() {
    requestAnimationFrame(mainLoop);

    if (bars.stop) {
      window.cancelAnimationFrame( rafID );
      return; 
    }

    // clear the background
    canvasContext.clearRect(0,0,canvas.width,canvas.height);

    // check if we're currently clipping
    if (meter.checkClipping())
      canvasContext.fillStyle = "red";
    else
      canvasContext.fillStyle = `rgba(${Math.random() * 255}, 
                                      ${Math.random() * 255}, 
                                      ${Math.random() * 255},
                                      ${Math.random() * 1})`;

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume*canvas.width*levelNum, canvas.height); 
    canvasContext.fillRect(canvas.width, 0, meter.volume*canvas.width*-levelNum, canvas.height);
  }
  
  // set up the next visual callback
  // rafID = window.requestAnimationFrame( bars.draw );
  rafID = window.requestAnimationFrame( mainLoop );
}


