class CircularObj {
  constructor(x, y, r, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.baseRadius = r;

    this.fill_color = f_color;
    this.stroke_color = s_color;

    this.context = context;

    this.micLevel = 0;
  }

  display() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    this.context.fillStyle = this.fill_color;
    this.context.fill();

    this.context.strokeStyle = this.stroke_color;
    this.context.lineWidth = 2;
    this.context.stroke();
  }

  update() {
    // change size with microphone
    this.radius = this.baseRadius + this.micLevel * 50;
  }
}
