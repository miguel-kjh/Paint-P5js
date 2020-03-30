var presed = false;

function setup() {
    createCanvas(400, 500);
}
  
function draw() {
    background(220);
    if(presed)line(mouseX, mouseY, 0, 0);
}

function mouseClicked() {
    presed = !presed;
}