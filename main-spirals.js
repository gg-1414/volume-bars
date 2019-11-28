let canvas, speedInput, spiralsList, context, rafID
let speedValue 

let current = 1
let spirals = {
  1: spiral1,
  2: spiral2, 
  3: spiral3, 
  4: spiral4
}

window.onload = function() {
  canvas = this.document.getElementById('canvas') 
  speedInput = this.document.getElementById('speed-input')
  spiralsList = this.document.getElementById('spirals-list')
  speedValue = parseFloat(speedInput.value) / 1000

  canvas.width = window.innerWidth 
  canvas.height = window.innerHeight 

  context = canvas.getContext("2d")

  // canvas dimensions resized when window is resized
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // speed input change handler
  speedInput.oninput = function(e) {
    const input = parseFloat(e.target.value)
    console.log('input',input)
    console.log(`input<${speedInput.min} ?`, !!(input < speedInput.min))
    console.log(`input>${speedInput.max} ?`, !!(input > speedInput.max))

    if (input < parseFloat(speedInput.min) || input > parseFloat(speedInput.max)) {
      alert(`Speed must be between ${speedInput.min} - ${speedInput.max}`)
    } else {
      speedValue = input / 1000 
    }
  }

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
  spirals[current].draw()
}


