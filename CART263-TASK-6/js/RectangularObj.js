class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.baseWidth = w;
    this.baseHeight = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.context = context;
    this.micLevel = 0;
  }

  display() {
    this.context.fillStyle = this.fill_color;
    this.context.fillRect(this.x, this.y, this.width, this.height);

    this.context.strokeStyle = this.stroke_color;
    this.context.lineWidth = 2;
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.width = this.baseWidth + this.micLevel * 100;
    this.height = this.baseHeight + this.micLevel * 60;
  }
}