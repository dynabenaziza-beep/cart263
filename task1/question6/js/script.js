"use strict";

const canvasW = 500; // constant for canvas 
const canvasH = 500;



const textData= { 
 word: "test" ,
 r: 255, // white 
 g: 255, //white 
 b: 255,// white 
 size: 28,
 x: canvasW/2 ,
 y: canvasH /2
};
const startX = 50 ;
const startY = 50; 

const verticalStart = 15 ; 
const verticalEnd =1;

const spacing = 28; 

function setup() {
    
createCanvas(canvasW,canvasH);
}

function draw() {
background("black");

// draw centered word 
fill(textData.r, textData.g, textData.b); // text colour for "text" object 
textSize(textData.size); // text size  for "text" object 
textAlign(CENTER , CENTER);
text(textData.word, textData.x , textData.y);

// draw series num  horizental 
for (let i = 0; i <= 9; i++){

  const xPos = startX + i * spacing;
    const yPos = startY;  

 text(i, xPos, yPos);
  }

  //draw series num vertical 
for (let i=verticalStart ; i>= verticalEnd; i--){
 
    const xPos = startX;
    const yPos = startY + i * spacing;

 text(i, xPos, yPos);
}


}