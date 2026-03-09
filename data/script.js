const stage = document.getElementById("stage");

const dots = []; //create an emoty array to store all dots 
const totalDots = 35;//how many dots 

const typeColors = ["#ffffff", "#9ca3af", "#60a5fa"]; // each dot will random use those colors 

function random(min, max) {
  return Math.random() * (max - min) + min;
}
  function addDot(x, y) {
  const type = Math.floor(Math.random() * 3);

const dot = document.createElement("div"); //
  dot.className = "dot"; // css class dot 
dot.style.background =typeColors [type];

  dot.style.left = x + "px";
  dot.style.top = y + "px";

  stage.appendChild(dot);

  // store all important data for this dot
  dots.push({
    x: x,
    y: y,
    vx: random(-0.6, 0.6),
    vy: random(-0.6, 0.6),
    type: type,
    element: dot
  });
}
// test dot
addDot(200, 200);