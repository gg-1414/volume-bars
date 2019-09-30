var canvas = null;
var audioContext = null;
var meter = null;
var canvasContext = null;

var rafID = null;
var intervalID = null;

var level = null; 
var levelNum = 15; 
// 15 default for indoor space playing music from laptop at a low level
// adjust this from input field input#level depending on how loud the environment is

var start = false;
var current = '6'; 

// >> Visuals Key: >> 
var visuals = {
  // '1': bars,
  // '2': particles, 
  '3': spiral1, 
  '4': spiral2, 
  '5': spiral3, 
  '6': spiral4, 
  // '7': starwarp, 
};


window.onload = function() {
  level = this.document.getElementById('level');
  canvas = this.document.getElementById('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvasContext = canvas.getContext("2d");

  // canvas dimensions resized when window is resized
  addEventListener("resize", () => { // window.addEventListener 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // >> Event Listeners >> 
  level.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) { // pressing enter sets levelNum
      levelNum = e.target.value; 
    }
  })

  var visualsList = this.document.getElementById('visuals-list');

  visualsList.addEventListener('click', function(e){
    if (e.target.dataset.id) {
      visuals[current].stop = true;
      current = e.target.dataset.id;
      console.log('current', current);
      drawLoop();
    }
  })

  this.document.getElementById('stop').addEventListener('click', () => {
    destroyMeter();
    visuals[current].stop = true;
  })

  // << << << << << << << << << << 

  this.document.getElementById('start').addEventListener('click', () => {
    start = true; 
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
  drawLoop();
  // visuals[current].drawLoop();
  // spiral1.draw()
}

function drawLoop() {
  // drawBars()
  // spiral1.draw()
  // rafID = visuals[current] 
  // console.log(visuals[current].draw)
  // console.log(current)
  // console.log(visuals[current])
  // console.log(rafID);
  visuals[current].draw(canvas, canvasContext, meter);
  // starwarp();
  // rafID = window.requestAnimationFrame( drawLoop );
}


// >> >> >> >> >> VISUALS >> >> >> >> >> >>
// >> >> >> >> >> VISUALS >> >> >> >> >> >>
// >> >> >> >> >> VISUALS >> >> >> >> >> >>


// KILL SESSION
function destroyMeter() {
  meter.shutdown();
}

function clearAnimation() {
  console.log('interval', intervalID)
  console.log('rafID', rafID)
  window.cancelAnimationFrame( rafID );
  clearInterval(intervalID);
}