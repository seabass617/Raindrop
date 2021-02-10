//============================================
// Sketch File
// To do: Make it mobile friendly, detect display size and change parameters accordingly,
// Add some music!
//============================================

let drops = [];
let colors = [];
let switchInterval;
let sound;
let f; //what the fuck is this
let toff, xoff, yoff;

function windowResized() {
  console.log("resized");
  let clientHeight = document.getElementById("window").clientHeight;
  let clientWidth = document.getElementById("window").clientWidth;
  resizeCanvas(clientWidth, clientHeight);
}

function setup() {
  let clientHeight = document.getElementById("window").clientHeight;
  let clientWidth = document.getElementById("window").clientWidth;

  canvas = createCanvas(clientWidth, clientHeight);

  // canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-10");
  background(0);

  sound = loadSound("shiki.mp3", loaded);
  f = loadSound();

  toff = 0;
  xoff = 0;
  yoff = 1000;

  colors.push(color(255, 236, 25));
  colors.push(color(255, 152, 0));
  colors.push(color(255, 65, 45));
}

function loaded() {
  sound.loop();
}

function draw() {
  background(0);

  switchInterval = Math.floor(map(noise(toff), 0, 1, 4, 20));
  //console.log(switchInterval);

  //now we need to make a perlin noise field of these, so that each frame you have anywhere between 0,2 raindrops falling down???
  // lets make it static first, then dynamic...
  //we'll start with 2 raindrops falling every second, in a perlin random location on the screen...

  // every half second create new drops

  if (frameCount % switchInterval == 0) {
    // try using perlin here within a small range for some variation?
    //create two new drops
    for (let i = 0; i < 1; i++) {
      //choose between total randomness or perlin randomness for location
      //drops.push(new Drop(map(noise(xoff),0,1,0,width),map(noise(yoff),0,1,0,height)));

      drops.push(new Drop(random(width), random(height)));
    }
  }

  for (let i = drops.length - 1; i >= 0; i--) {
    let drop = drops[i];
    drop.update();
    //drop.display(); /// Get rid of this display
    if (drop.isAlive) {
      //maybe we can put the update in here?!
      drop.display();
    } else {
      drops.splice(i, 1);
    }

    toff += 0.01;
    xoff += 5;
    yoff += 5;

    //single drop system
  }
}

function mouseClicked() {
  // if the mouse is clicked make a drop at that location
  // The color of that click should be somewhere around that white yellow orange range...
  let dropcolor = colors[Math.floor(random(3))];
  console.log(dropcolor);
  drops.push(new Drop(mouseX, mouseY, dropcolor));
  console.log("mouse clicked");
}
