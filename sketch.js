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
  this.power = 10.0; // accel
  this.gravity = -5.0; //accel
  
  // thruster flags (1 or 0)
  this.thrusterTop = 0.0;     //Pushes down
  this.thrusterBottom = 0.0;  //Pushes up
  this.thrusterRight = 0.0;   //Pushes left
  this.thrusterLeft = 0.0;    //Pushes right

  // Lander Geometry, origin at (center,bottom)
  this.width = 30;
  this.height = 30;
  
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
  }
}