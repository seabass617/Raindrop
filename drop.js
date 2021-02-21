class Drop {
  constructor(x, y, c = { r: 255, g: 255, b: 255, a: 1 }) {
    this.location = new createVector(x, y);
    this.color = c;
    this.ripples = [];
    this.counter = 0;
    this.limit = 2;
    this.isAlive = true;
  }

  update() {
    // Create a ripple at the location if the counter is still under the desired value
    // This can probably just be a for loop
    if (this.counter <= this.limit - 1) {
      let currentColor = { ...this.color };
      // The new opacity will be scaled according to which ripple it is, the later the ripple was added the the array, the more transparent it will be

      // if we are on our second iteration then make a ripple that will 1/3 the max,size of the original
      // Start in the same location, same initial size, start with 75% opacity, 1/2 the thickness,
      if (this.counter === 0) {
        this.ripples.push(new Ripple(this.location, currentColor));
      } else if (this.counter === 1) {
        this.ripples.push(
          new Ripple(this.location, currentColor, {
            maxDiameter: 250 / 3,
            opacity: 1,
            thickness: 5,
            speed: 3,
          })
        );
      }
      this.counter++;
    }
    // Otherwise monitor the dead ripples and make this drop dead is all ripples are dead
    else {
      let deadcount = 0;
      for (let i = 0; i <= this.ripples.length - 1; i++) {
        let ripple = this.ripples[i];

        if (!ripple.isAlive) {
          deadcount++;
        }
      }
      this.isAlive = deadcount === this.limit ? false : true;
    }
  }

  display() {
    // Loop through ripples and display if alive
    for (let i = 0; i <= this.ripples.length - 1; i++) {
      let ripple = this.ripples[i];
      if (ripple.isAlive) {
        ripple.update();
        ripple.display();
      }
    }
  }
}
