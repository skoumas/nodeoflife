gridSize = 300; 

var gridHeight = gridSize;
var gridWidth = gridSize;
var theGrid = createArray(gridSize);
var mirrorGrid = createArray(gridSize);
var colorGrid = createArray(gridSize);

function createArray(rows) {  
	var arr = [];
	for (var i = 0; i < rows; i++) {
		arr[i] = [];
	}
	return arr;
}

// THIRD PARTY
function averageColors( colorArray ){
  var red = 0, green = 0, blue = 0;

  for ( var i = 0; i < colorArray.length; i++ ){
    red += hexToR( "" + colorArray[ i ] + "" );
    green += hexToG( "" + colorArray[ i ] + "" );
    blue += hexToB( "" + colorArray[ i ] + "" );
  }

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
function hexToR(h) {return parseInt((cutHex( h )).substring( 0, 2 ), 16 )}
function hexToG(h) {return parseInt((cutHex( h )).substring( 2, 4 ), 16 )}
function hexToB(h) {return parseInt((cutHex( h )).substring( 4, 6 ), 16 )}
function cutHex(h) {if(h.charAt(1) == "x"){return h.substring( 2, 8 );} else {return h.substring(1,7);}}
// END THIRD PARTY


function updateGrid() {  

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
						mirrorGrid[j][k] = 1; 
						break;

					default:
						mirrorGrid[j][k] = 0;  
				}

			} else if (theGrid[j][k] === 1) { 

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
			colorGrid[j][k] = "#000000";
			if (randomBinary === 1) {
				theGrid[j][k] = 1;
			} else {
				theGrid[j][k] = 0;
			}

		}
	}
}

function clear() {  
	for (var j = 0; j < gridHeight; j++) {  
		for (var k = 0; k < gridWidth; k++) {  
			colorGrid[j][k] = "#ffffff";		 
			theGrid[j][k] = 0;
		}
	}
}

// Module Exports
module.exports.theGrid = theGrid;
module.exports.colorGrid = colorGrid;
module.exports.updateGrid = updateGrid;
module.exports.add = add;
module.exports.clear = clear;
module.exports.createArray = createArray;
module.exports.fillRandom = fillRandom;