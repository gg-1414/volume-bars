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

var currentVISUAL = 1; 

var particles = {}, 
      particleIndex = 0,
      particleNum = 2; 

window.onload = function() {
  level = this.document.getElementById('level');
  canvas = this.document.getElementById('canvas');


  level.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) { // pressing enter sets levelNum
      levelNum = e.target.value; 
    }
  })

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

  this.document.getElementById('stop').addEventListener('click', () => {
    destroyNode();
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
  drawLoop();
  // currentVISUAL = 
  // particles();
}

// one.drawLoop()

function drawLoop() {
  // clear the background
  // canvasContext.clearRect(0,0,WIDTH,HEIGHT);

  // check if we're currently clipping
  // if (meter.checkClipping())
  //   canvasContext.fillStyle = "red";
  // else
  //   canvasContext.fillStyle = `rgba(${Math.random() * 255}, 
  //                                   ${Math.random() * 255}, 
  //                                   ${Math.random() * 255},
  //                                   ${Math.random() * 1})`;

  // draw a bar based on the current volume
  // canvasContext.fillRect(0, 0, meter.volume*WIDTH*levelNum, HEIGHT); 
  // canvasContext.fillRect(WIDTH, 0, meter.volume*WIDTH*-levelNum, HEIGHT);

  // set up the next visual callback
  // rafID = window.requestAnimationFrame( drawLoop );

  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

  drawParticles()
}

function Particle() {
  this.x = WIDTH / 2; 
  this.y = HEIGHT /2; 
  this.vx = Math.random() * 10 - 5; 
  this.vy = Math.random() * 10 - 5; 
  this.gravity = 0.3; 

  particleIndex++; 
  particles[particleIndex] = this;
  this.id = particleIndex; 

  this.life = 0; 
  this.maxLife = Math.random() * 30 + 50; 
  // this.color = "hsla(" + parseInt(Math.random() * 255, 0) + ",100%, 55%)";
  if (this.id % 2 === 0) {
    this.color = "red";
  } else {
    this.color = "#7800ff";
  }
}

Particle.prototype.draw = function() {
  this.x += this.vx;
  this.y += this.vy;

  if (Math.random() < 0.1) {
    this.vx = Math.random() * 10 - 5; 
    this.vy = Math.random() * 10 - 5; 
  }

  this.life++;
  if (this.life >= this.maxLife) {
    delete particles[this.id];
  }

  canvasContext.fillStyle = this.color; 
  canvasContext.fillRect(this.x, this.y, 5, 5); 
}

function drawParticles() {
  intervalID = setInterval(function() {
    // console.log('levelNum: ', levelNum)
    // console.log('METER VOLUME: ', meter.volume)
    canvasContext.globalCompositeOperation = "source-over";
    canvasContext.fillStyle = "rgba(0,0,0,0.1)";
    canvasContext.fillRect(0,0,WIDTH, HEIGHT);

    for (var i = 0; i < particleNum; i++) {
      new Particle(); 
    }

    canvasContext.globalCompositeOperation = "color-dodge";
    // console.log('particles: ', particles)
    for (var i in particles) {
      particles[i].draw();
    }
  }, levelNum * 2) // 
}

function destroyNode() {
  meter.shutdown();
  window.cancelAnimationFrame( rafID );
  clearInterval(intervalID)
}