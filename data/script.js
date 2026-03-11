const stage = document.getElementById("stage");

const dots = []; //create an emoty array to store all dots 

const lines = []; // store all line divs here
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
    x: x,   // horizental 
    y: y, //vertical 
    vx: random(-0.6, 0.6),  //h speed 
    vy: random(-0.6, 0.6),  //v speed
    type: type,             //dot type 
    element: dot
  });
}

function seedDots() {

  const rect = stage.getBoundingClientRect(); // get stage size

  for (let i = 0; i < totalDots; i++) {

    const x = random(20, rect.width - 20); // random x position
    const y = random(20, rect.height - 20); // random y position

    addDot(x, y); // create a dot at that position
  }

}


function moveDots (){
  
     dots.forEach(function(dot) {
    dot.x += dot.vx; //
    dot.y += dot.vy; //
  });
    }

    function drawDots() {

  dots.forEach(function(dot) {
    dot.element.style.left = dot.x + "px";
    dot.element.style.top = dot.y + "px";
  });

}
 function animate(){
moveDots();
  drawDots();
  requestAnimationFrame(animate);
 }
 function addLine() {
  const line = document.createElement("div");
  line.className = "line";
  stage.appendChild(line);
  lines.push(line);
}
 //generate all starting dots 
seedDots();
animate(); 
