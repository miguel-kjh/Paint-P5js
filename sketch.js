const x = 1000;
const y = 1000;
const radius = 30;

let drawings;
let rubberPoints;
let thickness;
let paintColor;
let rubber;
let radiusRubber;

function setup() {
    createCanvas(x, y);
    drawings       = [];
    rubberPoints = [];
    paintColor     = chooseColor();
    thickness      = $("#sliderWidth").val();
    rubber         = false;
    radiusRubber   = Math.pow(radius,2);
    console.log(radiusRubber);
}
  
function draw() {
    background(chooseColor($("#background").val()));
    if(!rubber){
        paintMark();
    } else {
        paintRubber();
        clearFigure();
    }
    paint();
}

function paintMark() {
    stroke(paintColor);
    strokeWeight(thickness);
    point(mouseX, mouseY);
}

function clearFigure() {
    rubberPoints.forEach(point => {
        drawings.forEach(element => {
            for (const elementPoint of element.points) {
                console.log(
                    Math.pow((point[0] + elementPoint[0]),2)+ Math.pow((point[1] - elementPoint[1]),2)
                );
                if (
                  Math.pow((point[0] + elementPoint[0]),2) 
                + Math.pow((point[1] - elementPoint[1]),2) 
                == radiusRubber) {
                    element.delete = true;
                    console.log("coincede");
                    break;
                }
            }
        });
    });
}

function paintRubber() {
   stroke(220, 0, 220);
   strokeWeight(10);
   point(mouseX, mouseY);
}

function paint() {
    drawings = drawings.filter(function(element, index, arr){ return !element.delete;})
    drawings.forEach(element => {
        if (element.points.length == 1) {
            const initialPoint = element.points[0]
            stroke(element.color);
            strokeWeight(element.width);
            point(initialPoint[0], initialPoint[1]);
            return;
        }
        for (let index = 0; index < element.points.length-1; index++) {
            const initialPoint = element.points[index];
            const secondPoint  = element.points[index+1];
            stroke(element.color);
            strokeWeight(element.width);
            line(initialPoint[0], initialPoint[1], secondPoint[0], secondPoint[1]);
            
        }
    });
}

function mousePressed(){
    if(!rubber){
        drawings.push({
            "points" : [[mouseX,mouseY]],
            "width"  : thickness,
            "color"  : paintColor,
            "delete" : false
        });
    } else {
        rubberPoints.push([mouseX,mouseY]);
    }
}

function mouseDragged(){
    if(!rubber){
        drawings[drawings.length - 1].points.push([mouseX,mouseY]);
    } else {
        rubberPoints.push([mouseX,mouseY]);
    }
}

function keyPressed(){
    if (key=="b" || key=="B") {
        rubber = !rubber;
        rubberPoints = [];
    }
}

/*function mouseReleased(){
    console.log("dejar");
}*/

function chooseColor(string) {
    switch (string) {
        case "green":
            return color(40,227,37);
        case "blue":
            return color(7,143,243);
        case "red":
            return color(228,29,29);
        case "white":
            return color(255,255,255);
        case "gray":
            return color(220);
        default:
            return color(0);
    }
}

$(document).ready(function(){
    $("#sliderWidth").change(function(){
        thickness = $(this).val();
    });

    $("select").change(function () { 
        paintColor = chooseColor($("#colors").val())    
    });
});  