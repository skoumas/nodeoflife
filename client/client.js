"use strict";
var gridSize = 100;
var clickPoints = [];
var theGrid = [];
var gridHeight = gridSize;
var gridWidth = gridSize;
var pressed;
var points = [];
var colorGrid = [];
var id = 0;
var started = false;
var run = true;
var hoverk,hoverj;
var symbol = "block";
var color = getRandomColor();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

 

if (typeof(io) == "undefined"){
  wt("Can't connect to server. Please start node server.js");
} else {
  var socket = io("http://www.skoumas.com:3000");
	init();
}

function init() {
  $("#my_color").css("background-color",color);
  wt("Welcome. Your color is: " + color);
	id = Math.round(+new Date()/1000);
	wt("Welcome. You are user: " + id);
	$("#my_id").html(id);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
	var x,y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
     x = x - $("canvas").offset().left;
     y = y - $("canvas").offset().top;
    x = x /6;
    y = y /6;
    x = Math.round(x);
    y = Math.round(y);
  }
	return [x,y];
}

// EVENTS
$("canvas").click(function(e) {
 
  socket.emit("click",{
    x:getXY(e)[0],
    y:getXY(e)[1],
    symbol:symbol,
    color:color,
		id:id
  });
	add(getXY(e)[0],getXY(e)[1],symbol,color);
  wt(symbol + " placed at (" + getXY(e)[0] + ", " + getXY(e)[1] + ")");
});

$("canvas").mouseup(function(e){
	pressed = false;
	 
	points.forEach(function(point) {
		add(point[0],point[1],symbol,color);
	});
	// socket.emit("mouseMove",{
 //    points:points,
 //    symbol:symbol,
 //    color:color,
	// 	id:id
	// });
	points = [];

});

$("canvas").mousedown(function(e){
	pressed = true;
});

$("canvas").mousemove(function(e){	

	x = getXY(e)[0];
	y = getXY(e)[1];
	hoverj = x;
	hoverk = y;
	drawGrid();
	if (pressed) {
		var x,y;
		x = getXY(e)[0];
	  y = getXY(e)[1];
		socket.emit("click",{
	    x:x,
			y:y,
	    symbol:symbol,
	    color:color
		});
		return;
	}
  if (pressed) {
		points.push([x,y]);
		wt(symbol + " placed at (" + x + ", " + y + ")");
	}
});

function add(x,y,symbol,color) {
	 
	if ((x<gridSize && y<gridSize) && (x!=null) && (y!=null)) {
		if (symbol==null) {
			theGrid[x][y][0] = 1;
		} else {
			var theShape = (shapes[symbol]);
			for (var row=0; row<theShape.length;row++) {
				for (var column=0; column<theShape[row].length;column++) {
					if (theShape[row][column]==1) {
						theGrid[x+column][y+row][1] = color;
						theGrid[x+column][y+row][0] = theShape[row][column];
 					}
				}
			}
		}
		drawGrid();
		//updateGrid();
	}
}

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


socket.on("click", function(data){
  //if (data.id!=id) {
		add(data.x,data.y,data.symbol,data.color);
	//}
});

socket.on("timer", function(data){
	// Update when loaded but do not draw
  theGrid =  ((data.data));
 
});

 

setInterval(function() {  
	//Draw only on timer
  drawGrid();
},1000);

// END SOCKET CONTROL
function drawGrid() {

  ctx.clearRect(0, 0, 600, 600);

  for (var j = 1; j < gridHeight; j++) {
    for (var k = 1; k < gridWidth; k++) {	 
      if (theGrid[j][k][0] == 1) {
				ctx.fillStyle = theGrid[j][k][1];
        ctx.fillRect(j*6, k*6, 6, 6);
      }
    }
  }

	var theShape = (shapes[symbol]);
	for (var row=0; row<theShape.length;row++) {
		for (var column=0; column<theShape[row].length;column++) {
			if (theShape[row][column]==1) {
				ctx.fillStyle = color;
				ctx.fillRect((hoverj+column)*6,(hoverk+row)*6,6,6); 
			}
		}
}


}