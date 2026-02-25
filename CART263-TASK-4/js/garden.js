window.onload = function () {
  // Our garden
  let garden = {
    // An array to store the individual flowers
    flowers: [],
    // How many flowers in the garden
    numFlowers: 40,
    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },

    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },
  };
  // new  sun instancce
  let sun = new Sun(10, 10, { r: 240, g: 206, b: 83 })


  // beehives
  let beehives = [];
  let bees = [];

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);
    //sun
    sun.renderSun();

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);

    // beehives
    beehives.push(new BeeHive(520, 40, 100, { r: 244, g: 196, b: 110 }));
    beehives.push(new BeeHive(680, 80, 85, { r: 235, g: 184, b: 98 }));
    beehives.push(new BeeHive(100, 100, 130, { r: 244, g: 196, b: 110 }));
    beehives.forEach((hive) => hive.renderBeeHive());
    beehives.forEach((hive) => {

      //create five bees
      for (let i = 0; i < 5; i++) {
        let hive = beehives[i % beehives.length];

        //different sizes
        let width = Math.random() * 50 + 25;
        let height = width;

        //position
        let startX = hive.x + hive.size / 4;
        let startY = hive.y + hive.size / 2;

        let bee = new Bee(startX, startY, width, height, hive);
        bees.push(bee);
        bee.renderBee();
        bee.animateBee();

      }

    });


    //create some flowers
    for (let i = 0; i < garden.numFlowers; i++) {
      // Create variables for our arguments for clarity
      let x = Math.random() * (window.innerWidth);
      let y = Math.random() * 120;
      let size = Math.random() * 30 + 10;
      let stemLength = Math.random() * 50 + 20;
      let petalColor = {
        r: parseInt(Math.random() * 155) + 100,
        g: parseInt(Math.random() * 155) + 100,
        b: parseInt(Math.random() * 155) + 100,
      };

      // Create a new flower using the arguments
      let flower = new Flower(x, y, size, stemLength, petalColor);
      // Add the flower to the array of flowers
      garden.flowers.push(flower);
    }

    for (let i = 0; i < garden.numFlowers; i++) {
      // Add the flower to the array of flowers
      garden.flowers[i].renderFlower();
    }
  }

  // function to update and animate the beehives
  function animateBeeHive() {
    for (let i = 0; i < beehives.length; i++) {
      let hives = beehives[i];
      hives.rotateHives();
    }

    window.requestAnimationFrame(animateBeeHive);
  }


  createAndRenderTheGarden();
  window.requestAnimationFrame(animateBeeHive);
}


/*** TEAM A AND B NEED TO COORDINATE
 
/**TEAM A -- BEES
* 1/ Create a  file to hold a  Bee Class (i.e. Bee.js)
* 2/ Create the Bee Class : a constructor which takes a position, size, color and a home beehive (SEE TEAM B) as parameters
* 3/ In the Bee Class: Create a renderBee() method -> which essentially creates a HTML element(s) 
- could be  * an image element :) or an svg .... representing a Bee... (see Sun or Flower for inspiration)
* 4/ Create an animateBee() method in the Bee class - which will make a given Bee move around the garden - use the requestAnimationFrame() 
* 5/ In garden.js add at least 5 new Bees to the garden (in an array) - 
* all different sizes, colors etc... and set their position to be at their home Beehive's position
* 6/ and then call the animateBee() method on all the Bees)
* 7/Implement the functionality  to allow for bees to periodically return to their home beehive (SEE TEAM B) to rest :)
 
/**TEAM B -- BEE HIVES
* 1/ Create a file to hold a Bee Hive (i.e. BeeHive.js)
* 2/ Create the BeeHive Class : a constructor which takes a position, size and color as parameters
* 3/ In the BeeHive Class: Create a renderBeeHive() method -> which essentially creates HTML element(s)
- could be * an image element :) or an svg .... representing a BeeHive.. (see Sun or Flower for inspiration)
* 4/ Create a subtle animation affecting the bee-hive ... (using setInterval(), setTimeout, or requestAnimationFrame) 
* 5/ In garden.js add at least new 2 Beehives  to the garden (in an array) - and ensure that they have bees linked to them
* 6/ Add a click event to each beehive such that when clicked on -> you count the number of bees (SEE TEAM A for collab) "at home" 
and visually display the result
*
*/
