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


//rectangle 2 
if (mouseX > rectW && mouseX < rectW *2){
fill( 255);
} else {
    fill(0,100,255);
}
rect(rectW, 0, rectW, rectH);

//rectangle 3 

if (mouseX > rectW *2 ){
    fill (255);

} else {
   fill(0,200,255);   
}
rect(rectW * 2,0, rectW, rectH);
}
