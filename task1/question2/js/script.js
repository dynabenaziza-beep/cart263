"use strict";

function setup() {
    console.log("go")
createCanvas(500,500);

}

function draw() {
 background("black");

drawEllipse(50,50,80,80,0,0,255); 
drawEllipse(120,150,95,95,255,0,0); 
drawEllipse(340,250,30,30,0,255,0); 

}

function drawEllipse(x,y,w,h,r,g,b){

    push();
    fill(r,g,b);
    ellipse(x,y,w,h);
    pop();
}
