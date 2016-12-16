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
  }
}
function show() {
  // Create lander graphic
  translate(this.x,this.y)
  noStroke();
  fill(255);
  rect(-25,-50,50,50);
}