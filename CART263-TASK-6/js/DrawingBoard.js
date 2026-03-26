class DrawingBoard {
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    this.drawingBoardId = drawingBoardId;

    let self = this;

    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    this.canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  }

  addObj(obj) {
    this.objectsOnCanvas.push(obj);
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

  run(videoEl) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoEl);
      this.objectsOnCanvas[i].display();
    }
  }

  overCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    // video rectangle follows mouse
    if (this.drawingBoardId === "partD") {
      this.objectsOnCanvas[0].updatePositionRect(
        this.mouseOffsetX,
        this.mouseOffsetY
      );
    }

    // circle mouse attraction for partA if needed
    if (this.drawingBoardId === "partA") {
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].mouseX = this.mouseOffsetX;
        this.objectsOnCanvas[i].mouseY = this.mouseOffsetY;
      }
    }
  }

  clickCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    // rectangle changes color on click for video board
    if (this.drawingBoardId === "partD") {
      let randomColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
      this.objectsOnCanvas[0].changeColor(randomColor);
    }

    // add circles on partA if needed
    if (this.drawingBoardId === "partA") {
      let randomRadius = 10 + Math.random() * 20;
      let randomFill = `hsl(${Math.random() * 360}, 80%, 60%)`;
      let randomStroke = `hsl(${Math.random() * 360}, 80%, 80%)`;

      this.addObj(
        new CircularObj(
          this.mouseOffsetX,
          this.mouseOffsetY,
          randomRadius,
          randomFill,
          randomStroke,
          this.context
        )
      );
    }
  }
}

