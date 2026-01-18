"use strict";
let xMouse = undefined ;
let yMouse =  undefined ;

let xSpace= undefined ;
let ySpace = undefined ; 

let yThree = 0;
let yVelocity = 2;

function setup() {
    console.log("go")
createCanvas(500,500);

}

function draw() {
background("black");

console.log (bounceCheker())
drawSquare(0,yThree+=yVelocity,30,0,255,0);
drawSquare(xMouse,yMouse,80,0,0,255);
drawSquare(xSpace,ySpace,80,255,0,255);

}

function drawSquare( x,y,w,r,g,b){
push();
fill(r,g,b); 
square(x,y,w);
pop();

}
function keyPressed(event){

    if (event.keyCode=== 32){
    xSpace=random(0,400) 
    ySpace=random(0,400)

    console.log("hello");
 }
console.log(event.KeyCode);
}

function mouseClicked (){

    xMouse = mouseX;
    yMouse = mouseY;
}
function bounceCheker(){

    if (yThree >= 500){
        yVelocity =-2;
    }
else if (yThree <=0){

    yVelocity = 2;
}
return yThree;

}