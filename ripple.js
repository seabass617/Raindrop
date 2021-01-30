class Ripple {

  constructor(x,y){
    //What data does it have
    this.location = new createVector(x,y);
    this.radius = 30;
    this.diameter = this.radius*2;
    this.speed = 3; //pixels per frame
    this.isAlive = true;
    this.opacity = 0.1;
    this.maxDiameter = 250;
    this.color = color(255,255,255);
  }

  //What can the ripple do
  display(){
    noFill();
    stroke(this.color);
    ellipse(this.location.x, this.location.y, this.radius * 2, this.radius *2 );
  }

  update(){
    //every frame we want to increase the size of the ripple by speed
    this.radius = this.radius + this.speed;
    //Do you want have it so that the opacity decreases as you approach death????
    //You'll need map function so that you are slowing down proportionally...
    //map your opacity to the radius
    let opacity = map(this.radius*2,60,this.maxDiameter,0,255); // I want this opposite of this, right now it is giving 
    //me 255 when we are at max diameter, and 0 at minimum diameter
    // if we do 255-255 we get zero
    // 255-0 = 0
    //255 
    this.color.setAlpha(255-opacity); 

    this.checkState();
  }

  checkState(){
    let diameter = this.radius *2;
    if (diameter > this.maxDiameter){
      this.isAlive = false;
    }
  }





  //edge cases 
  //if the circles diameter is greater than the width of the screen stop drawing it 

  //edge(){

  //}
}