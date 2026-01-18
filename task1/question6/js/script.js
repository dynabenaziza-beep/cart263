"use strict";

const canvasWidth = 500; // constant for canvas 
const canvasHeight = 500;

const text= { 
 word: "test" ,
 r: 255, // white 
 g: 255, //white 
 b: 255,// white 
 size: 28,
 x: Width/2 ,
 y: Height /2


};

function setup() {
    console.log("go")
createCanvas(canvasWidth,canvasHeight);
}

function draw() {
background("black");
fill(text.r, text.g, text.b); // text colour for "text" object 

}