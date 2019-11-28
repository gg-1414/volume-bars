let canvas, levelInput, visualsList, context, rafID
// let speedValue 

let current = 1
let visuals = {
  1: bars,
  2: particles, 
  3: starwarp, 
}

window.onload = function() {
  canvas = this.document.getElementById('canvas') 
  levelInput = this.document.getElementById('level-input') 
  visualsList = this.document.getElementById('spirals-list')

  canvas.width = window.innerWidth 
  canvas.height = window.innerHeight 

  context = canvas.getContext("2d")

   // canvas dimensions resized when window is resized
   window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  
}