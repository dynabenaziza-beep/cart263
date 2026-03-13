const stage = document.getElementById("stage");
const profile = document.getElementById("profile"); // profile circle
message = document.getElementById("message"); // text message on screen


let profileCreated = false; // make profile only one time

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

function groupSimilarDots(){
 for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
        
        const dot1 = dots[i];
        const dot2 = dots[j];

        const distance = getDistance(dot1, dot2);//measure distance 
       // only group dots of the same type

      // only group dots of the same type
      if (dot1.type === dot2.type) {  
 
        // only group if they are close enough
        if (distance < 150) {
          const dx = dot2.x - dot1.x;
          const dy = dot2.y - dot1.y;

        dot1.x += dx * 0.002; //first dot
          dot1.y += dy * 0.002;

          dot2.x -= dx * 0.002;  //second dot 
          dot2.y -= dy * 0.002;
    }
}
  }  
}
}
//draw line between dots that are close to each other 
function drawLines(){
    let lineIndex=0;
    for (let i =0; i <dots.length;i++){// loop through every dot in the dots array 
//j start at i + 1 = dont compare same pair twice 
    for (let j=i+1; j< dots.length;j++){

        const dot1 = dots[i]; // get first dot from dots array using index i 
        const dot2 =dots[j]; // second dpt from dots array using index j 

        //caculate distance 
        const distance = getDistance(dot1 , dot2);
        // check if the dots are the same type

       
   if (dot1.type === dot2.type) {

        if (distance < 120 && lineIndex < lines.length){ //only connect  dots that are close 
           const line = lines[lineIndex]; // get line element when two dots are close 

             const dx = dot2.x - dot1.x;
                const dy = dot2.y - dot1.y;
const angle = Math.atan2(dy, dx) * 180 / Math.PI

  line.style.width = distance + "px";
  line.style.left = dot1.x + 5 + "px";
  line.style.top = dot1.y + 5 + "px";
  line.style.background = typeColors[dot1.type];
  line.style.transform = "rotate(" + angle + "deg)";
  line.style.display = "block";

  lineIndex++;
           }
        }
    }
}
    while (lineIndex < lines.length) {
    lines[lineIndex].style.display = "none";
    lineIndex++;
  }
}
 function animate(){
moveDots();
groupSimilarDots();
  drawDots();
  drawLines();//update connection 
  checkprofile(); //check profile every frame 

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
//listen for click inside stage 
stage.addEventListener("click", function(event){
//  clicks inside the stage(position and size )
const rect = stage.getBoundingClientRect();

     const x = event.clientX - rect.left; //get click x position 
      const y = event.clientY - rect.top;// get  y position 
      addDot(x, y);
});

function checkprofile(){
let whiteCount = 0;
let grayCount = 0;
let blueCount = 0;
 
dots.forEach(function(dot) { //go through each dot in array 
if (dot.type === 0) whiteCount++;  //if dot white = add 1 to whitecount 
if (dot.type === 1) grayCount++;   //if dot gray= add 1 to whitecount
if (dot.type === 2) blueCount++;    //if dot blue= add 1 to whitecount

});

if (profileCreated === false) {

    if (whiteCount > 10 || grayCount > 10 || blueCount > 10) { 
        profile.style.opacity = 1; //check if any color has more then 10 dots 

}
}

}
 //generate all starting dots 
seedDots();
seedLines();
animate(); 
checkprofile();


