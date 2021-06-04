var result;
var accuracy;

function preload() { }

function setup() {
    canvas = createCanvas(300, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/bUHyOKiqB/model.json", model_loaded);
}

function select_model() {
    active_model = document.getElementById("model_name").value;
    if (active_model == "tm") {
        classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/bUHyOKiqB/model.json", model_loaded);
        document.getElementById("trained_on").innerHTML = "Water bottle | Phone | Notebook | My hand | Me";
    } else {
        classifier = ml5.imageClassifier("MobileNet", model_loaded);
         document.getElementById("trained_on").innerHTML = "1.3 million images";
    }
}

function model_loaded() {
    window.alert("Model is loaded.");
}

function draw() {
    frameRate(10);
    image(video, 0, 80, 300, 270);
    fill(255, 255, 255);
    rect(0, 0, 300, 80);
    rect(0, 350, 300, 50);
    classifier.classify(video, gotResult);
    textSize(20);
    fill("#000000");
    text(result, 0, 0, 300, 80);
    text(accuracy, 0, 350, 300, 50);
    textAlign(CENTER, CENTER)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        result = results[0].label;
        accuracy = (results[0].confidence* 100 ).toFixed(2)  + "%";
    }
}