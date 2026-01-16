"use strict";

function setup() {
    console.log("go")
createCanvas (500,500)
    


}

function draw() {
background("black");

push();
fill("white");
ellipse(50, 50,80,80);
pop();

push();
fill("green");
ellipse(100, 150,130, 130);
pop();

push();
fill("red");
ellipse(300,300,240,240);
pop();

} 