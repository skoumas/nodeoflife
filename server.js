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
		data:theGrid
	});

}, 20);
 

function createArray(rows) {  

	var arr = [];
	for (var i = 0; i < rows; i++) {
		arr[i] = [];

	}
	return arr;

}
gridSize = 300;
var theGrid = createArray(gridSize);
var mirrorGrid = createArray(gridSize);
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
			//if cell is dead and has 3 neighbours, switch it on
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

console.log(x,y,symbol,color);
 if ((x<gridSize && y<gridSize) && (x!=null) && (y!=null)) {
} else {
	return;
}
	if (symbol==null) {
		theGrid[x][y] = 1;
	} else if (symbol=="block"){
		theGrid[x][y] = 1;
		theGrid[x+1][y] = 1;
		theGrid[x][y+1] = 1;
		theGrid[x+1][y+1] = 1;
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