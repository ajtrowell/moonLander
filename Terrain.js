// Terrain class constructor
function Terrain() {
  this.generate();
}
Terrain.prototype.generate = function() {
  // Thanks Philipp: http://gamedev.stackexchange.com/a/93531
  this.width = width; // width of canvas
  this.height = height; // height of canvas
  this.maxPeak = this.height*0.8; // Maximum possible proceedural point
  this.minValley = this.height*0.05; // Lowest possible proceedural point
  this.HEIGHT_MAX = this.maxPeak * random(0.7,1);
  this.HEIGHT_MIN = this.minValley * random(1,2);
  this.STEP_MAX = 2.5; // max slope (controls steepness)
  this.STEP_CHANGE = 1.0; // max slope change per pixel (controls roughness)

  // starting conditions
  this.level = random(this.HEIGHT_MIN,this.HEIGHT_MAX);
  this.slope  = random(-this.STEP_MAX,this.STEP_MAX);
  this.groundLevels = []; // vector of ground height for each pixel
  for (i=0;i<this.width;i++) {
    this.level += this.slope;
    this.slope  += random(-this.STEP_CHANGE, this.STEP_CHANGE);

    // clip height and slope to max.
    if (this.slope >  this.STEP_MAX) {this.slope =  this.STEP_MAX};
    if (this.slope < -this.STEP_MAX) {this.slope = -this.STEP_MAX};

    if (this.level > this.HEIGHT_MAX) {
      this.level = this.HEIGHT_MAX;
      this.slope *= -1; // flip slope
    }
    if (this.level < this.HEIGHT_MIN) {
      this.level = this.HEIGHT_MIN;
      this.slope *= -1; // flip slope
    }

    this.groundLevels[i] = this.level; // Store clipped value.
  } // for loop
}
Terrain.prototype.show = function() {
  fill(200,120,80); // need orange
  noStroke();
  beginShape();
  for(i=0;i<this.width;i++) {
    vertex(i,this.height - this.groundLevels[i]);
  }
    vertex(this.width, this.height); // right bottom corner;
    vertex(0, this.height); // left bottom corner;
  endShape(CLOSE);
}
