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
let speedSlider;
let speedLow, speedHigh;

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

  //Load the rainfall sounds
  rain = loadSound("./audio/rain.mp3", loaded);
  drop = loadSound("./audio/drop.mp3", loaded);

  //Slider
  // speedSlider = createSlider(0, 10, 3, 0.1);
  // speedSlider.position(20, 50);

  toff = 0;
  xoff = 0;
  yoff = 1000;

  colors.push({ r: 255, g: 236, b: 25, a: 1 });
  colors.push({ r: 255, g: 152, b: 0, a: 1 });
  colors.push({ r: 255, g: 65, b: 45, a: 1 });
}

function loaded() {
  rain.loop();
}

function draw() {
  background(0);

  //Associate the rate of rainfall to vary according to perlin noise
  switchInterval = Math.floor(map(noise(toff), 0, 1, 4, 15));

  //Make 2 new drops according to our switchinterval
  if (frameCount % switchInterval == 0) {
    for (let i = 0; i < 1; i++) {
      drops.push(new Drop(random(width), random(height)));
    }
  }

  // Display the drops or delete them if they are dead
  for (let i = drops.length - 1; i >= 0; i--) {
    let drop = drops[i];
    drop.update();
    if (drop.isAlive) {
      drop.display();
    } else {
      drops.splice(i, 1);
    }
  }
}

// If you click the mouse, create a drop there with random color
function touchStarted() {
  let dropColor = colors[Math.floor(random(3))];
  // Play audio function...
  drop.play();
  drops.push(new Drop(mouseX, mouseY, dropColor));
}
