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
//find distance between 2 dots 
function getDistance(dot1,dot2){
    const xDistance= dot1.x -dot2.x; //horizental dist between two dot 
    const yDistance = dot1.y-dot2.y; //vertical distance betweem two dot
    // Math.sqrt = square root
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}
//draw line between dots that are close to each other 
function drawLines(){
    for (let i =0; i <dots.length;i++){// loop through every dot in the dots array 
//j start at i + 1 = dont compare same pair twice 
    for (let j=i+1; j< dots.length;j++){

        const dot1 = dots[i]; // get first dot from dots array using index i 
        const dot2 =dots[j]; // second dpt from dots array using index j 

        //caculate distance 
        const distance = getDistance(dot1 , dot2);

        if (distance < 120){ //only connect dots that are close 
            ctx.beginPath();
        }
 }
}
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
function seedLines(){
for (let i = 0; i < 300; i++) {
    addLine();
  }
}
 //generate all starting dots 
seedDots();
seedLines();
animate(); 
