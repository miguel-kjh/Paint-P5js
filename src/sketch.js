const x = $(document).width();
const y = $(document).height();

let drawings;
let thickness;
let paintColor;

function setup() {
    createCanvas(x, y);
    drawings       = [];
    paintColor     = chooseColor();
    thickness      = $("#sliderWidth").val();
}
  
function draw() {
    background(chooseColor($("#background").val()));
    paintMark();
    paint();
}

function paintMark() {
    stroke(paintColor);
    strokeWeight(thickness);
    point(mouseX, mouseY);
}

function paint() {
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
    drawings.push({
        "points" : [[mouseX,mouseY]],
        "width"  : thickness,
        "color"  : paintColor,
    });
}

function mouseDragged(){
    drawings[drawings.length - 1].points.push([mouseX,mouseY]);
}

function deleteElemente() {
    drawings.pop();
}

function keyPressed(){
    if (key == "b" || key == "B") {
        deleteElemente();
    }

    if(key == "a" || key == "A"){
        drawings = [];
    }

    if (key == "s" || key == "S") {
        saveDraw();
    }
}

function saveDraw() {
    saveCanvas("myCanvas", "jpg");
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
        paintColor = chooseColor($("#colors").val());  
    });

    $("#saveButton").click(function (e) { 
        e.preventDefault();
        saveDraw();
    });
});  