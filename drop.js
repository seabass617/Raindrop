class Drop {
  // What properties does it have?
  constructor(x, y, c = color(255, 255, 255)) {
    this.location = new createVector(x, y);
    this.color = c;
    this.ripples = [];
    this.counter = 0;
    this.limit = 25;
    this.isAlive = true;
  }

  // What will it do?
  update() {
    // Create a ripple at the location if the counter is still under the desired value
    if (this.counter >= this.limit) {
      // migh be an issue here if it's not -1
      //Creating the ripple
      this.ripples.push(new Ripple(this.location.x, this.location.y, c));
      this.counter++;
    } else {
      // We have succesfully made a full drop! Now let's monitor it so that we know when it's dead.
      //Loop through the ripples and if they are all dead then make the drop dead...
      // Note that there may be an issue here, if we delete a drop, will it also delete the array? (obviously yeah wtf...)
      let deadcount = 0;

      for (let i = 0; i <= this.ripples.length - 1; i++) {
        let ripple = this.ripples[i];
        if (!ripple.isALive) {
          deadcount++;
        }
      }
      // If the number of dead ripples is equal to the limit then the drop is dead
      this.isAlive = deadcount === this.limit ? false : true;
    }

    // Each consecutive ripple is slightly more transparent than the previous ripple.
  }

  display() {
    for (let i = 0; i <= this.ripples.length - 1; i++) {
      // here we may have an issue because we are removing ripples from
      // the system even though they are dead
      console.log("We are iterating through our ripples");
      let ripple = this.ripples[i];
      if (ripple.isALive) {
        ripple.update();
        ripple.draw();
      }
    }
  }
}
