
let startTime, endTime, roundTime, fastest, slowest, average;
let roundTimes = [];

let targetArea = document.getElementById("target-area");
let startButton = document.getElementById("start-button");
let title = document.querySelector("div#title h1");


function genTemp() {
  let defaultRow = ". . . . . . . . . . . .";

  let gridArr = [];

  let targetX = Math.floor(Math.random()*12);
  let targetY = Math.floor(Math.random()*12);

  for(let i =0; i<12; i++){
    if(i === targetY){
      let targetRow = defaultRow.split(" ");
      targetRow[targetX] = 't';
      targetRow = targetRow.toString().replace(/,/g, " ");
      gridArr.push(targetRow);
      
    } else {
      gridArr.push(defaultRow);
    }
  }
 
  let gridTempArea = "\"" + gridArr.toString().replace(/,/g, "\"\"") + "\"";
  targetArea.setAttribute("style", "grid-template-areas: " + gridTempArea );
};

startButton.addEventListener("click", function(e){
  e.preventDefault();
  genTemp();
  startButton.setAttribute("style", "display: none");
  //start timer
  startTime = Date.now();
})

document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("target").addEventListener("click", function(e) {
    e.preventDefault();
    
    if(roundTimes.length < 10){
      endTime = Date.now();
      roundTime = endTime - startTime;
      roundTimes.push(roundTime);
      startTime = Date.now();
      genTemp();
  
    } else {
      title.innerHTML = "Game Over";
      let averager = (array) => array.reduce((a, b) => a + b) / array.length;
      average = parseInt(averager(roundTimes));
      slowest = Math.max(...roundTimes);
      fastest = Math.min(...roundTimes);
      document.getElementById("fast-val").innerText = "Your fastest reaction was " + fastest + " ms";
      document.getElementById("slow-val").innerText = "Your slowest reaction was " + slowest + " ms";
      document.getElementById("average-val").innerText = "Your average reaction was " + average + " ms";

    }

  })


});

