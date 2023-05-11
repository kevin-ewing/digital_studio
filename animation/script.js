// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;


// Matter.js engine and world variables
var engine, world;
// Box objects
var fallingBox, stationaryBox;

function setup() {
  // Canvas size
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');

  // Create a Matter.js engine
  engine = Engine.create();
  // Access the world property of the engine
  world = engine.world;

    // Set custom gravity
    engine.world.gravity.y = 0.5; // Adjust the gravity as per your preference

  // Create a stationary box at the bottom
  var stationaryBoxSize = 300;
  var stationaryBoxX = width / 2;
  var stationaryBoxY = height - stationaryBoxSize / 2;
  stationaryBox = new Box(stationaryBoxX, stationaryBoxY, stationaryBoxSize, stationaryBoxSize, true);

  // Create a falling box with rotation
  var fallingBoxSize = 300;
  var fallingBoxX = width / 2;
  var fallingBoxY = 0;
  var fallingBoxAngle = PI/4 + random(-.00001, .00001);
  fallingBox = new Box(fallingBoxX, fallingBoxY, fallingBoxSize, fallingBoxSize, false, fallingBoxAngle);

  // Add the boxes to the world
  World.add(world, [stationaryBox.body, fallingBox.body]);

  // Run the Matter.js engine
  Engine.run(engine);
}

function draw() {
  // Clear the background
  background(255);

  // Update the Matter.js engine
  Engine.update(engine);

  // Display the boxes
  stationaryBox.display();
  fallingBox.display();

}

// Box object
function Box(x, y, width, height, isStatic, angle) {
  this.body = Bodies.rectangle(x, y, width, height, {restitution: .8, friction: .1, isStatic: isStatic });
  if (angle) {
    Matter.Body.setAngle(this.body, angle);
  }

  this.display = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(0);
    stroke(0);
    strokeWeight(1);
    rect(0, 0, width, height);
    pop();
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function keyPressed() {
    // Check if the 'r' key is pressed
    if (key === 'r' || key === 'R') {
      restartFallingBox();
    }
}


function restartFallingBox() {
    // Remove the existing falling box from the world
    World.remove(world, [stationaryBox.body, fallingBox.body]);

    var stationaryBoxSize = 300;
    var stationaryBoxX = width / 2;
    var stationaryBoxY = height - stationaryBoxSize / 2;
    stationaryBox = new Box(stationaryBoxX, stationaryBoxY, stationaryBoxSize, stationaryBoxSize, true);


    // Create a falling box with rotation
    var fallingBoxSize = 300;
    var fallingBoxX = width / 2;
    var fallingBoxY = 0;
    var fallingBoxAngle = PI/4 + random(-.0001, .0001);
    fallingBox = new Box(fallingBoxX, fallingBoxY, fallingBoxSize, fallingBoxSize, false, fallingBoxAngle);
  
    // Add the new falling box to the world
    World.add(world, [stationaryBox.body, fallingBox.body]);
}