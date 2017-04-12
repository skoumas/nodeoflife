"use strict";
var gridSize = 300;
var x;
var y;
var theGrid = [];
var gridHeight = gridSize;
var gridWidth = gridSize;
var colorGrid = [];
var started = false;
var run = true;
var symbol = "block";
var color = getRandomColor();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

if (typeof(io) == "undefined"){
  wt("Can't connect to server. Please start node server.js");
} else {
  var socket = io("http://localhost:3000");
}

function init() {
  $("#my_color").css("background-color",color);
  wt("Welcome. Your color is: " + color);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

init();

function wt(message) {
  $("#terminal_inner").html( $("#terminal_inner").html() + "<br>$ " + message);
  $("#terminal_inner").scrollTop(999999);
}

function tick() {
	if (!run) return;
	drawGrid();
  updateGrid();
  requestAnimationFrame(tick);
}

// function tick() {

// setInterval(function(){ 
// if (!run) return;
// 	drawGrid();
//   updateGrid();
// }, 10);
// }




function createArray(rows) {  
	var arr = [];
	for (var i = 0; i < rows; i++) {
		arr[i] = [];
	}
	return arr;
}

function updateGrid() { 
  var tempGrid = createArray(gridSize);
  for (var j = 1; j < gridHeight - 1; j++) {  
    for (var k = 1; k < gridWidth - 1; k++) {  

      var totalCells = 0;
      totalCells += theGrid[j - 1][k - 1];
      totalCells += theGrid[j - 1][k]; 
      totalCells += theGrid[j - 1][k + 1]; 
      totalCells += theGrid[j][k - 1]; 
      totalCells += theGrid[j][k + 1]; 
      totalCells += theGrid[j + 1][k - 1]; 
      totalCells += theGrid[j + 1][k]; 
      totalCells += theGrid[j + 1][k + 1]; 

      if (theGrid[j][k] === 0) {

        switch (totalCells) {
          case 3:
            // Question 4 
            // var colorArray = [];
            // colorArray.push (colorGrid[j][k]);
            // colorArray.push (colorGrid[j+1][k+1]);
            // colorArray.push (colorGrid[j][k+1]);
            // colorArray.push (colorGrid[j+1][k]);
            // colorArray.push (colorGrid[j-1][k-1]);
            // colorArray.push (colorGrid[j][k-1]);
            // colorArray.push (colorGrid[j-1][k]);
            // colorArray.push (colorGrid[j][k]);
            // colorGrid[j][k] = averageColors(colorArray); 
            tempGrid[j][k] = 1; 
            break;

          default:
            tempGrid[j][k] = 0;  
        }

      } else if (theGrid[j][k] === 1) { 

      switch (totalCells) {
        case 0:
        case 1:
          tempGrid[j][k] = 0;  
          break;
        case 2:
        case 3:
          tempGrid[j][k] = 1;  
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          tempGrid[j][k] = 0;  
          break;
        default:
          tempGrid[j][k] = 0;  
      }

    }
  }
}

  for (var j = 0; j < gridHeight; j++) {  
    for (var k = 0; k < gridWidth; k++) { 
      theGrid[j][k] = tempGrid[j][k];
    }
  }


}

function getXY(e) {
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
     x = x - $("canvas").offset().left;
     y = y - $("canvas").offset().top;
    x = x /2;
    y = y /2;
    x = Math.round(x);
    y = Math.round(y);
  }
}

// EVENTS
$("canvas").click(function(e) {
  getXY(e);
  socket.emit("click",{
    x:x,
    y:y,
    symbol:symbol,
    color:color
  });
  wt(symbol + " placed at (" + x + ", " + y + ")");
});

$("canvas").mousemove(function(e){
  if(e.which == 1){
      getXY(e);
      socket.emit("click",{
      x:x,
      y:y,
      symbol:symbol,
      color:color
    });
    wt(symbol + " placed at (" + x + ", " + y + ")");
  }
});

$(".symbol").click(function(){
  $(".symbol").removeClass("selected-symbol");
  symbol = $(this).attr("data-id");
  wt("Selected '" + symbol + "'");
  $(this).addClass("selected-symbol");
})

$("#random").click(function(){
  socket.emit("random");
  wt("Creating random canvas.");
});

$("#clear").click(function(){
  socket.emit("clear");
  wt("Clearing canvas.");
});
// END EVENTS

// SOCKET CONTROL
socket.on("connect", function(){
  wt("Connected with server");
});

socket.on("disconnect", function(){
  wt("Disconnected from server");
});

socket.on("timer", function(data){
	theGrid = [];
  theGrid = data.data;
	drawGrid();
	if (!started) {
		tick();
		started = true;
	}
	
  //drawGrid();
});
// END SOCKET CONTROL

function drawGrid() {
  ctx.clearRect(0, 0, 500, 500);
  for (var j = 1; j < gridHeight; j++) {
    for (var k = 1; k < gridWidth; k++) {
      if (theGrid[j][k] === 1) {
        //ctx.fillStyle = colorGrid[j][k];
        ctx.fillStyle = "red";
        ctx.fillRect(j, k, 1, 1);
      }
    }
  }
}