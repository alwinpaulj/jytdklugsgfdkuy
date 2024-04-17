


quick_draw_data_set=["stitches","ship","aeroplane","clock","ambulance","birds","ant","apple","hand","pen","axe","bag","banana","bandage","house","ball","bat","basket","bird","tub","teddy bear","bed","bee","belt","chair","cycle","duck","cake","book","tree","burger","fire","broom","elephant","circle","key","laptop","lamp","horse","bush","crown","camera","bus","calander","cup","crab","boat","butterfly","ear","lighthouse","fish","television","brush","skull","rabbit","pin","nose"];
random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_number];
document.getElementById("sketch_to_be_drawn").innerHTML = "sketch to be drawn: "+Element_of_array;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = Element_of_array;

function draw(){
    strokeWeight(13);
        stroke(0);
        if(mouseIsPressed){
            line(pmouseX, pmouseY, mouseX, mouseY);
         } 
    check_sketch();
    if(drawn_sketch == sketch){
        
        timer_counter = 0;
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "score: "+score;
    }
}

function  check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = "timer: "+timer_counter;
    if(timer_counter>2000){
        document.getElementById("your_sketch").innerHTML = "your sketch: ";
        document.getElementById("confidence").innerHTML = "confidence: ";
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function updateCanvas(){
    background("white");
    quick_draw_data_set=["stitches","ship","aeroplane","clock","ambulance","birds","ant","apple","hand","pen","axe","bag","banana","bandage","house","ball","bat","basket","bird","tub","teddy bear","bed","bee","belt","chair","cycle","duck","cake","book","tree","burger","fire","broom","elephant","circle","key","laptop","lamp","horse","bush","crown","camera","bus","calander","cup","crab","boat","butterfly","ear","lighthouse","fish","television","brush","skull","rabbit","pin","nose"];
    random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    Element_of_array = quick_draw_data_set[random_number];
    sketch = Element_of_array;
    document.getElementById("sketch_to_be_drawn").innerHTML ="sketch to be drawn: "+sketch; 
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
   
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);

}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('your_sketch').innerHTML = 'your sketch: '+results[0].label;

    document.getElementById('confidence').innerHTML = 'confidence: '+Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
} 


   

   
