var img = ""
var statusr = "";
var starts = ""
var obj = [];

function preload(){
}

function setup(){
    canvas = createCanvas(600, 600);
    canvas.position(325, 220);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    video = createCapture(VIDEO)
    video.hide();
}

function modelLoaded(){
    console.log("modelLoaded");
    statusr = false;
}

function gotResults(error, results){
    console.log("hi!")
    statusr = true;
    if(error){
        console.error(error);
    } else {
        console.log(results);
        obj = results;
    }
}

function start(){
    starts = true
    document.getElementById("class").innerText = "Status: Detecting Objects"
}

function draw(){
    image(video, 0, 0, 600, 600);
    noFill();
    if(starts == true){
        objectDetector.detect(video, gotResults);
        if(statusr == true){
            for(i = 0; i < obj.length; i++){
                strokeWeight(3);
                textSize(15)
                percent = Math.floor(obj[i].confidence * 100) + "%";
                stroke((Math.round(Math.random()) * 255), (Math.round(Math.random()) * 255), (Math.round(Math.random()) * 255))
                rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
                strokeWeight(1);
                text(obj[i].label + ", " + percent, obj[i].x+10, obj[i].y+20);
            }
            document.getElementById("class").innerText = "Status: Object Detected, " + obj.length + " Objects"
        }
    }
}