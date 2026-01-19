"use strict";
 const canvasW = 500;
const canvasH = 500;

let shapeSize = 40; 

// 1 color for all shapes 
let shapeR;
let shapeG;
let shapeB;

// true = cicles , false = squares 
let drawCircle = true;

function setup() {
    console.log("go")
createCanvas(500,500);

randomizeColor(); // pick color on refresh
}

function draw() {
background("black");

for (let y = shapeSize / 2; y <= height - shapeSize / 2; y += shapeSize) {
    for (let x = shapeSize / 2; x <= width - shapeSize / 2; x += shapeSize) {


push();
  fill(shapeR, shapeG, shapeB);
  ellipse(width / 2, height / 2, shapeSize, shapeSize);
  pop();
  
}
}
}

function randomizeColor(){
shapeR = floor(random(256));
    shapeG = floor(random(256));
    shapeB = floor(random(256));
}

function keyPressed() {
  if (key === " ") {
    randomizeColor();
  }
}

function mousePressed() {
  drawCircle = !drawCircle;
}
