var canvas = null;
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=500;

var rafID = null;
var intervalID = null;

var level = null; 
var levelNum = 15; 
// 15 default for indoor space playing music from laptop at a low level
// adjust this from input field input#level depending on how loud the environment is

var currentVISUAL = '1'; 

// >> Visuals Key: >> 
var visuals = {};
var bars = {}, 
    particles = {};

window.onload = function() {
  level = this.document.getElementById('level');
  canvas = this.document.getElementById('canvas');

  // >> Event Listeners >> 
  level.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) { // pressing enter sets levelNum
      levelNum = e.target.value; 
    }
  })

  var visualsList = this.document.getElementById('visuals-list')

  visualsList.addEventListener('click', function(e){
    // console.log('clicked', typeof e.target.dataset.id)
    currentVISUAL = e.target.dataset.id;
    // console.log('VISUAL: ', visuals[e.target.dataset.id].drawLoop)
    destroyNode();
    clearAnimation();
    visuals[currentVISUAL].drawLoop()
  })

  this.document.getElementById('stop').addEventListener('click', () => {
    destroyNode();
    clearAnimation();
  })

  // << << 

  this.document.getElementById('start').addEventListener('click', () => {
    // grab our canvas
    canvasContext = document.getElementById( "canvas" ).getContext("2d");
    
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
      // monkeypatch getUserMedia
      navigator.getUserMedia = 
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      // ask for an audio input
      navigator.getUserMedia(
      {
        "audio": {
          "mandatory": {
            "googEchoCancellation": "false",
            "googAutoGainControl": "false",
            "googNoiseSuppression": "false",
            "googHighpassFilter": "false"
          },
          "optional": []
        },
      }, gotStream, didntGetStream);
    } catch (e) {
      alert('getUserMedia threw exception :' + e);
    }
  })
}


function didntGetStream() {
  alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
  // Create an AudioNode from the stream.
  mediaStreamSource = audioContext.createMediaStreamSource(stream);

  // Create a new volume meter and connect it.
  meter = createAudioMeter(audioContext);
  mediaStreamSource.connect(meter);

  // kick off the visual updating
  // console.log('VISUAL', typeof visuals[currentVISUAL])
  visuals[currentVISUAL].drawLoop();
  // drawLoop();
}


// >> >> >> >> VISUALS >> >> >> >>  

// BARS VISUAL 
bars.drawLoop = function() {
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
  rafID = window.requestAnimationFrame( bars.drawLoop );
}

// PARTICLES VISUAL
particles.allParticles = {}; 
particles.particleIndex = 0; 
particles.particleNum = 1; 

particles.drawLoop = function() {
  intervalID = setInterval(function() {
    // console.log('levelNum: ', levelNum)
    // console.log('METER VOLUME: ', meter.volume)
    canvasContext.globalCompositeOperation = "source-over";
    canvasContext.fillStyle = "rgba(0,0,0,0.1)";
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
  
    for (var i = 0; i < particles.particleNum; i++) {
      new particles.Particle(); 
    }
  
    canvasContext.globalCompositeOperation = "lighter";
    for (var i in particles.allParticles) {
      particles.allParticles[i].draw();
    }
  }, 2000);

  rafID = window.requestAnimationFrame( particles.drawLoop );
}

particles.Particle = function() {
  this.x = WIDTH / 2; 
  this.y = HEIGHT /2; 
  this.vx = Math.random() * 10 - 5; 
  this.vy = Math.random() * 10 - 5; 
  this.gravity = 0.3; 

  particles.particleIndex++; 
  particles.allParticles[particles.particleIndex] = this;
  this.id = particles.particleIndex; 

  this.life = 0; 
  this.maxLife = Math.random() * 30 + 50; 
  // this.color = "hsla(" + parseInt(Math.random() * 255, 0) + ",100%, 55%)";
  if (this.id % 2 === 0) {
    this.color = "red";
  } else {
    this.color = "#7800ff";
  }
}

particles.Particle.prototype.draw = function() {
  this.x += this.vx;
  this.y += this.vy;

  if (Math.random() < 0.1) {
    this.vx = Math.random() * 10 - 5; 
    this.vy = Math.random() * 10 - 5; 
  }

  this.life++;
  if (this.life >= this.maxLife) {
    delete particles.allParticles[this.id];
  }

  canvasContext.fillStyle = this.color; 
  canvasContext.fillRect(this.x, this.y, 5, 5); 
}

visuals['1'] = bars; 
visuals['2'] = particles; 

// KILL SESSION
function destroyNode() {
  meter.shutdown();
}

function clearAnimation() {
  console.log('interval', intervalID)
  console.log('rafID', rafID)
  window.cancelAnimationFrame( rafID );
  clearInterval(intervalID);

  // rafID = null;
  // intervalID = null; 
}