"use strict";

const canvasW= 500;
const canvasH = 500; 


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

function setup() {
    console.log("go")
createCanvas(canvasW, canvasH);
}

function draw() {
 background("black");
 displaySquare();

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