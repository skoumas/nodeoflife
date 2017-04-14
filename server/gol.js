function gol (options) {  
	var gridSize = options.gridSize || 100; 
	var shapes = require('./shapes.js');
	var mixColors = require('mix-colors');
	var theGrid = createArray(gridSize);
	clear();

	function createArray(rows) {  
		var arr = [];
		for (var i = 0; i < rows; i++) {  
			arr[i] = [];
		}
		for (var j = 0; j < gridSize; j++) {  
			for (var k = 0; k < gridSize; k++) { 
				arr[j][k] = [0,"#ffffff"]; 
			}
		}
		return arr;
	}

	function getGrid() {
		return theGrid;
	}

	function updateGrid() {  
		var tcolorArray = [];
		tempGrid = createArray(gridSize);
		for (var j = 1; j < gridSize - 1; j++) {  
			for (var k = 1; k < gridSize - 1; k++) {
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
							if (tempGrid[j+1][k+1][0]==1)
							tcolorArray.push (tempGrid[j+1][k+1][1]);
							if (tempGrid[j][k+1][0]==1)
							tcolorArray.push (tempGrid[j][k+1][1]);
							if (tempGrid[j+1][k][0]==1)
							tcolorArray.push (tempGrid[j+1][k][1]);
							if (tempGrid[j-1][k-1][0]==1)
							tcolorArray.push (tempGrid[j-1][k-1][1]);
							if (tempGrid[j][k-1][0]==1)
							tcolorArray.push (tempGrid[j][k-1][1]);
							if (tempGrid[j-1][k][0]==1)
							tcolorArray.push (tempGrid[j-1][k][1]);
							if (tempGrid[j][k][0]==1)
							tcolorArray.push (tempGrid[j][k][1]);
							if (tcolorArray.length>0) {
								tempGrid[j][k][1] = mixColors(tcolorArray);
							}
							
							tempGrid[j][k][0] = 1; 
							break;

						default:
							tempGrid[j][k][0] = 0;  
					}

				} else if (theGrid[j][k][0] === 1) { 

				switch (totalCells) {
					case 0:
					case 1:
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
						tempGrid[j][k][0] = 0;  
						break;
					default:
						tempGrid[j][k][0] = 0;  
				}

			}
		}
	}

		for (var j = 0; j < gridSize; j++) {  
			for (var k = 0; k < gridSize; k++) { 
				theGrid[j][k][0] = tempGrid[j][k][0];
				theGrid[j][k][1] = tempGrid[j][k][1];
			}
		}
	 
	}

	function setGrid(newGrid) {
		theGrid = newGrid;
	}

	function add(x,y,symbol,color) {
	 
		if ((x<gridSize-4 && y<gridSize-4) && (x!=null) && (y!=null)) {
			if (symbol==null || symbol == '') {
				theGrid[x][y][0] = 1;
				theGrid[x][y][1] = color;
			} else {
				theShape = (shapes[symbol]);
				for (var row=0; row<theShape.length;row++) {
					for (var column=0; column<theShape[row].length;column++) {
						theGrid[x+column][y+row][1] = color;
						if (theShape[row][column]==1){
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
		for (var j = 0; j < gridSize; j++) {  
			for (var k = 0; k < gridSize; k++) { 
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
		for (var j = 0; j < gridSize; j++) {  
			for (var k = 0; k < gridSize; k++) { 	 
				theGrid[j][k][0] = 0;
				theGrid[j][k][1] = "#ffffff";
			}
		}
	}

	return {
    clear: function() { clear(); },
		fillRandom: function() {fillRandom(); },
		add: function(x,y,s,c) { add(x,y,s,c); },
		updateGrid: function() { updateGrid(); },
		getGrid: function() { return theGrid; }  
	}
};

module.exports = gol;