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

filterButton_blur.addEventListener("click", function () {
  self.userProvidedBlur = Number(blurInput.value);
});

let filterButton_sepia = document.getElementById("filter_button_sepia");
let sepiaInput = document.getElementById("sepianum");

filterButton_sepia.addEventListener("click", function () {
  self.userProvidedSepia = Number(sepiaInput.value);
});

let filterButton_hue = document.getElementById("filter_button_hue");
let hueInput = document.getElementById("huenum");

filterButton_hue.addEventListener("click", function () {
  self.userProvidedHue = Number(hueInput.value);
});

let filterButton_invert = document.getElementById("filter_button_invert");
let invertInput = document.getElementById("invertnum");

filterButton_invert.addEventListener("click", function () {
  self.userProvidedInvert = Number(invertInput.value);
});

  



  display() {
  this.context.save();

this.context.filter =
  `blur(${this.userProvidedBlur}px) sepia(${this.userProvidedSepia}%) hue-rotate(${this.userProvidedHue}deg) invert(${this.userProvidedInvert}%)`;

this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);

this.context.restore();

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
}