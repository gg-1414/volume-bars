let canvas, speed, spiralsList, context, rafID

let current = 1
let spirals = {
  1: spiral1,
  2: spiral2, 
  3: spiral3, 
  4: spiral4
}

window.onload = function() {
  canvas = this.document.getElementById('canvas') 
  speed = this.document.getElementById('speed-input')
  spiralsList = this.document.getElementById('spirals-list')

  canvas.width = window.innerWidth 
  canvas.height = window.innerHeight 

  context = canvas.getContext("2d");

  // canvas dimensions resized when window is resized
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })

  // animation changes when user clicks on an option from the spirals list
  spiralsList.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
      spirals[current].stop = true 
      current = e.target.dataset.id 
      console.log('current visual', current)
      drawLoop() 
    }
  })
}

function drawLoop() {
  spirals[current].draw(context)
}
