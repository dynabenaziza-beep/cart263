class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY = 10;
    this.shapeCol = "#000000";

    // ---- FILTER VALUES ----
    this.userProvidedBlur = 0;
    this.userProvidedSepia = 0;
    this.userProvidedHue = 0;
    this.userProvidedInvert = 0;
    this.pulseAngle = 0; // for pulsing the overlay rect

    let self = this;

    // ---- BLUR FILTER ----
    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");

    filterButton_blur.addEventListener("click", function () {
      self.userProvidedBlur = blurInput.value;
      console.log("Blur set to:", self.userProvidedBlur);
    });

    // ---- SEPIA FILTER ----
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");

    filterButton_sepia.addEventListener("click", function () {
      self.userProvidedSepia = sepiaInput.value;
      console.log("Sepia set to:", self.userProvidedSepia);
    });

    // ---- HUE-ROTATE FILTER ----
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");

    filterButton_hue.addEventListener("click", function () {
      self.userProvidedHue = hueInput.value;
      console.log("Hue-rotate set to:", self.userProvidedHue);
    });

    // ---- INVERT FILTER ----
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");

    filterButton_invert.addEventListener("click", function () {
      self.userProvidedInvert = invertInput.value;
      console.log("Invert set to:", self.userProvidedInvert);
    });
  }

  display() {
    this.context.save();

    // Apply ALL filters combined to the context
    this.context.filter = `blur(${this.userProvidedBlur}px) sepia(${this.userProvidedSepia}%) hue-rotate(${this.userProvidedHue}deg) invert(${this.userProvidedInvert}%)`;

    // Draw the video frame
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);

    // Reset filter for the rectangle overlay so it's not affected
    this.context.restore();

    // Draw rectangle overlay (not filtered)
    this.context.save();
    this.context.fillStyle = this.shapeCol;
    // Pulsing opacity for visual flair
    let pulse = 0.45 + Math.sin(this.pulseAngle) * 0.2;
    this.context.globalAlpha = pulse;
    this.context.shadowColor = this.shapeCol;
    this.context.shadowBlur = 12 + Math.sin(this.pulseAngle * 2) * 6;
    this.context.fillRect(this.shapeX, this.shapeY, 50, 50);
    // Animated dashed border
    this.context.globalAlpha = 0.9;
    this.context.strokeStyle = "#ffffff";
    this.context.lineWidth = 2;
    this.context.setLineDash([4 + Math.sin(this.pulseAngle) * 3, 4]);
    this.context.lineDashOffset = this.pulseAngle * 10;
    this.context.strokeRect(this.shapeX, this.shapeY, 50, 50);
    this.context.setLineDash([]);
    this.context.restore();

    // Draw filter info text
    this.context.save();
    this.context.fillStyle = "rgba(255,255,255,0.5)";
    this.context.font = "10px sans-serif";
    this.context.fillText(
      `blur:${this.userProvidedBlur} sepia:${this.userProvidedSepia} hue:${this.userProvidedHue} inv:${this.userProvidedInvert}`,
      8, 292
    );
    this.context.restore();
  }

  // Called when rectangle color is to be updated
  changeColor(newCol) {
    this.shapeCol = newCol;
  }

  // Called when rectangle position is to be updated
  updatePositionRect(mx, my) {
    // Center the rectangle on the mouse position
    this.shapeX = mx - 25;
    this.shapeY = my - 25;
  }

  update(videoElement) {
    this.videoElement = videoElement;
    this.pulseAngle += 0.05; // advance pulsing animation
  }
}