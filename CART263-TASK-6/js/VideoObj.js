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
 

    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
    this.userProvidedBlur  = 0;
    this.userProvidedBrightness = 100;
this.userProvidedContrast = 100;
this.userProvidedGrayscale = 0;
    let self = this;

    let filterButton_brightness = document.getElementById("filter_button_brightness");
let brightnessInput = document.getElementById("brightnessnum");

let filterButton_contrast = document.getElementById("filter_button_contrast");
let contrastInput = document.getElementById("contrastnum");

let filterButton_grayscale = document.getElementById("filter_button_grayscale");
let grayscaleInput = document.getElementById("grayscalenum");

    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = blurInput.value;
      console.log(self.userProvidedBlur);

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
  
  
  display() {
    this.context.save();
     this.context.filter = `blur(${this.userProvidedBlur}px)`;
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50,50)
    this.context.restore();
  }

    //called when rectangle color is to be updated
  changeColor(newCol){
   this.shapeCol = newCol;
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx,my){
     this.shapeX = mx;
  this.shapeY = my;
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }

    }