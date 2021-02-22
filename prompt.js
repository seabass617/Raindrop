// Basically just a a block of text in the middle of the screen

// It can be displayed...

// Or be faded away...
class Prompt {
  constructor() {
    this.color = 0;
    this.location = new createVector(width / 2, height / 2);
    this.isAlive = true;
    this.size = width < 1000 ? 28 : 48;
  }

  //What can it do?
  display() {
    if (this.color < 255) {
      this.color = this.color + 2;
    }
    textAlign(CENTER);
    textSize(this.size);
    stroke(this.color);
    fill(this.color);
    text("Click anywhere to start", this.location.x, this.location.y);
  }

  fadeOut() {
    if (this.color <= 256 && this.color > 0) {
      this.color = this.color - 2;
      textAlign(CENTER);
      textSize(this.size);
      stroke(this.color);
      fill(this.color);
      text("Click anywhere to start", this.location.x, this.location.y);
    } else if (this.color >= 0) {
      this.isAlive = false;
    }
  }

  isAlive() {
    return this.isAlive;
  }
}