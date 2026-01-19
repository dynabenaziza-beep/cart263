"use strict";

const canvasWidth = 500; // constant for canvas 
const canvasHeight = 500;

const textData= { 
 word: "test" ,
 r: 255, // white 
 g: 255, //white 
 b: 255,// white 
 size: 28,
 x: canvasWidth/2 ,
 y: canvasHeight /2


};

function setup() {
    
createCanvas(canvasWidth,canvasHeight);
}

function draw() {
background("black");
fill(textData.r, textData.g, textData.b); // text colour for "text" object 
textSize(text.size); // text size  for "text" object 
textAlign(CENTER , CENTER);
text(text.word, text.x , text.y);

}