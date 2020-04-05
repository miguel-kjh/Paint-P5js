const x = $(document).width();
const y = $(document).height();

let drawings;
let thickness;
let paintColor;
let isDrawing;

function setup() {
    createCanvas(x, y);
    drawings       = [];
    isDrawing      = false;
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
    if (mouseButton == RIGHT) return;

    isDrawing = true;
    drawings.push({
        "points" : [[mouseX,mouseY]],
        "width"  : thickness,
        "color"  : paintColor,
    });
}

function mouseDragged(){
    drawings[drawings.length - 1].points.push([mouseX,mouseY]);
}

function mouseReleased(){
    isDrawing = false;
}

function deleteElemente() {
    drawings.pop();
}

function keyPressed(){

    if (isDrawing) return;

    if (key == "b" || key == "B") {
        deleteElemente();
    }

    if(key == "a" || key == "A"){
        drawings = [];
    }

    if (key == "s" || key == "S") {
        saveDraw();
    }

    if(key == "o" || key == "O"){
        let aux = int($("#sliderWidth").val())
        $("#sliderWidth").val(aux + 1);
        thickness = $("#sliderWidth").val();

    }

    if(key == "l" || key == "L"){
        let aux = int($("#sliderWidth").val())
        $("#sliderWidth").val(aux - 1);
        thickness = $("#sliderWidth").val();
    }
}

function saveDraw() {
    filename = $("#saveName").val();
    if (filename == "") {
        filename = "myCanvas"
    }
    saveCanvas(filename, "jpg");
}

function chooseColor(string) {
    switch (string) {
        case "green":
            return color(40,227,37);
        case "blue":
            return color(7,143,243);
        case "red":
            return color(250,91,91);
        case "white":
            return color(249,249,249);
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