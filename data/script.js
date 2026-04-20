console.log(window.THREE);

let secondPageActive = false;

const transitionNumbers = document.getElementById("transition-numbers");
const transitionNumberItems = [];
const transitionData = ["0421", "1874", "5532", "9011", "2345", "6789"];


const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const startBg = document.getElementById("start-bg");

let experienceStarted = false;
let startScene;
let startCamera;
let startRenderer;
let startSpheres = [];


let identityStage = 0;
let sessionStartTime = 0;
let sessionDuration = 0;
let profileActive = false;
let lastProfileLevel = 0;
let capturedGroups = [];

const transitionScreen = document.getElementById("transition-screen");
const transitionText = document.getElementById("transition-text");
const transitionCopy = document.getElementById("transition-copy");

const stage = document.getElementById("stage");
const message = document.getElementById("message");
const threeContainer = document.getElementById("three-container");

const archiveScreen = document.getElementById("archive-screen");
const archiveUsers = document.getElementById("archive-users");
const archiveDots = document.getElementById("archive-dots");
const archiveCluster = document.getElementById("archive-cluster");
const archiveDuration = document.getElementById("archive-duration");

const archiveField = document.getElementById("archive-field");
const archivePanel = document.getElementById("archive-panel");
const panelId = document.getElementById("panel-id");
const panelName = document.getElementById("panel-name");
const panelCountry = document.getElementById("panel-country");
const panelStatus = document.getElementById("panel-status");
const panelCluster = document.getElementById("panel-cluster");

const archiveNumbers =[];

const archiveData = [
  { id: "0421", name: "Lina", country: "Algeria", status: "Archived", cluster: "03" },
  { id: "1874", name: "Noah", country: "Canada", status: "Stored", cluster: "02" },
  { id: "5532", name: "Maya", country: "France", status: "Archived", cluster: "04" },
  { id: "9011", name: "Adam", country: "Morocco", status: "Stored", cluster: "01" },
  { id: "2345", name: "Sofia", country: "Spain", status: "Archived", cluster: "03" },
  { id: "6789", name: "Elias", country: "Lebanon", status: "Stored", cluster: "05" },
  { id: "1212", name: "Nora", country: "Tunisia", status: "Archived", cluster: "02" },
  { id: "3456", name: "Leo", country: "Italy", status: "Stored", cluster: "04" },
  { id: "9101", name: "Yara", country: "Egypt", status: "Archived", cluster: "01" },
  { id: "5623", name: "Amine", country: "Algeria", status: "Stored", cluster: "03" },
  { id: "7714", name: "Ines", country: "Belgium", status: "Archived", cluster: "05" },
  { id: "8842", name: "Mila", country: "Serbia", status: "Stored", cluster: "02" },
  { id: "3008", name: "Zayn", country: "Jordan", status: "Archived", cluster: "04" },
  { id: "1490", name: "Sara", country: "Turkey", status: "Stored", cluster: "03" },
  { id: "6602", name: "Aya", country: "Japan", status: "Archived", cluster: "01" }
];

const expandedArchiveData = [];

for (let i = 0; i < 10; i++) {
  archiveData.forEach(function(entry, index) {
    expandedArchiveData.push({
      id: String(1000 + i * 100 + index),
      name: entry.name,
      country: entry.country,
      status: entry.status,
      cluster: entry.cluster
    });
  });
}

// three.js variables
let scene;
let camera;
let renderer;
let userSphere;

const dots = [];
const lines = [];
const totalDots = 35;
const typeColors = ["#000000", "#888888","#dddddd" ];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function addDot(x, y) {
  const type = Math.floor(Math.random() * 3);

  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.background = typeColors[type];
  dot.style.left = x + "px";
  dot.style.top = y + "px";

  stage.appendChild(dot);

  dots.push({
    x: x,
    y: y,
    vx: random(-0.6, 0.6),
    vy: random(-0.6, 0.6),
    type: type,
    element: dot
  });
}

function seedDots() {
  const rect = stage.getBoundingClientRect();

  for (let i = 0; i < totalDots; i++) {
    const x = random(20, rect.width - 20);
    const y = random(20, rect.height - 20);
    addDot(x, y);
  }
}

function moveDots() {
  dots.forEach(function (dot) {
    dot.x += dot.vx;
    dot.y += dot.vy;

    if (dot.x < 0 || dot.x > window.innerWidth - 10) {
      dot.vx *= -1;
    }

    if (dot.y < 0 || dot.y > window.innerHeight - 10) {
      dot.vy *= -1;
    }
  });
}

function drawDots() {
  dots.forEach(function (dot) {
    dot.element.style.left = dot.x + "px";
    dot.element.style.top = dot.y + "px";
  });
}

function getDistance(dot1, dot2) {
  const xDistance = dot1.x - dot2.x;
  const yDistance = dot1.y - dot2.y;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function getMaxConnectedCount() {
  let maxCount = 0;

  for (let i = 0; i < dots.length; i++) {
    let connectedCount = 1;

    for (let j = 0; j < dots.length; j++) {
      if (i !== j) {
        const dot1 = dots[i];
        const dot2 = dots[j];
        const distance = getDistance(dot1, dot2);

        if (dot1.type === dot2.type && distance < 120) {
          connectedCount++;
        }
      }
    }

    if (connectedCount > maxCount) {
      maxCount = connectedCount;
    }
  }

  return maxCount;
}

function groupSimilarDots() {
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dot1 = dots[i];
      const dot2 = dots[j];
      const distance = getDistance(dot1, dot2);

      if (dot1.type === dot2.type && distance < 150) {
        const dx = dot2.x - dot1.x;
        const dy = dot2.y - dot1.y;

        dot1.x += dx * 0.002;
        dot1.y += dy * 0.002;

        dot2.x -= dx * 0.002;
        dot2.y -= dy * 0.002;
      }
    }
  }
}

function addLine() {
  const line = document.createElement("div");
  line.className = "line";
  stage.appendChild(line);
  lines.push(line);
}

function seedLines() {
  for (let i = 0; i < 300; i++) {
    addLine();
  }
}

function drawLines() {
  let lineIndex = 0;

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dot1 = dots[i];
      const dot2 = dots[j];
      const distance = getDistance(dot1, dot2);

      if (dot1.type === dot2.type) {
        if (distance < 120 && lineIndex < lines.length) {
          const line = lines[lineIndex];

          const dx = dot2.x - dot1.x;
          const dy = dot2.y - dot1.y;
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;

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

stage.addEventListener("click", function (event) {
   if (!experienceStarted) return;
  if (archiveScreen.classList.contains("show")) return;
  if (secondPageActive) return;

  const rect = stage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  addDot(x, y);
});

function showNewProfile() {
  if (profileActive) return;

  profileActive = true;
  identityStage++;

  if (userSphere) {
    userSphere.visible = true;

    let scaleValue = 1 + identityStage * 0.35;
    

if (scaleValue > 2) {
  scaleValue = 2;
}
userSphere.scale.set(scaleValue, scaleValue, scaleValue);
   
  }

  message.textContent = "New identity added";
  message.style.opacity = 1;

  if (identityStage >= 3) {
    showTransition();
    }
  

  setTimeout(function () {
    message.style.opacity = 0;
    profileActive = false;
  }, 800);
}

function checkProfile() {
  const maxConnected = getMaxConnectedCount();
  const currentLevel = Math.floor(maxConnected / 10);


if (currentLevel > lastProfileLevel) {
  const group = getConnectedGroup();

  if (group && capturedGroups.length < 3) {
  const savedGroup = [];

  for (let i = 0; i < group.length; i++) {
    savedGroup.push({
      x: group[i].x,
      y: group[i].y,
      type: group[i].type
    });
  }

  capturedGroups.push(savedGroup);
}
  showNewProfile();
  lastProfileLevel = currentLevel;
}

  if (maxConnected < 10) {
    lastProfileLevel = 0;
  }
}
function getConnectedGroup(){
for (let i = 0; i < dots.length; i++) {
    const group = [dots[i]];

    for (let j = 0; j < dots.length; j++) {
      if (i !== j) {
        const dot1 = dots[i];
        const dot2 = dots[j];
        const distance = getDistance(dot1, dot2);

        if (dot1.type === dot2.type && distance < 120) {
          group.push(dot2);
        }
      }
    }

    if (group.length >= 3) {
      return group;
    }
  }

  return null;
}


function animate() {
  moveDots();
  groupSimilarDots();
  drawDots();
  drawLines();
  checkProfile();

  if (archiveScreen.classList.contains("show")) {
  animateArchiveNumbers();
  }
    requestAnimationFrame(animate);
}

function setupThreeScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(240, 240);
  threeContainer.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1.05, 25, 25);
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
  });

  userSphere = new THREE.Mesh(geometry, material);
  scene.add(userSphere);
  userSphere.visible = false;
}

function animateThreeScene() {
  requestAnimationFrame(animateThreeScene);

  if (userSphere) {
    userSphere.rotation.x += 0.01;
    userSphere.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

function formatSessionTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return paddedMinutes + ":" + paddedSeconds;
}

function showArchive() {
  sessionDuration = Date.now() - sessionStartTime;

  archiveUsers.textContent = identityStage;
  archiveDots.textContent = dots.length;
  archiveCluster.textContent = getMaxConnectedCount();
  archiveDuration.textContent = formatSessionTime(sessionDuration);

  archiveScreen.classList.add("show");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    location.reload();
  }
});

function showTransition() {
  secondPageActive = true;
  transitionCopy.innerHTML = "";
    for (let g = 0; g < capturedGroups.length; g++) {
  const group = capturedGroups[g];

  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      const dot1 = group[i];
      const dot2 = group[j]; 
 const distance = getDistance(dot1, dot2);


      if (dot1.type === dot2.type && distance < 120) {
        const line = document.createElement("div");
        line.className = "transition-line";

        const dx = dot2.x - dot1.x;
        const dy = dot2.y - dot1.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        line.style.width = distance + "px";
        line.style.left = dot1.x + 10 + "px";
        line.style.top = dot1.y + 10 + "px";
        line.style.background = typeColors[dot1.type];
        line.style.transform = "rotate(" + angle + "deg)";

        transitionCopy.appendChild(line);
      }
    }
  }


  for (let i = 0; i < group.length; i++) {
  const dot = group[i];

    const newDot = document.createElement("div");
    newDot.className = "transition-dot";
    newDot.style.left = dot.x + "px";
    newDot.style.top = dot.y + "px";
    newDot.style.background = typeColors[dot.type];

    transitionCopy.appendChild(newDot);
  }
  let centerX = 0;
let centerY = 0;

for (let i = 0; i < group.length; i++) {
  centerX += group[i].x;
  centerY += group[i].y;
}

centerX = centerX / group.length;
centerY = centerY / group.length;

const label = document.createElement("div");
label.className = "transition-number";
label.textContent = transitionData[g];

label.style.left = centerX + "px";
label.style.top = (centerY - 30) + "px";

transitionCopy.appendChild(label);
}

 
transitionScreen.classList.add("show");

  transitionText.style.opacity = 1;
  transitionText.textContent = "data gathered";

 setTimeout(function () {
  
    transitionText.textContent = "entered the loop";
  }, 800); 

    setTimeout(function () {
       secondPageActive = false;

    transitionScreen.classList.remove("show");
  
   transitionText.style.opacity =0;
    showArchive();
  }, 5000);
}

function createArchiveNumbers(){
for (let i = 0; i < expandedArchiveData.length; i++) {
  const entry = expandedArchiveData[i];

    const number = document.createElement("div");
    number.className = "archive-number";
    number.textContent = entry.id;

    archiveField.appendChild(number);

    archiveNumbers.push({
      element: number,
      data: entry,
      x: 0,
      y: 0,
    baseX: 0,
    baseY: 0,
    offset: 0
    });


    number.addEventListener("click", function () {
      showArchiveEntry(entry);
    });
  }
}
 
function showArchiveEntry(entry){
  panelId.textContent = entry.id;
   panelName.textContent = entry.name
   panelCountry.textContent = entry.country;
  panelStatus.textContent = entry.status;
    panelCluster.textContent = entry.cluster;

    archivePanel.style.left = "30px";
  archivePanel.style.top = "30px";

   archivePanel.classList.add("show");  

}
function layoutArchiveNumbers(){
  const centerX = 210;
const centerY = 350;
  const radius = 150;

   archiveNumbers.forEach(function (item, index) {
    const angle = (Math.PI * 2 / archiveNumbers.length) * index;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    item.baseX =x;
    item.baseY = y;
     item.offset= Math.random()*1000;

    item.element.style.left = x + "px";
    item.element.style.top = y + "px";
    
  });
}

function animateArchiveNumbers(){
archiveNumbers.forEach(function(item, index) {
  const time = Date.now()*0.001;
  const speed = 0.4 + (index % 5) * 0.08;
  const amountX = 0.3 + (index % 4) * 0.2;
const amountY = 0.2 + (index % 3) * 0.15;
  
  const moveX = Math.sin(time + item.offset) * 2;
  const moveY = Math.cos(time + item.offset) * 1.5;

  item.element.style.left = item.baseX + moveX + "px";
  item.element.style.top = item.baseY + moveY+ "px";

});
}


function createTransitionNumbers(){

  for (let i = 0; i < transitionData.length; i++) {
    const number = document.createElement("div");
    number.className = "transition-number";
    number.textContent = transitionData[i];

    transitionNumbers.appendChild(number);

    transitionNumberItems.push({
      element: number,
      angle: (Math.PI * 2 / transitionData.length) * i,
      radius: 30 + Math.random() * 25
    });
  }

}

function animateTransitionNumbers(){
const time = Date.now() * 0.001;

  transitionNumberItems.forEach(function(item) {
    const x = 110 + Math.cos(time + item.angle) * item.radius;
    const y = 110 + Math.sin(time + item.angle) * item.radius;

    item.element.style.left = x + "px";
    item.element.style.top = y + "px";
  });
}
 function createStartBackground(){
  const colors = [
  "#ff4d4d",
  "#ffcc33",
  "#33cc66",
  "#33cfff",
  "#9966cc",
  "#ff66b3"
];

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
for (let i = 0; i < 18; i++) {

const angle = Math.random() * Math.PI * 2;
const radius = 80 + Math.random() * 260;

const x = centerX + Math.cos(angle) * radius;
const y = centerY + Math.sin(angle) * radius;
const size = 8 + Math.random() * 45;

 const line = document.createElement("div");
    line.className = "start-line";


const dx = centerX - x;
const dy = centerY - y;
const distance = Math.sqrt(dx * dx + dy * dy);
const rotate = Math.atan2(dy, dx) * 180 / Math.PI;

line.style.width = distance + "px";
line.style.left = x + size / 2 + "px";
line.style.top = y + size / 2 + "px";
line.style.transform = "rotate(" + rotate + "deg)";


startBg.appendChild(line);

    const dot = document.createElement("div");
    dot.className = "start-node";
    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];

    startBg.appendChild(dot);
  }
 }

startButton.addEventListener("click", function () {
  startScreen.classList.add("hide");
  experienceStarted = true;
  sessionStartTime = Date.now();
});

function setupStartThree(){
 const container = document.getElementById("start-three");

startScene = new THREE.Scene(); 

startCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
startCamera.position.z = 4;

startRenderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

startRenderer.setSize(220, 220);
container.appendChild(startRenderer.domElement);

const geometry = new THREE.SphereGeometry(0.15, 10, 10);

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

for (let i = 0; i < 12; i++) {
  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.x = (Math.random() - 0.5) * 2;
  sphere.position.y = (Math.random() - 0.5) * 2;
  sphere.position.z = (Math.random() - 0.5) * 2;

  sphere.scale.setScalar(0.6 + Math.random());

  startScene.add(sphere);
  startSpheres.push(sphere);
}
}
 function animateStartThree() {
requestAnimationFrame(animateStartThree);


for (let i = 0; i < startSpheres.length; i++) {
  const s = startSpheres[i];
  
s.rotation.x += 0.01;
s.rotation.y += 0.01;

s.position.x += Math.sin(Date.now() * 0.001 + i) * 0.001;
s.position.y += Math.cos(Date.now() * 0.001 + i) * 0.001;

 }

  startRenderer.render(startScene, startCamera);
 }


setupThreeScene();
seedDots();
seedLines();
createArchiveNumbers();
layoutArchiveNumbers();

createStartBackground();
setupStartThree();

animate();
animateThreeScene();
animateStartThree();

createTransitionNumbers();
animateTransitionNumbers();