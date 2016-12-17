var ship;
var terrain;
var scaleSpeed = .01;
var autoResize = true;



function setup() {
  createCanvas(400,400);
  ship = new Lander(width/2, 50);
  terrain = new Terrain();
}

function draw() {
  background(0);
  terrain.show();
  ship.update();
  ship.show();
}






// Keyboard Inputs
function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    ship.thrusterLeft = 1;
  } 
  if(keyCode === RIGHT_ARROW) {
    ship.thrusterRight = 1;
  }
  if(keyCode === UP_ARROW) {
    ship.thrusterTop = 1;
  }
  if(keyCode === DOWN_ARROW) {
    ship.thrusterBottom = 1;
  }
}
function keyReleased() {
  if(keyCode === LEFT_ARROW) {
    ship.thrusterLeft = 0;
  } 
  if(keyCode === RIGHT_ARROW) {
    ship.thrusterRight = 0;
  }
  if(keyCode === UP_ARROW) {
    ship.thrusterTop = 0;
  }
  if(keyCode === DOWN_ARROW) {
    ship.thrusterBottom = 0;
  }
}

function windowResized() {
  if (autoResize) {
    resizeCanvas(windowWidth, windowHeight);
    terrain.generate(); // Recreate terrain. Could make "terrain.modify()"
  }
}



