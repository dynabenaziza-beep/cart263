class FreeStyleObj {
    constructor(x, y, length, f_color, s_color,context) {
      // Position and size information
      this.x = x;
      this.y = y;
      this.fill_color = f_color;
      this.stroke_color = s_color;
      this.theta = 0;
      this.length = length;
      this.yOffset = 20;
      this.baseYOffset = 20;
      this.angularSpeed = .07;
      this.baseAngularSpeed = .07;
      this.context =context;

      // Animation properties
      this.phase = 0;           // phase offset for wave animation
      this.micLevel = 0;        // microphone volume level (0-1)
      this.hue = 200;           // color hue
      this.amplitude = 5;       // wave amplitude (base)
      this.lineWidthVal = 2;
    }
  
    display() {
      this.theta =0; //reset everytime
      this.context.save();

      // Glow effect from mic
      this.context.shadowColor = this.stroke_color;
      this.context.shadowBlur = this.micLevel * 25;

      this.context.fillStyle = this.fill_color;
      this.context.strokeStyle = this.stroke_color;
      this.context.lineWidth = this.lineWidthVal;
      this.context.beginPath();
      this.context.moveTo(this.x,this.y)
      for(let i =this.x; i< this.x+this.length; i++){
        let wave = Math.sin(this.theta + this.phase) * this.amplitude;
        this.context.lineTo(i, wave + this.y)
        this.context.lineTo(i, wave + this.y + this.yOffset)
        this.theta+=this.angularSpeed;
      }
      this.context.stroke();

      // Draw a mirrored/reflected wave below for visual richness
      this.context.globalAlpha = 0.25;
      this.context.beginPath();
      this.theta = 0;
      this.context.moveTo(this.x, this.y + this.yOffset + 10);
      for(let i = this.x; i < this.x + this.length; i++){
        let wave = Math.sin(this.theta + this.phase + Math.PI) * this.amplitude * 0.6;
        this.context.lineTo(i, wave + this.y + this.yOffset + 10);
        this.theta += this.angularSpeed;
      }
      this.context.stroke();

      this.context.restore();
    }

    update(){
        // Arbitrary animation: move the wave phase -> scrolling wave effect
        this.phase += 0.06;

        // Gentle vertical oscillation
        this.y = 120 + Math.sin(this.phase * 0.5) * 40;

        // MIC EFFECT 1: amplitude scales with mic volume -> wave gets bigger/wilder
        this.amplitude = 5 + this.micLevel * 50;

        // MIC EFFECT 2: yOffset (thickness of ribbon) changes with mic level
        this.yOffset = this.baseYOffset + this.micLevel * 60;

        // MIC EFFECT 3 (bonus): color changes with mic
        this.hue = 200 + this.micLevel * 160;
        this.fill_color = `hsl(${this.hue}, 80%, 60%)`;
        this.stroke_color = `hsl(${(this.hue + 40) % 360}, 90%, 70%)`;

        // Line width grows with mic
        this.lineWidthVal = 2 + this.micLevel * 4;

        // Angular speed increases slightly with mic (wavier pattern)
        this.angularSpeed = this.baseAngularSpeed + this.micLevel * 0.08;
    }
  }
  