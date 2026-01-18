"use strict";


let rectW; // rectangle width 
let rectH; // rectangle heigth  

function setup() {
    console.log("go")
    createCanvas(500,500)

rectW = width /3 ; 
rectH = height; 

}

function draw() {
 background(0);

 //rectangle 1 
 if (mouseX < rectW){
 fill (255);
 } else {
    fill(0,0,255);

 }
rect(0,0,rectW, rectH);
 
}

