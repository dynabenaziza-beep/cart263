class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.baseWidth = w;
    this.baseHeight = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

    // Animation properties
    this.angle = 0;            // for oscillation
    this.rotAngle = 0;         // for rotation animation
    this.micLevel = 0;         // microphone volume level (0-1)
    this.hue = 0;              // color cycling
    this.cornerRadius = 0;     // rounded corners based on mic
    this.wobble = 0;
  }

  display() {
    this.context.save();

    // Translate to center of rect for rotation
    let cx = this.x + this.width / 2;
    let cy = this.y + this.height / 2;
    this.context.translate(cx, cy);
    this.context.rotate(this.rotAngle);

    // Glow based on mic level
    this.context.shadowColor = this.fill_color;
    this.context.shadowBlur = this.micLevel * 30;

    //  when mic is loud (creative visual)
    if(this.micLevel > 0.05){
      this.context.globalAlpha = this.micLevel * 0.3;
      this.context.strokeStyle = this.stroke_color;
      this.context.lineWidth = 1;
      this.context.strokeRect(
        -this.width / 2 - 10 - this.micLevel * 20, 
        -this.height / 2 - 10 - this.micLevel * 20, 
        this.width + 20 + this.micLevel * 40, 
        this.height + 20 + this.micLevel * 40
      );
      this.context.globalAlpha = 1;
    }

    this.context.fillStyle = this.fill_color;
    this.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.context.strokeStyle = this.stroke_color;
    this.context.lineWidth = 2 + this.micLevel * 6;
    this.context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Inner decorative rect
    this.context.globalAlpha = 0.3 + this.micLevel * 0.5;
    this.context.strokeStyle = "#ffffff";
    this.context.lineWidth = 1;
    let inset = 8;
    this.context.strokeRect(-this.width / 2 + inset, -this.height / 2 + inset, this.width - inset * 2, this.height - inset * 2);

    this.context.restore();
  }

  update() {
    // Arbitrary animation: oscillate position
    this.angle += 0.03;
    this.x = 150 + Math.sin(this.angle) * 80;
    this.y = 100 + Math.cos(this.angle * 0.7) * 60;

    // Slow rotation
    this.rotAngle += 0.015;

    // MIC EFFECT 1: width and height scale with mic volume
    this.width = this.baseWidth + this.micLevel * 120;
    this.height = this.baseHeight + this.micLevel * 80;

    // MIC EFFECT 2: color changes with mic level (hue shift)
    this.hue = this.micLevel * 360;
    this.fill_color = `hsl(${this.hue}, 80%, ${40 + this.micLevel * 30}%)`;
    this.stroke_color = `hsl(${(this.hue + 120) % 360}, 90%, 70%)`;
  }
}