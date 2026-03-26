class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.originalRadius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

    // Animation properties
    this.vx = (Math.random() - 0.5) * 3; // velocity x
    this.vy = (Math.random() - 0.5) * 3; // velocity y
    this.pulseAngle = Math.random() * Math.PI * 2; // offset for pulsing
    this.pulseSpeed = 0.04 + Math.random() * 0.03;
    this.hue = Math.random() * 360; // for rainbow color cycling
    this.hueSpeed = 0.5 + Math.random() * 1.5;
    this.mouseX = 0;
    this.mouseY = 0;
    this.opacity = 1;
    this.glowSize = 0;
    this.trail = []; // store last N positions for trail effect
    this.maxTrail = 8;
  }

  display() {
    // Draw trail (fading ghost circles)
    for(let t = 0; t < this.trail.length; t++){
      let age = t / this.trail.length; // 0 = oldest, ~1 = newest
      this.context.save();
      this.context.globalAlpha = age * 0.15;
      this.context.fillStyle = this.fill_color;
      this.context.beginPath();
      this.context.arc(this.trail[t].x, this.trail[t].y, this.radius * (0.5 + age * 0.5), 0, Math.PI * 2, true);
      this.context.fill();
      this.context.restore();
    }

    this.context.save();
    this.context.globalAlpha = this.opacity;

    // Glow effect
    this.context.shadowColor = this.fill_color;
    this.context.shadowBlur = this.glowSize;

    this.context.fillStyle = this.fill_color;
    this.context.strokeStyle = this.stroke_color;
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  }

  update() {
    // Bounce off walls (canvas is 400x300)
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.radius < 0 || this.x + this.radius > 400) {
      this.vx *= -1;
      this.x = Math.max(this.radius, Math.min(400 - this.radius, this.x));
    }
    if (this.y - this.radius < 0 || this.y + this.radius > 300) {
      this.vy *= -1;
      this.y = Math.max(this.radius, Math.min(300 - this.radius, this.y));
    }

    // Pulse the radius (breathing effect)
    this.pulseAngle += this.pulseSpeed;
    this.radius = this.originalRadius + Math.sin(this.pulseAngle) * (this.originalRadius * 0.3);

    // Glow pulses too
    this.glowSize = 8 + Math.sin(this.pulseAngle * 1.5) * 8;

    // Color cycling
    this.hue += this.hueSpeed;
    if (this.hue > 360) this.hue -= 360;
    this.fill_color = `hsl(${this.hue}, 80%, 60%)`;
    this.stroke_color = `hsl(${(this.hue + 60) % 360}, 90%, 75%)`;

    // Attraction toward mouse (gentle pull)
    let dx = this.mouseX - this.x;
    let dy = this.mouseY - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 5) {
      this.vx += (dx / dist) * 0.15;
      this.vy += (dy / dist) * 0.15;
    }

    // Limit speed
    let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    let maxSpeed = 4;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    // Store trail position
    this.trail.push({x: this.x, y: this.y});
    if(this.trail.length > this.maxTrail){
      this.trail.shift();
    }
  }
}
