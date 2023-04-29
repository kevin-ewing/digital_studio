const CUBE_SIZE = 100;
const BOARDER = 50;
const LINE_ODDS = 0.1;
const ARC_LINE_ODDS = 0.25;


let BG_COLOR;
let COLOR_ARRAY;
let MAIN_COLOR;

function setup() {
  // createCanvas(600, 800);
  var myCanvas = createCanvas(windowWidth, 600);
    myCanvas.parent("landing");

  colorMode(HSB,360);
  MAIN_COLOR = color(random(0,360),200,300);
  COLOR_ARRAY = getAnalogousColors(MAIN_COLOR);
  BG_COLOR = color(hue(MAIN_COLOR),100,200);

  // document.documentElement.style.setProperty('buttons', MA);

  let myDiv = document.getElementById("buttons");
  myDiv.style.color = MAIN_COLOR
  document.documentElement.style.setProperty('--supplement-color', MAIN_COLOR);
  document.documentElement.style.setProperty('--supplement-color-dark', COLOR_ARRAY[5]);
  document.documentElement.style.setProperty('--background-color', BG_COLOR);
  noLoop()
}

function draw() {
  background(BG_COLOR);
  for (let x = 1+(((width-(2*CUBE_SIZE))/CUBE_SIZE)%1)*.5; x <= (width-(2*CUBE_SIZE))/CUBE_SIZE; x ++){
    for (let y = 1; y < (height)/CUBE_SIZE; y ++){
      myArc(x*CUBE_SIZE+(CUBE_SIZE/2),y*CUBE_SIZE+(CUBE_SIZE/2),CUBE_SIZE,random(COLOR_ARRAY),random([0, PI/2, PI, (3*PI)/2]));

      if (random()< LINE_ODDS){
        myLines(x*CUBE_SIZE+(CUBE_SIZE/2),y*CUBE_SIZE+(CUBE_SIZE/2),CUBE_SIZE,random(COLOR_ARRAY));
      }
      if (random()< ARC_LINE_ODDS){
        myArcLines(x*CUBE_SIZE+(CUBE_SIZE/2),y*CUBE_SIZE+(CUBE_SIZE/2),CUBE_SIZE,random(COLOR_ARRAY),random([0, PI/2, PI, (3*PI)/2]));
      }
    }
  }


}

function myLines(x,y,size, color){
  push();
  translate(x,y);


  strokeCap(SQUARE);
  stroke(color);
  strokeWeight(7);
  for (let x = 1; x <= 5; x ++){
    line(((x*size)/6) - (size/2), size/2, ((x*size)/6) - (size/2), -size/2);
  }
  pop();
}

function myArc(x,y,size, color, rotation){
  push();
  translate(x,y);
  rotate(rotation)
  ellipseMode(CENTER)

  noStroke();
  fill(color);
  arc(0-size/2,0-size/2,size*2,size*2,0,PI/2);
  pop();
}

function myArcLines(x,y,size, color, rotation){
  push();
  translate(x,y);
  rotate(rotation)
  ellipseMode(CENTER)

  strokeCap(SQUARE);
  noFill();
  stroke(color);
  strokeWeight(7);
  for (let x = 1; x <= 5; x ++){
    arc(0-size/2,0-size/2,(x*size)/3,(x*size)/3,0,PI/2);
  }
  pop();

}


function getAnalogousColors(myColor) {
  let colors = [];
  
  // Calculate the hues of the 6 analogous colors
  let myHue = hue(myColor);
  let hues = [];
  hues.push(myHue - 60);
  hues.push(myHue - 30);
  hues.push(myHue - 15);
  hues.push(myHue + 15);
  hues.push(myHue + 30);
  hues.push(myHue + 60);
  
  // Normalize the hues to be within the range of 0 to 360
  for (let i = 0; i < hues.length; i++) {
    hues[i] = (hues[i] + 360) % 360;
  }
  
  // Convert the hues, saturation, and brightness to RGB hex codes
  for (let i = 0; i < hues.length - 1; i++) {
    colors.push(color(hues[i], saturation(myColor), brightness(myColor)));
  }

  colors.push(color(hues.slice(-1)[0] , saturation(myColor), 200));

  colors.push(color("#ffffff"));
  
  return colors;
}

function windowResized() {
  resizeCanvas(windowWidth, 600);
  // put any additional code that needs to run when the window is resized here
}