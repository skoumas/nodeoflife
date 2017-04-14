"use strict";
var gridSize = 100;
var theGrid = [];
var hoverk,hoverj;
var symbol = "block";
var color = getRandomColor();
var id = Math.round(+new Date()/1000);
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
    x = x /6;
    y = y /6;
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

$("#random").click(function(){
  socket.emit("random");
  wt("Creating random canvas.");
});

$("#clear").click(function(){
  socket.emit("clear");
  wt("Clearing canvas.");
});
 
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
 
function drawGrid() {
  if (typeof(socket)==="undefined") return;
  ctx.clearRect(0, 0, 600, 600);
  for (var j = 1; j < gridSize; j++) {
    for (var k = 1; k < gridSize; k++) {	 
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