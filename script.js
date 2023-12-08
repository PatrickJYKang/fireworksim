// Firework Simulator Script

// Define canvas and context variables
const canvas = document.getElementById("firework-canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define Firework class
class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.radius = 3;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * -5 - 10
    };
    this.gravity = 0.2;
    this.opacity = 1;
    this.explosionRadius = Math.random() * 5 + 7.5;
    this.isExploded = false;
    this.particles = [];
  }

  // Draw firework
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update firework
  update() {
    this.draw();

    // If firework has not exploded, update its position and velocity
    if (!this.isExploded) {
      this.velocity.y += this.gravity;
      this.y += this.velocity.y;
      this.x += this.velocity.x;

      // If firework reaches top of screen, explode it
      if (this.velocity.y >= 0) {
        this.isExploded = true;
        this.explode();
      }
    }

    // If firework has exploded, update its particles
    else {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
      }

      // Remove particles once they are no longer visible
      this.particles = this.particles.filter(particle => particle.opacity > 0);
    }
  }

  // Explode firework into particles
  explode() {
    for (let i = 0; i < 50; i++) {
      const particle = new Particle(this.x, this.y, this.color, this.explosionRadius);
      this.particles.push(particle);
    }
  }
}

// Define Particle class
class Particle {
  constructor(x, y, color, explosionRadius) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.velocity = {
      x: Math.random() * explosionRadius * 2 - explosionRadius,
      y: Math.random() * explosionRadius * 2 - explosionRadius
    };
    this.gravity = 0.2;
    this.opacity = 1;
  }

  // Draw particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update particle
  update() {
    this.draw();

    // Update particle position and velocity
    this.velocity.y += this.gravity;
    this.y += this.velocity.y;
    this.x += this.velocity.x;

    // Reduce particle opacity over time
    this.opacity -= Math.random()*0.001 + 0.0095;
  }
}

// Create array to hold fireworks
let fireworks = [];
let interval = prompt() * 1000

// Create new firework every 2 seconds
setInterval(() => {
  fireworks.push(new Firework());
}, interval + Math.random()*800 - 400);

// Update canvas every frame
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 15, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
  }

  // Remove fireworks once they have exploded and all particles are no longer visible
  fireworks = fireworks.filter(firework => !firework.isExploded || firework.particles.length > 0);
}

animate();
