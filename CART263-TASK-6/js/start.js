window.onload = go_all_stuff;

function go_all_stuff(){
console.log("go");

/* for loading the video */
let videoEl = document.getElementById("video-birds");
window.addEventListener("click", function(){
    if(videoEl.currentTime ===0){
        videoEl.play()
    }
})


videoEl.loop = true;

let theCanvases = document.querySelectorAll(".canvases");
let theContexts =[];
//add a context for each canvas and put into an array

for(let i =0; i<theCanvases.length; i++){
    let context = theCanvases[i].getContext("2d");
    theContexts.push(context);
}

let drawingBoardA = new DrawingBoard(theCanvases[0],theContexts[0],theCanvases[0].id);
//add a circular object to canvas A
drawingBoardA.addObj(new CircularObj(100,100,20,"#FFC300","#E6E6FA", drawingBoardA.context))
// Add a few more circles for visual richness (Task 1)
drawingBoardA.addObj(new CircularObj(250,150,15,"#FF5733","#DAF7A6", drawingBoardA.context))
drawingBoardA.addObj(new CircularObj(300,80,25,"#C70039","#FFC300", drawingBoardA.context))
drawingBoardA.addObj(new CircularObj(180,220,12,"#900C3F","#FF5733", drawingBoardA.context))
drawingBoardA.display();



let drawingBoardB = new DrawingBoard(theCanvases[1],theContexts[1],theCanvases[1].id);
//add a rectangular object to canvas B
drawingBoardB.addObj(new RectangularObj(100,100,50,70,"#FF5733","#E6E6FA",drawingBoardB.context))
drawingBoardB.display();


let drawingBoardC = new DrawingBoard(theCanvases[2],theContexts[2],theCanvases[2].id);
//add a freestyle object to canvas C
drawingBoardC.addObj(new FreeStyleObj(10,100,300,"#CF9FFF","#CF9FFF", drawingBoardC.context))
drawingBoardC.display();

let drawingBoardD = new DrawingBoard(theCanvases[3],theContexts[3],theCanvases[3].id);
drawingBoardD.addObj(new VideoObj(0,0,400,300,videoEl,drawingBoardD.context))
drawingBoardD.display();


let micLevel = 0; // normalized volume 0-1

// Request microphone access
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(function(stream) {
    console.log("Microphone access granted!");

    // Create audio context and analyser
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createAnalyser();
    let microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    analyser.fftSize = 512;
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    // Function to read mic level continuously
    function getMicLevel() {
      analyser.getByteFrequencyData(dataArray);

      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      let average = sum / bufferLength;
      micLevel = average / 255; // normalize to 0-1

      // Pass mic level to all objects on Board B (rectangles)
      for (let i = 0; i < drawingBoardB.objectsOnCanvas.length; i++) {
        drawingBoardB.objectsOnCanvas[i].micLevel = micLevel;
      }
      // Pass mic level to all objects on Board C (freestyle)
      for (let i = 0; i < drawingBoardC.objectsOnCanvas.length; i++) {
        drawingBoardC.objectsOnCanvas[i].micLevel = micLevel;
      }

      requestAnimationFrame(getMicLevel);
    }
    getMicLevel();
  })
  .catch(function(err) {
    
  });


/*** RUN THE ANIMATION LOOP  */
window.requestAnimationFrame(animationLoop);

function animationLoop(){
    /*** CALL THE EACH CANVAS TO ANIMATE INSIDE  */
    drawingBoardA.animate();
    drawingBoardB.animate();
    drawingBoardC.animate();
    drawingBoardD.run(videoEl)
    window.requestAnimationFrame(animationLoop);
}







}



