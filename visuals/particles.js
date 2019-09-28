// PARTICLES VISUAL
var rafID, intervalID;
const particles = {}; 

particles.allParticles = {}; 
particles.particleIndex = 0; 
particles.particleNum = 1; 

particles.draw = function(canvas, context, meter) {
  this.stop = false; 

  if ( this.stop ) {
    window.cancelAnimationFrame( rafID );
    clearInterval(this.intervalID)
    return; 
  }

  intervalID = setInterval(function() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    for (var i = 0; i < particles.particleNum; i++) {
      new particles.Particle(); 
    }
  
    context.globalCompositeOperation = "lighter";
    for (var i in particles.allParticles) {
      particles.allParticles[i].draw();
    }
  }, 2000);

  rafID = window.requestAnimationFrame( particles.draw );
}

particles.Particle = function() {
  this.x = canvas.width / 2; 
  this.y = canvas.height /2; 
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

  context.fillStyle = this.color; 
  context.fillRect(this.x, this.y, 5, 5); 
}
