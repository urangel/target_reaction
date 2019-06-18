
let startTime, endTime, roundTime, fastest, slowest, average;
let roundTimes = [];

const targetArea = document.getElementById("target-area");
const target = document.getElementById("target");
const blank = document.getElementById("blank");
const startButton = document.getElementById("start-button");
const title = document.querySelector("div#title h1");
const stats = document.getElementById("stats");
const body = document.getElementsByTagName("body");
const chart = document.getElementById("chart");


function genTemp() {
  startTime = Date.now();

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
  target.style.display = "block";
  blank.style.display = "block";
  genTemp();
  startButton.setAttribute("style", "display: none");
})

document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("target").addEventListener("click", function(e) {
    e.preventDefault();
    
    if(roundTimes.length < 10){
      endTime = Date.now();
      roundTime = endTime - startTime;
      roundTimes.push(roundTime);
      genTemp();
  
    } else {
      // title.innerHTML = "Game Over";
      let averager = (array) => array.reduce((a, b) => a + b) / array.length;
      average = parseInt(averager(roundTimes));
      slowest = Math.max(...roundTimes);
      fastest = Math.min(...roundTimes);
      document.getElementById("fast-val").innerText = "Fastest: " + fastest + " ms";
      document.getElementById("slow-val").innerText = "Slowest: " + slowest + " ms";
      document.getElementById("average-val").innerText = "Average: " + average + " ms";
      stats.style["background-color"] = "#fff";
      targetArea.setAttribute("style", "display: none");
      stats.style.display = "flex";
      stats.style["flex-direction"] = "column";


      let svgWidth = chart.clientWidth, svgHeight = chart.clientHeight, barPadding = 5;
      let barWidth = (svgWidth / roundTimes.length);

      let svg = d3.select('svg')
          .attr("width", svgWidth)
          .attr("height", svgHeight);

      let y = d3.scaleLinear()
          .domain([0, d3.max(roundTimes)])
          .range([0, svgHeight]);
    
      // let x = d3.scaleLinear()
      //     .domain([1, 10])
      //     .range([0, svgWidth]);

      // let xAxis = d3.axisBottom()
      //     .scale(x);

      let barChart = svg.selectAll("rect")
          .data(roundTimes)
          .enter()
          .append("rect")
          .attr("y", function(d) {
            return svgHeight - y(d);
          })
          .attr("height", function(d) { 
            return y(d); 
          }) 
          .attr("width", barWidth - barPadding)
          .attr("transform", function (d, i) {
            let translate = [barWidth * i, 0]; 
            return "translate("+ translate +")";
          });

          // svg.append("g")
          //   .call(xAxis);
    }

  });

});

