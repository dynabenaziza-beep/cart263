"use strict";


const canvasW= 500;
const canvasH = 500; 

const radiusStep = 15;
const alphaStep = 10;

let counter=0;

const orangeSquare = {
    x: 50, 
    y: 50,
    w: 80,
    h: 80, 
    color:{
         r:255,
        g:150,
        b: 0
    }
};
const hoverBoost = 60;

let radius = 30;
let ellipseAlpha = 40;


function setup() {
    console.log("go")
createCanvas(canvasW, canvasH);
}

function draw() {
 background("black");

 background("black");

  displaySquare();

  // only draw if counter is between 1 and 10
  if (counter >= 1 && counter <= 10) {

    let i = 0;
    let currentRadius = radius;
    let currentAlpha = ellipseAlpha;

    // ONE while loop
    while (i < counter) {
      push();
      fill(255, 255, 255, currentAlpha);
      ellipse(width / 2, height / 2, currentRadius * 2, currentRadius * 2);
      pop();

      currentRadius = currentRadius + radiusStep;
      currentAlpha = currentAlpha + alphaStep;

      i = i + 1;
    }
  }
}
function displaySquare(){
push();
    
if (checkCollisionWithSquare() === true) {
        fill(
            orangeSquare.color.r,
            orangeSquare.color.g + hoverBoost,
            orangeSquare.color.b + hoverBoost
        );

    }else{

    fill(orangeSquare.color.r, orangeSquare.color.g, orangeSquare.color.b);
    }
    rect(orangeSquare.x, orangeSquare.y, orangeSquare.w, orangeSquare.h);
    pop();   

}


function checkCollisionWithSquare(){

const insideX = mouseX >= orangeSquare.x && mouseX <= orangeSquare.x + orangeSquare.w;
    const insideY = mouseY >= orangeSquare.y && mouseY <= orangeSquare.y + orangeSquare.h;

    if (insideX && insideY) {
        return true;
    } else {
        return false;
    }
}

function mousePressed() {
    if (checkCollisionWithSquare() === true) {
        counter = counter + 1;
    }
}