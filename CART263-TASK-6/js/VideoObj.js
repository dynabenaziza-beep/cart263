class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY =10;
    this.shapeCol = "#000000";


        this.userProvidedBlur = 0;
    this.userProvidedSepia = 0;
    this.userProvidedHue = 0;
    this.userProvidedInvert = 0;


     let self = this;
 

    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");

    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");

    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");

    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");

    
 filterButton_blur.addEventListener("click", function () {
      self.userProvidedBlur = blurInput.value;
      console.log(self.userProvidedBlur);
    });

    filterButton_brightness.addEventListener("click", function () {
  self.userProvidedBrightness = brightnessInput.value;
  console.log(self.userProvidedBrightness);
});

filterButton_contrast.addEventListener("click", function () {
  self.userProvidedContrast = contrastInput.value;
  console.log(self.userProvidedContrast);
});

filterButton_grayscale.addEventListener("click", function () {
  self.userProvidedGrayscale = grayscaleInput.value;
  console.log(self.userProvidedGrayscale);
});

    }
  



  display() {
    this.context.save();

    this.context.filter = `blur(${this.userProvidedBlur}px) sepia(${this.userProvidedSepia}%) hue-rotate(${this.userProvidedHue}deg) invert(${this.userProvidedInvert}%)`;

    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);

    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50, 50);

    this.context.restore();
  }

  changeColor(newCol) {
    this.shapeCol = newCol;
  }

  updatePositionRect(mx, my) {
    this.shapeX = mx;
    this.shapeY = my;
  }

  update(videoElement) {
    this.videoElement = videoElement;
  }
}