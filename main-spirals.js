let context, rafID
let speedValue, start = 0, total = 270, distance = 5

let current = 1
let spirals = {
  1: spiral1,
  2: spiral2, 
  3: spiral3, 
  4: spiral4,
  5: spiral_custom
}

function getElement(selector) {
  return this.document.querySelector(selector)
}

window.onload = function() {
  const canvas = getElement('#canvas') 
  const speedInput = getElement('#speed-input')
  const startingSlider = getElement('#starting-slider')
  const totalSlider = getElement('#total-slider')
  const distanceSlider = getElement('#distance-slider')
  const sliders = getElement('.custom-sliders')
  const spiralsList = getElement('#spirals-list')
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

  // sliders change handler
  for (let i = 0; i < sliders.children.length; i++) {
    sliders.children[i].oninput = function(e) {
      // e.target.value typeof === string
      console.log('slider e value', e.target.id)

      switch(e.target.id) {
        case 'starting-slider':
          start = parseInt(e.target.value) 
          break
        case 'total-slider':
          total = parseInt(e.target.value) 
          break 
        case 'distance-slider':
          distance = parseInt(e.target.value)
          break
      }
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


