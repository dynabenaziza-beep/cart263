class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // rectangle on top of video
    this.shapeX = 10;
    this.shapeY = 10;
    this.shapeW = 50;
    this.shapeH = 50;
    this.shapeCol = "#000000";

    // filter values
    this.userProvidedBlur = 0;
    this.userProvidedSepia = 0;
    this.userProvidedHue = 0;
    this.userProvidedInvert = 0;

    let self = this;

    // blur
    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");

    if (filterButton_blur && blurInput) {
      filterButton_blur.addEventListener("click", function () {
        self.userProvidedBlur = Number(blurInput.value);
        console.log("Blur:", self.userProvidedBlur);
      });
    }

    // sepia
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");

    if (filterButton_sepia && sepiaInput) {
      filterButton_sepia.addEventListener("click", function () {
        self.userProvidedSepia = Number(sepiaInput.value);
        console.log("Sepia:", self.userProvidedSepia);
      });
    }

    // hue-rotate
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");

    if (filterButton_hue && hueInput) {
      filterButton_hue.addEventListener("click", function () {
        self.userProvidedHue = Number(hueInput.value);
        console.log("Hue:", self.userProvidedHue);
      });
    }

    // invert
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");

    if (filterButton_invert && invertInput) {
      filterButton_invert.addEventListener("click", function () {
        self.userProvidedInvert = Number(invertInput.value);
        console.log("Invert:", self.userProvidedInvert);
      });
    }
  }

  display() {
    // draw filtered video
    this.context.save();

    this.context.filter =
      `blur(${this.userProvidedBlur}px) ` +
      `sepia(${this.userProvidedSepia}%) ` +
      `hue-rotate(${this.userProvidedHue}deg) ` +
      `invert(${this.userProvidedInvert}%)`;

    this.context.drawImage(
      this.videoElement,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.context.restore();

    // draw rectangle on top, not filtered
    this.context.save();
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, this.shapeW, this.shapeH);
    this.context.restore();
  }

  changeColor(newCol) {
    this.shapeCol = newCol;
  }

  updatePositionRect(mx, my) {
    this.shapeX = mx - this.shapeW / 2;
    this.shapeY = my - this.shapeH / 2;
  }

  update(videoElement) {
    this.videoElement = videoElement;
  }
}