const x = 1000;
const y = 1000;

let drawings;
let rubberPoints;
let thickness;
let paintColor;
let rubber;

function setup() {
    createCanvas(x, y);
    drawings       = [];
    rubberPoints = [];
    paintColor     = chooseColor();
    thickness      = $("#sliderWidth").val();
    rubber         = false;
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

function isIntersection(ax,ay,bx,by,cx,cy,dx,dy) {
    firstGrade  = (by-ay)/(bx-ax);
    secondGrade = (dy-cy)/(dx-cx);
    if (firstGrade == secondGrade) {
        return false;
    }
    firstCte  = -(firstGrade*ax)  + ay;
    secondCte = -(secondGrade*cx) + cy;

    mid    = firstGrade-secondGrade; 
    pointx = (secondCte-firstCte)/mid;
    pointy = ((firstGrade*secondCte) - (secondGrade*firstCte))/mid;

    return cx <= pointx && cy <= pointy && pointx <= dx && pointy <= dy 
}

function clearFigure() {
    drawings.forEach(element => {
        for (let index = 0; index < element.points.length-1; index++) {
            console.log(element.delete);
            if(element.delete) break;
            const point = element.points[index];
            const nextPoint = element.points[index+1];
            for (let indexRubber = 0; indexRubber < rubberPoints.length-1; indexRubber++) {
                const rubberPoint = rubberPoints[indexRubber];
                const nextRubberPoint = rubberPoints[indexRubber+1];
                if(isIntersection(
                    rubberPoint[0],rubberPoint[1],nextRubberPoint[0],nextRubberPoint[1],
                    point[0],point[1],nextPoint[0],nextPoint[1]
                )){
                    element.delete = true;
                    break;
                }
            }
        }
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