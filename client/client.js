'use strict';
var gridSize = 50;
var theGrid = [];
var hoverk,hoverj;
var multiplier = 14;
var symbol = "block";
var color = getRandomColor();
var id = Math.round(+new Date()/1000);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

if (typeof(socket)!=="undefined") {

	socket.on("connect", function(){
	  wt("Connected with server");
		setInterval(function() {  
		  drawGrid();
		},1000);
	});

	socket.on("disconnect", function(){
	  wt("Disconnected from server");
	});

	socket.on("click", function(data){
		add(data.x,data.y,data.symbol,data.color);
	});

	socket.on("timer", function(data){
	  theGrid = ((data.data));
	});

}

if (typeof(io) == "undefined"){
  wt("Can't connect to server. Please start node server.js");
} else {
  var socket = io("http://www.skoumas.com:3000");
	init();
}

function init() {
  $("#my_color").css("background-color",color);
	$("#my_id").html(id);
	wt("Welcome. Your color is: " + color);
	wt("Welcome. You are user: " + id);
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

function getXY(e) {
	var x,y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
    x = x - $("canvas").offset().left;
    y = y - $("canvas").offset().top;
    x = x / multiplier;
    y = y / multiplier;
    x = Math.round(x);
    y = Math.round(y);
  }
	return [x,y];
}

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

$("canvas").mousemove(function(e){	
	hoverj = getXY(e)[0];
	hoverk = getXY(e)[1];
	drawGrid();
});

function add(x,y,symbol,color) {
	if ((x<gridSize-6 && y<gridSize-6) && (x!=null) && (y!=null)) {
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
	}
}

$(".symbol").click(function(){
  $(".symbol").removeClass("selected-symbol");
  symbol = $(this).attr("data-id");
  wt("Selected '" + symbol + "'");
  $(this).addClass("selected-symbol");
})

$("#clear").click(function(){
  socket.emit("clear");
  wt("Clearing canvas.");
});
 

 
function drawGrid() {

  if (typeof(socket)==="undefined") return;
  ctx.clearRect(0, 0, 100 * multiplier, 100 * multiplier);
  for (var j = 1; j < gridSize; j++) {
    for (var k = 1; k < gridSize; k++) {	 
      if (theGrid[j][k][0] == 1) {
				ctx.fillStyle = theGrid[j][k][1];
        ctx.fillRect(j*multiplier, k*multiplier, multiplier, multiplier);
      }
    }
  }

	var theShape = (shapes[symbol]);
	for (var row=0; row<theShape.length;row++) {
		for (var column=0; column<theShape[row].length;column++) {
			if (theShape[row][column]==1) {
				ctx.fillStyle = color;
				ctx.fillRect((hoverj+column)*multiplier,(hoverk+row)*multiplier,multiplier,multiplier); 
			}
		}
	}

	for (var j = multiplier; j < gridSize * multiplier; j=j+multiplier) {
		ctx.beginPath();
		ctx.strokeStyle = "#f3f3f3"; 
		ctx.moveTo(j,0);
		ctx.lineTo(j,gridSize * multiplier);
		ctx.stroke();
	}

	for (var k = multiplier; k < gridSize * multiplier; k=k+multiplier) {
		ctx.beginPath();
		ctx.strokeStyle = "#f3f3f3";
		ctx.moveTo(0,k);
		ctx.lineTo(gridSize * multiplier,k);
		ctx.stroke();
	}

}