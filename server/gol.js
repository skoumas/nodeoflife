/**
* Gol is the class that implements the Game of Life.
*/
/*jslint for:true */
function gol (options) {
  var gridSize = options.gridSize || 100;
  var shapes = require("./shapes.js");
  var mixColors = require("mix-colors");
  var theGrid = createArray(gridSize);
  clear();

  /**
   * Creates multidimensional array to store the pixel properties
   * @return array
  */
  function createArray(rows){
    var arr = [];
    for (var i = 0; i < rows; i++){
      arr[i] = [];
    }
    for (var j = 0; j < gridSize; j++){
      for (var k = 0; k < gridSize; k++){
        arr[j][k] = [0,"#ffffff"];
      }
    }
    return arr;
  }

  /**
   * Returns the grid
   * @return array
  */
  function getGrid(){
    return theGrid;
  }

  /**
   * Sets the grid to a new value
   * @param {array} newGrid
   * @return null
  */
  function setGrid(newGrid){
    theGrid = newGrid;
  }

  /**
   * Gets the number of active cells around one cell
   * @param {integer} j the X position of the cell we want to track
   * @param {integer} k the Y position of the cell we want to track
   * @return integer The number of the active cells
  */
  function getTotalCells(j,k){
    var totalCells = 0;
    totalCells += theGrid[j - 1][k - 1][0];
    totalCells += theGrid[j - 1][k][0];
    totalCells += theGrid[j - 1][k + 1][0];
    totalCells += theGrid[j][k - 1][0];
    totalCells += theGrid[j][k + 1][0];
    totalCells += theGrid[j + 1][k - 1][0];
    totalCells += theGrid[j + 1][k][0];
    totalCells += theGrid[j + 1][k + 1][0];
    return totalCells;
  }

  
  /**
   * Sets a color based on the neighbour colors (only active cells)
   * @param {integer} j the X position of the cell we want to change color
   * @param {integer} k the Y position of the cell we want to change color
   * @param {array} tempGrid We pass the grid of the cells in this function
   * @return string The color in HEX 
  */
  function setAverageColor(j,k,tempGrid){
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
      return mixColors(tcolorArray);
    } else {
      return tempGrid[j][k][1];
    }
  }

  /**
   * The main loop function that applies the Game of Life logic.
   * @return null
  */
  function updateGrid(){
    var tcolorArray = [];
    tempGrid = createArray(gridSize);
    for (var j = 1; j < gridSize - 1; j++){
      for (var k = 1; k < gridSize - 1; k++){
        tempGrid[j][k][1] = theGrid[j][k][1];
        var totalCells = getTotalCells(j,k);

        if (theGrid[j][k][0] === 0) {

          switch (totalCells) {
            case 3:
              tempGrid[j][k][1] = setAverageColor(j,k,tempGrid);
              tempGrid[j][k][0] = 1;
              break;

            default:
              tempGrid[j][k][0] = 0;
          }
        } else if (theGrid[j][k][0] === 1){
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

    for (var j = 0; j < gridSize; j++){
      for (var k = 0; k < gridSize; k++){
        theGrid[j][k][0] = tempGrid[j][k][0];
        theGrid[j][k][1] = tempGrid[j][k][1];
      }
    }
  }

  /**
   * Adds a new symbol to the grid
   * @param {x} x
   * @param {y} y
   * @param {symbol} symbol
   * @param {color} color
   * @return null
  */
  function add(x,y,symbol,color){
    if ((x<gridSize-4 && y<gridSize-4) && (x!=null) && (y!=null)){
      if (symbol==null || symbol == "") {
        theGrid[x][y][0] = 1;
        theGrid[x][y][1] = color;
      } else {
        theShape = (shapes[symbol]);
        for (var row=0; row<theShape.length;row++){
          for (var column=0; column<theShape[row].length;column++){
            theGrid[x+column][y+row][1] = color;
            if (theShape[row][column]==1){
              theGrid[x+column][y+row][0] = theShape[row][column];
            }
          }
        }
      }
    }
  }

  /**
   * Helping function for random number generation
   * @return integer
  */
  function rand(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Creates a random distribution of on and off cells
   * @return null
  */
  function fillRandom(){
    for (var j = 0; j < gridSize; j++){
      for (var k = 0; k < gridSize; k++){
        var rawRandom = Math.random();
        var improvedNum = (rawRandom * 2);
        var randomBinary = Math.floor(improvedNum);
        if (randomBinary === 1){
          theGrid[j][k][0] = 1;
          theGrid[j][k][1] = "#000000";
        } else {
          theGrid[j][k][0] = 0;
          theGrid[j][k][1] = "#ffffff";
        }
      }
    }
  }

  /**
   * Clears the grid to a null/empty one
   * @return null
  */
  function clear(){
    for (var j = 0; j < gridSize; j++){
      for (var k = 0; k < gridSize; k++){
        theGrid[j][k][0] = 0;
        theGrid[j][k][1] = "#ffffff";
      }
    }
  }

  return{
    clear: function() { clear(); },
    fillRandom: function() {fillRandom(); },
    add: function(x,y,s,c) { add(x,y,s,c); },
    updateGrid: function() { updateGrid(); },
    getGrid: function() { return theGrid; }
  }
};

module.exports = gol;