var autoResize = true;
var ship;
var scaleSpeed = .01;

function setup() {
  createCanvas(400,400);
  ship = new Lander(width/2, 50);
}

function draw() {
  background(0);
  ship.update();
  ship.show();
}


// constructor
function Lander(x,y) {
  this.x = x;
  this.y = y;
  
  this.dx = 0.0;
  this.dy = 0.0;
  this.power = 20.0; // accel
  this.gravity = -10.0; //accel
  
  // thruster flags (1 or 0)
  this.thrusterTop = 0.0;     //Pushes down
  this.thrusterBottom = 0.0;  //Pushes up
  this.thrusterRight = 0.0;   //Pushes left
  this.thrusterLeft = 0.0;    //Pushes right

  // Lander Geometry, origin at (center,bottom)
  this.width = 30;
  this.height = 50;
  
  //methods
  this.update = update;
  this.show = show;
  this.relocate = relocate;
}
function relocate(x,y) {
  this.x = x;
  this.y = y;
}
function update() {
  //calculate acceleration
  this.dx = this.dx + scaleSpeed * (this.power * (this.thrusterLeft - this.thrusterRight));
  this.dy = this.dy + scaleSpeed * (this.power * (this.thrusterTop - this.thrusterBottom) - this.gravity);
  
  // motion
  this.x = this.x + this.dx;
  this.y = this.y + this.dy;
  
  // Stop fall at ground level.
  if(this.y > height) { 
    this.y = height;
    this.dy = 0;
    this.dx = (this.dx * .9); //skid brake
  }

  //stop at screen sides
  if( this.x > width - this.width/2) { 
    this.x = width-this.width/2;
    this.dx = 0;
  } else if( this.x < 0 + this.width/2) { 
    this.x = 0 + this.width/2;
    this.dx = 0;
  }

}
function show() {
  // Create lander graphic
  translate(this.x,this.y)
  noStroke();
  fill(220);
  rect(-this.width/2,-this.height,this.width,this.height);
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
  }
}