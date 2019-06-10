
let targetTotal = 10;
let round = 0;
let startTime, endTime, roundTime;
let roundTimes = [];

let targetArea = document.getElementById("target-area");
let startButton = document.getElementById("start-button");

function genTemp() {
  let defaultRow = ". . . . . . . . . . . .";

  let gridArr = [];

  let targetPos = [Math.floor(Math.random()*12), Math.floor(Math.random()*12)];
  let targetX = targetPos[0];
  let targetY = targetPos[1];
  console.log(targetX +1, targetY +1);

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
  console.log(Date.now());
})

document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("target").addEventListener("click", function(e) {
    e.preventDefault();
    endTime = Date.now();
    roundTime = endTime - startTime;
    roundTimes.push(roundTime);
    startTime = Date.now();
    genTemp();

  })


});

