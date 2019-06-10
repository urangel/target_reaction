
document.addEventListener("DOMContentLoaded", function(){
  let targetArea = document.getElementById("target-area");
  console.log(targetArea);

  function genTemp() {
    let defaultRow = ". . . . . . . . . . . .";
  
    let gridArr = [];
  
    let targetPos = [Math.floor(Math.random()*12), Math.floor(Math.random()*12)];
    console.log(targetPos);
    let targetX = targetPos[0];
    let targetY = targetPos[1];
  
    for(let i =0; i<12; i++){
      if(i === targetX){
        let targetRow = defaultRow.split(" ");
        targetRow[targetY] = 't';
        targetRow = targetRow.toString().replace(/,/g, " ");
        gridArr.push(targetRow);
        
      } else {
        gridArr.push(defaultRow);
      }
    }
   
    // console.log("\"" + gridArr.toString().replace(/,/g, "\"\"") + "\"");
    let gridTempArea = "\"" + gridArr.toString().replace(/,/g, "\"\"") + "\"";
    console.log(gridTempArea);
    targetArea.setAttribute("style", "grid-template-areas: " + gridTempArea );
    console.log(targetArea);
  }

  genTemp();
  
});