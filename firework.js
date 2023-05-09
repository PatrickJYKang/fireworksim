// Firework class
// Firework class
class Firework {
    constructor() {
      this.gravity = 0.2;
      this.opacity = 1;
      this.explosionRadius = 1
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
        if (this.velocity.y >= 30) {
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
 } // <-- remove this curly brace
  
  // Particle class
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
      ctx.fillstyle = this.color;
      ctx.fill();
    }
  }
  
  // Initialize canvas and fireworks
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const fireworks = [];
  const gravity = 0.2;
   
constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.radius = 3;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * -15
    };
}