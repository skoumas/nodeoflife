var gridSize = 300;
var symbol = null;
var x;
var y;
var theGrid = [];
var gridHeight = gridSize;
var gridWidth = gridSize;
var theGrid = [];
var colorGrid = [];

var socket = io('http://localhost:3000');
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var color = getRandomColor();
var colorGrid = [];
init();

function init() {
	$("#my_color").css("background-color",color);
	wt("Welcome. Your color is: " + color);
}

function wt(message){ 
	$("#terminal_inner").html( $("#terminal_inner").html() + "<br>$ " + message);
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
$("canvas").click(function(e){
	getXY(e);
	socket.emit("click",{ 
		x:x, 
		y:y,
		symbol:symbol,
		color:color,
	});
});

$("canvas").mousemove(function(e){
	if(e.which == 1){
			getXY(e);
	    socket.emit("click",{ 
			x:x, 
			y:y,
			symbol:symbol,
			color:color,
		}); 
  }
});

$(".symbol").click(function(e){
	$(".symbol").removeClass("selected-symbol");
	symbol = $(this).attr("data-id");
	wt("Selected '" + symbol + "'");
	$(this).addClass("selected-symbol");
})

$("#random").click(function(e){
	socket.emit("random");
});

$("#clear").click(function(e){
	socket.emit("clear");
});
// END EVENTS


// SOCKET CONTROL
socket.on('connect', function(data){
	wt("Connected with server");
});

socket.on('disconnect', function(data){	 
	wt("Disconnected from server");
});

socket.on('timer', function(data){	 
	theGrid = data.data;
	colorGrid = data.color;
	drawGrid()
});
// END SOCKET CONTROL


function drawGrid() { 
	ctx.clearRect(0, 0, 500, 500);
	for (var j = 1; j < gridHeight; j++) {  
		for (var k = 1; k < gridWidth; k++) {  
			if (theGrid[j][k] === 1) {
				ctx.fillStyle = colorGrid[j][k];
				ctx.fillStyle = "red";
				ctx.fillRect(j, k, 1, 1);
			}

		}

	}
}