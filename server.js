var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
 
io.on('connect',function(socket){
	socket.on('click', function (data) {
  	add(data.x,data.y,data.symbol,data.color);
  });

socket.on('reset', function (data) {
  	fillRandom();
  });

});


symbols = {
	"block":[],
	"beehive":[],
	"boat":[ ],
	"loaf":[ ],
	"tub": [  ]
	}

 

setInterval(function() {  
  updateGrid();
 	
  io.emit('timer', { 
		data:theGrid,
		color:colorGrid
	});

}, 20);
 

function createArray(rows) {  

	var arr = [];
	for (var i = 0; i < rows; i++) {
		arr[i] = [];

	}
	return arr;

}

function averageColors( colorArray ){
    var red = 0, green = 0, blue = 0;

    for ( var i = 0; i < colorArray.length; i++ ){
        red += hexToR( "" + colorArray[ i ] + "" );
        green += hexToG( "" + colorArray[ i ] + "" );
        blue += hexToB( "" + colorArray[ i ] + "" );
    }

    //Average RGB
    red = (red/colorArray.length);
    green = (green/colorArray.length);
    blue = (blue/colorArray.length);
 
    return rgbToHex(red,green,blue);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//get the red of RGB from a hex value
function hexToR(h) {return parseInt((cutHex( h )).substring( 0, 2 ), 16 )}

//get the green of RGB from a hex value
function hexToG(h) {return parseInt((cutHex( h )).substring( 2, 4 ), 16 )}

//get the blue of RGB from a hex value
function hexToB(h) {return parseInt((cutHex( h )).substring( 4, 6 ), 16 )}

//cut the hex into pieces
function cutHex(h) {if(h.charAt(1) == "x"){return h.substring( 2, 8 );} else {return h.substring(1,7);}}
 
 


gridSize = 300;
var theGrid = createArray(gridSize);
var mirrorGrid = createArray(gridSize);
var colorGrid = createArray(gridSize);
var gridHeight = gridSize;
var gridWidth = gridSize;

function updateGrid() {  

for (var j = 1; j < gridHeight - 1; j++) {  

for (var k = 1; k < gridWidth - 1; k++) {  

var totalCells = 0;

//add up the total values for the surrounding cells

totalCells += theGrid[j - 1][k - 1]; //top left
totalCells += theGrid[j - 1][k]; //top center
totalCells += theGrid[j - 1][k + 1]; //top right
totalCells += theGrid[j][k - 1]; //middle left
totalCells += theGrid[j][k + 1]; //middle right
totalCells += theGrid[j + 1][k - 1]; //bottom left
totalCells += theGrid[j + 1][k]; //bottom center
totalCells += theGrid[j + 1][k + 1]; //bottom right

//apply the rules to each cell
 
if (theGrid[j][k] === 0) {

	switch (totalCells) {
		case 3:
			var colorArray = [];
			//if cell is dead and has 3 neighbours, switch it on
			colorArray.push (colorGrid[j][k]);
			colorArray.push (colorGrid[j+1][k+1]);
			colorArray.push (colorGrid[j][k+1]);
			colorArray.push (colorGrid[j+1][k]);
			colorArray.push (colorGrid[j-1][k-1]);
			colorArray.push (colorGrid[j][k-1]);
			colorArray.push (colorGrid[j-1][k]);
			colorArray.push (colorGrid[j][k]);
			colorGrid[j][k] = averageColors(colorArray);
			mirrorGrid[j][k] = 1; 
			break;

		default:
			mirrorGrid[j][k] = 0; //otherwise leave it dead
	}

} else if (theGrid[j][k] === 1) { //apply rules to living cell

switch (totalCells) {

case 0:

case 1:

	mirrorGrid[j][k] = 0;  

	break;

	case 2:

	case 3:

		mirrorGrid[j][k] = 1;  
		break;

	case 4:

	case 5:

	case 6:

	case 7:

	case 8:

		mirrorGrid[j][k] = 0;  
		break;

	default:

	mirrorGrid[j][k] = 0;  

}

}

}

}
 
	//copy mirrorGrid to theGrid
	for (var j = 0; j < gridHeight; j++) {  
		for (var k = 0; k < gridWidth; k++) { 
			theGrid[j][k] = mirrorGrid[j][k];
		}
	}

}

function add(x,y,symbol,color) {

 
 if ((x<gridSize && y<gridSize) && (x!=null) && (y!=null)) {
} else {
	return;
}
	colorGrid[x][y] = "#000000";

	if (symbol==null) {
		theGrid[x][y] = 1;
	} else if (symbol=="block"){
		theGrid[x][y] = 1;
		theGrid[x+1][y] = 1;
		theGrid[x][y+1] = 1;
		theGrid[x+1][y+1] = 1;
		colorGrid[x][y] = color;
		colorGrid[x][y+1] = color;
		colorGrid[x+1][y] = color;
		colorGrid[x+1][y+1] = color;
  } else if (symbol=="boat") {
		theGrid[x-1][y] = 1;
		theGrid[x-1][y-1] = 1;
		theGrid[x][y-1] = 1;
		theGrid[x][y] = 1;
		theGrid[x+1][y] = 1;
		theGrid[x][y+1] = 1;
 		colorGrid[x-1][y] = color;
		colorGrid[x-1][y-1] = color;
		colorGrid[x][y-1] = color;
		colorGrid[x][y] = color;
		colorGrid[x+1][y] = color;
		colorGrid[x][y+1] = color;

	}	else if (symbol=="blinker") {
		theGrid[x-1][y] = 1;
		theGrid[x+1][y] = 1;
		theGrid[x][y] = 1; 

 		colorGrid[x-1][y] = color;
		colorGrid[x+1][y] = color;
		colorGrid[x][y] = color;
 
}	else if (symbol=="glider") {
		theGrid[x][y-1] = 1;
		theGrid[x+1][y] = 1;
		theGrid[x][y+1] = 1; 
		theGrid[x-1][y+1] = 1; 
		theGrid[x+1][y+1] = 1; 
		 
 		
		colorGrid[x][y-1] = color;
		colorGrid[x+1][y] = color;
		colorGrid[x][y+1] = color; 
		colorGrid[x-1][y+1] = color; 
		colorGrid[x+1][y+1] = color; 
 

}	else if (symbol=="tub") {
		theGrid[x][y-1] = 1;
		theGrid[x+1][y] = 1;
		theGrid[x][y+1] = 1; 
		theGrid[x-1][y] = 1; 
 
		colorGrid[x][y-1] = color;
		colorGrid[x+1][y] = color;
		colorGrid[x][y+1] = color; 
		colorGrid[x-1][y] = color; 
	}

}
 

function rand(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function fillRandom() {  

	for (var j = 0; j < gridHeight; j++) {  
		for (var k = 0; k < gridWidth; k++) {  
			 
			var rawRandom = Math.random();  
			var improvedNum = (rawRandom * 2);  
			var randomBinary = Math.floor(improvedNum);
			colorGrid[j][k] = "#ffffff";
			if (randomBinary === 1) {
				theGrid[j][k] = 0;
			} else {
				theGrid[j][k] = 0;
			}

		}
	}
 
}

fillRandom();


server.listen(3000);