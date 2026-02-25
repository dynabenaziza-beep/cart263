setup_B();
/** THEME: CHAOS  */
function setup_B() {
  console.log("in b");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_B`, "ani_canvB", aniA, aniB, aniC, aniD);

  function aniA(parentCanvas) {
    console.log("in ani-A -teamB");


    // square grid
    let index = 0
    for (let r = 0; r < 2; r++) {
      for (let e = 0; e < 2; e++) {
        let parent = document.getElementById("ani_canvB_A");
        let back = document.createElement("div");
        back.classList.add("TEAM_B_backSquare" + index);
        back.style.width = `187.5px`;
        back.style.height = `187.5px`;
        parent.appendChild(back);
        index++
        back.style.left = ((r + 1) * 187.5) - 187.5 + "px";
        back.style.top = ((e + 1) * 187.5) - 187.5 + "px";
      }
    }


// nested for loop for circles grid
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        //create a grid cell with a div
        let parent = document.getElementById("ani_canvB_A");
        let d = document.createElement("div");
        d.classList.add("TEAM_B_circle");
        d.style.width = `20px`;
        d.style.height = `20px`;
        parent.appendChild(d);


        d.style.left = (i + 1) * 25 + "px";
        d.style.top = (j + 1) * 25 + "px";
      }
    }

    let canvas = document.querySelector("#ani_canvB_A")
    canvas.addEventListener("click", changeDotColor)

    function changeDotColor(event) {

      let bounds = canvas.getBoundingClientRect();
      console.log(bounds)

      let mouseX = event.clientX - bounds.left
      let mouseY = event.clientY - bounds.top

      let color = "undefined";


      console.log(mouseX, mouseY, (bounds.width / 2), (bounds.height / 2))

      if (mouseX < (bounds.width / 2) && mouseY < (bounds.height / 2)) {
        color = 0
      }

      else if (mouseX < (bounds.width / 2) && mouseY > (bounds.height / 2)) {
        color = 1
      }

      else if (mouseX > (bounds.width / 2) && mouseY < (bounds.height / 2)) {
        color = 2
      }

      else if (mouseX > (bounds.width / 2) && mouseY > (bounds.height / 2)) {
        color = 3
      }


    for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 14; j++) {
          //create a grid cell with a div
          let parent = document.getElementById("ani_canvB_A");
          let d = document.createElement("div");
          d.classList.add("TEAM_B_circle" + color);
          d.style.width = `20px`;
          d.style.height = `20px`;
          parent.appendChild(d);
          console.log()

          d.style.left = (i + 1) * 25 + "px";
          d.style.top = (j + 1) * 25 + "px";
        }
      }


    }
  }
  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D  maybe ?
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... draw bunch of squares of differents sizes across the canvas
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive...add more squares when mouse is over (maybe all squares change colour randomly )
   * or creat a trail of squares random color with the mouse using the mouse as a brush
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
    console.log("in ani-B -teamB");
  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
    console.log("in ani-C -teamB");

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("b-down");
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("b-up");
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }


  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

   function aniD(parentCanvas) {
    console.log("in ani-D -teamB");
//put color in array so i can reuse them 
    let colors =[
    "black",
    "black",
    "gray",
    "red"
    ];
//size of the grid 
    let cols = 14;  // across
    let rows = 14;   // how many down

    let cellSize = 25;   //size of each square 

let gap = 2; //space between squares 
let time = 0; // keep track animation time 
let cells = parentCanvas.children;

    //repeat  loop left to right 
    for (let j= 0; j < rows; j ++){
      for (let i = 0; i < cols ; i++){

// test : make one square appear
    let d = document.createElement("div"); //create div element (square)
    d.classList.add("TEAM_B_ANI_D_cell"); //so css can style 
    parentCanvas.appendChild(d);
 
    d.style.width  = cellSize - (i % 3) * 3 + "px";
d.style.height = cellSize - (i % 3) * 3 + "px";

    //place it so i can see it
   // move square to the rigth using i  
    d.style.left = i * (cellSize + gap) + "px"; //move rigth
d.style.top = j * (cellSize + gap) + "px"; // move down
    //repeat colors by column 
  let colorIndex = i % colors.length; // base color per column  
    d.style.backgroundColor = colors[colorIndex];
    }
   }
function animate () {
  //move time forward slowly 
  time += 0.008;
//update every square frame   
for (let i = 0; i < cells.length; i++) {
    let d = cells[i];
// move  colors over time modulo 
let colorIndex = (i + Math.floor(time * 2)) % colors.length;
    d.style.backgroundColor = colors[colorIndex];  
  }

requestAnimationFrame(animate);
  }
  // start animation once 
  animate();
}
}
