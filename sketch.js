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



function show() {
  // Create lander graphic
  // (0,0) at botton center of lander
  // +x left, +y down
  translate(this.x,this.y)
  noStroke();
  fill(150);
  let quadWidth = this.width/4;
  let quadHeight = this.width/4;
    quad(quadWidth,-quadHeight-this.height, 
      -quadWidth, -quadHeight-this.height,
      -this.width/2, -this.height+1,
       this.width/2, -this.height+1);
    // Draw square body
    rect(-this.width/2,-this.height,this.width,this.height);
    // Draw fins
    fill(255,20,20); // red
    let finHeight = this.height/2;
    triangle(-this.width/2 +1, 0,     -this.width/2 +1, -finHeight,    -this.width/2 - finHeight, 0);
    triangle( this.width/2 -1, 0,      this.width/2 -1, -finHeight,     this.width/2 + finHeight, 0);
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



