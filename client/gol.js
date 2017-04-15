"use strict";
/**
* Gol is an abstract base class that displays the pixel grid
*/
function Gol(object) {
  var gridSize = 50;
  var theGrid = [];
  var c = object[0];
  var ctx = c.getContext("2d");
  var hoverk;
  var hoverj;
  var multiplier = 1
  var socket;
  /**
    * Gets the exact X Y from the canvas pixels to the absolute pixel
    * @param {event} e
    * @return null
  */
  function getXY(e) {
    var x;
    var y;
    if (e.pageX || e.pageY){
      x = e.pageX;
      y = e.pageY;
      x = x - object.offset().left;
      y = y - object.offset().top;
      x = x / multiplier;
      y = y / multiplier;
      x = Math.round(x);
      y = Math.round(y);
    }
    return [x,y];
  }

  /**
   * When the canvas is clicked
   * @param {event} e
   * @return null
  */
  object.click(function(e){
    socket.emit("click",{
      x:getXY(e)[0],
      y:getXY(e)[1],
      symbol:user.getSymbol(),
      color:user.getColor(),
      id:user.getId()
    });
    add(getXY(e)[0],getXY(e)[1],user.symbol,user.getColor());
    terminal.write(user.getSymbol() + " placed at (" + getXY(e)[0] + ", " + getXY(e)[1] + ")");
  });

  /**
    * when we move the mouse over the canvas
    * @param {event} e
    * @return null
  */
  object.mousemove(function(e){ 
    hoverj = getXY(e)[0];
    hoverk = getXY(e)[1];
    drawGrid();
  });

  /**
   * Adds a new symbol to the canvas
   * @param {integer} x : The X pixel
   * @param {integer} y : The Y pixel
   * @param {string} symbol : The type of symbol
   * @param {string} color : The hex color to draw
   * @return null
  */
  function add(x,y,symbol,color){
    if ((x<gridSize-6 && y<gridSize-6) && (x!=null) && (y!=null)) {
      if (symbol==null) {
        theGrid[x][y][0] = 1;
      } else {
        var theShape = (shapes[user.getSymbol()]);
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

  /**
   * Draws the pixels, the hover symbol and the grid
   * @return null
  */
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

    var theShape = (shapes[user.getSymbol()]);
    for (var row=0; row<theShape.length;row++) {
      for (var column=0; column<theShape[row].length;column++) {
        if (theShape[row][column]==1) {
          ctx.fillStyle = user.getColor();
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

  return {
    setSocket: function(newsocket) {socket = newsocket;},
    setGrid: function(newGrid) {theGrid = newGrid},
    getGrid: function() {return theGrid;},
    drawGrid: function() {return drawGrid();},
    add: function(x,y,symbol,color) { add(x,y,symbol,color);}
  }
}