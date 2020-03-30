const x = 1000;
const y = 1000;
var drawings;
var thickness;
var paintColor;

function setup() {
    createCanvas(x, y);
    drawings = [];
    thickness = $("#sliderWidth").val();
    paintColor = color(0);
}
  
function draw() {
    background(220);
    paint();
}

function paint() {
    drawings.forEach(element => {
        if (element.points.length == 1) {
            const initialPoint = element.points[0]
            noFill();
            fill(element.color);
            strokeWeight(element.width);
            point(initialPoint[0], initialPoint[1]);
            return;
        }
        for (let index = 0; index < element.points.length-1; index++) {
            const initialPoint = element.points[index];
            const secondPoint  = element.points[index+1];
            noFill();
            fill(element.color);
            strokeWeight(element.width);
            line(initialPoint[0], initialPoint[1], secondPoint[0], secondPoint[1]);
            
        }
    });
}

function mousePressed(){
    drawings.push({
        "points": [[mouseX,mouseY]],
        "width": thickness,
        "color": paintColor
    });
}

function mouseDragged(){
    drawings[drawings.length - 1].points.push([mouseX,mouseY]);
}

/*function mouseReleased(){
    console.log("dejar");
}*/

$(document).ready(function(){
    $("#sliderWidth").change(function(){
        thickness = $(this).val();
    });
});  