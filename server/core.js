var gridSize = 100; 
var shapes = require('./shapes.js');
var gridHeight = gridSize;
var gridWidth = gridSize;
var theGrid = createArray(gridSize);
var colorGrid = createArray(gridSize);
 var mixColors = require('mix-colors');

function createArray(rows) {  
	var arr = [];
	for (var i = 0; i < rows; i++) {  
		arr[i] = [];
	}
	for (var j = 0; j < gridHeight; j++) {  
		for (var k = 0; k < gridWidth; k++) { 
			arr[j][k] = [0,"#000000"]; 
		}
	}
	 
	return arr;
}

//THIRD PARTY
function averageColors(colorArray){
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
	var tcolorArray = [];
	tempGrid = createArray(gridSize);
	for (var j = 1; j < gridHeight - 1; j++) {  
		for (var k = 1; k < gridWidth - 1; k++) {
			tempGrid[j][k][1] = theGrid[j][k][1];

			var totalCells = 0;
			totalCells += theGrid[j - 1][k - 1][0];
			totalCells += theGrid[j - 1][k][0]; 
			totalCells += theGrid[j - 1][k + 1][0]; 
			totalCells += theGrid[j][k - 1][0]; 
			totalCells += theGrid[j][k + 1][0]; 
			totalCells += theGrid[j + 1][k - 1][0]; 
			totalCells += theGrid[j + 1][k][0]; 
			totalCells += theGrid[j + 1][k + 1][0]; 
 
			if (theGrid[j][k][0] === 0) {

				switch (totalCells) {
					case 3:
						// Question 4 
						tcolorArray = [];
						tcolorArray.push (tempGrid[j+1][k+1][1]);
						tcolorArray.push (tempGrid[j][k+1][1]);
						tcolorArray.push (tempGrid[j+1][k][1]);
						tcolorArray.push (tempGrid[j-1][k-1][1]);
						tcolorArray.push (tempGrid[j][k-1][1]);
						tcolorArray.push (tempGrid[j-1][k][1]);
						tcolorArray.push (tempGrid[j][k][1]);
						tempGrid[j][k][1] = mixColors(tcolorArray);
						tempGrid[j][k][0] = 1; 
						break;

					default:
						tempGrid[j][k][1] = "#ffffff";
						tempGrid[j][k][0] = 0;  
				}

			} else if (theGrid[j][k][0] === 1) { 

			switch (totalCells) {
				case 0:
				case 1:
					tempGrid[j][k][1] = "#ffffff";
					tempGrid[j][k][0] = 0;  
					break;
				case 2:
				case 3:
					tempGrid[j][k][0] = 1;  
					break;
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					tempGrid[j][k][1] = "#ffffff";
					tempGrid[j][k][0] = 0;  
					break;
				default:
					tempGrid[j][k][1] = "#ffffff";
					tempGrid[j][k][0] = 0;  
			}

		}
	}
}

	for (var j = 0; j < gridHeight; j++) {  
		for (var k = 0; k < gridWidth; k++) { 
			theGrid[j][k][0] = tempGrid[j][k][0];
			theGrid[j][k][1] = tempGrid[j][k][1];
		}
	}
 
}

function add(x,y,symbol,color) {
 
	if ((x<gridSize-4 && y<gridSize-4) && (x!=null) && (y!=null)) {
		if (symbol==null || symbol == '') {
			theGrid[x][y][0] = 1;
			theGrid[x][y][1] = color;
		} else {
			theShape = (shapes.shapes[symbol]);
			for (var row=0; row<theShape.length;row++) {
				for (var column=0; column<theShape[row].length;column++) {
					if (theShape[row][column]==1){
						theGrid[x+column][y+row][1] = color;
						theGrid[x+column][y+row][0] = theShape[row][column];
					}
				}
			}
		}
		updateGrid();
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
				theGrid[j][k][0] = 1;
				theGrid[j][k][1] = "#000000";
			} else {
				theGrid[j][k][0] = 0;
				theGrid[j][k][1] = "#ffffff";
			}
		}
	}
}


function clear() {  
	for (var j = 0; j < gridHeight; j++) {  
		for (var k = 0; k < gridWidth; k++) { 	 
			theGrid[j][k][0] = 0;
			theGrid[j][k][1] = "#ffffff";
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