class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;

    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }   

  overCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    console.log(this.mouseOffsetX, this.mouseOffsetY);

    if (this.drawingBoardId === "partA") {
      console.log("in A");
    }

    if (this.drawingBoardId === "partB") {
      console.log("in B");
    }

    if (this.drawingBoardId === "partC") {
      console.log("in C");
    }

    if (this.drawingBoardId === "partD") {
      console.log("in D");
      if (this.objectsOnCanvas.length > 0) {
        this.objectsOnCanvas[0].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
      }
    }
  }

  clickCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    if (this.drawingBoardId === "partA") {
      console.log("in A");

      if (e.shiftKey) {
        if (this.objectsOnCanvas.length > 0) {
          this.objectsOnCanvas.pop();
        }
      } else {
        let circle = {
          context: this.context,
          x: this.mouseOffsetX,
          y: this.mouseOffsetY,
          radius: Math.floor(Math.random() * 20) + 10,
          color:
            "rgb(" +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            ")",
          vx: Math.random() * 4 - 2,
          vy: Math.random() * 4 - 2,

          update: function () {
            this.x = this.x + this.vx;
            this.y = this.y + this.vy;

            if (
              this.x + this.radius > this.context.canvas.width ||
              this.x - this.radius < 0
            ) {
              this.vx = this.vx * -1;
            }

            if (
              this.y + this.radius > this.context.canvas.height ||
              this.y - this.radius < 0
            ) {
              this.vy = this.vy * -1;
            }

            this.vx = this.vx * 0.99;
            this.vy = this.vy * 0.99;
          },

          display: function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.fillStyle = this.color;
            this.context.fill();
          }
        };

        this.addObj(circle);
      }
    }

    if (this.drawingBoardId === "partB") {
      console.log("in B");
    }

    if (this.drawingBoardId === "partC") {
      console.log("in C");
    }

    if (this.drawingBoardId === "partD") {
      if (this.objectsOnCanvas.length > 0) {
        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        this.objectsOnCanvas[0].changeColor(randomColor);
      }
    }
  }

  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }
  }
}
  

