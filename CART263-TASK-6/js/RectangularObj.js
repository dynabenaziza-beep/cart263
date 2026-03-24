class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

     // microphone value
  this.mic = 0;

  // keep original size
  this.baseWidth = w;
  this.baseHeight = h;

  // small animation
  this.angle = 0;

  }

  display() {
    
    this.context.save();

// move to center
this.context.translate(this.x + this.width/2, this.y + this.height/2);

// rotate
this.context.rotate(this.angle);

// draw rectangle
this.context.fillStyle = this.fill_color;
this.context.fillRect(-this.width/2, -this.height/2, this.width, this.height);

this.context.strokeStyle = this.stroke_color;
this.context.lineWidth = 2;
this.context.strokeRect(-this.width/2, -this.height/2, this.width, this.height);

this.context.restore()
  }
  update(){
 // change size with microphone
this.width = this.baseWidth + this.mic * 200;
this.height = this.baseHeight + this.mic * 120;

// small animation
this.angle += 0.01; 
}
}
