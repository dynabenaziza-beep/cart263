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
    
}