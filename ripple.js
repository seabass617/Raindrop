class Ripple {
  constructor(
    location,
    c,
    properties = { maxDiameter: 250, opacity: 1, thickness: 10, speed: 5 }
  ) {
    //What data does it have
    this.location = location;
    this.radius = 10;
    this.diameter = this.radius * 2;
    this.speed = properties.speed; //pixels per frame
    this.topSpeed = properties.speed;
    this.isAlive = true;
    this.opacity = properties.opacity;
    this.maxDiameter = properties.maxDiameter;
    this.color = c;
    this.thickness = properties.thickness;
    this.originalThickness = properties.thickness;
    this.originalOpacity = properties.opacity;
    this.originalSpeed = properties.speed;
  }

  //What can the ripple do
  display() {
    noFill();
    strokeWeight(this.thickness);
    stroke(
      `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`
    );
    ellipse(this.location.x, this.location.y, this.radius * 2, this.radius * 2);
  }

  update() {
    //every frame we want to increase the size of the ripple by speed
    this.radius = this.radius + this.speed;

    let newOpacity =
      1 - map(this.radius * 2, 10, this.maxDiameter, 0.0, 1.0, true);
    this.color.a = newOpacity;

    let newThickness =
      10 - map(this.radius * 2, 10, this.maxDiameter, 1, 10, true);
    this.thickness = newThickness;

    let newSpeed =
      this.topSpeed -
      map(this.radius * 2, 10, this.maxDiameter, 1, this.topSpeed, true);
    this.speed = newSpeed;

    this.checkState();
  }

  checkState() {
    let diameter = this.radius * 2;
    if (diameter > this.maxDiameter) {
      this.isAlive = false;
    }
  }
}
