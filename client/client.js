"use strict";
var gridSize = 300;
var x;
var y;
var theGrid = [];
var gridHeight = gridSize;
var gridWidth = gridSize;
var colorGrid = [];
var symbol = "block";
var color = getRandomColor();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

if (typeof(io) == "undefined"){
  wt("Can't connect to server. Please start node server.js");
} else {
  var socket = io("http://www.skoumas.com:3000");
}

function init() {
  $("#my_color").css("background-color",color);
  wt("Welcome. Your color is: " + color);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

init();

function wt(message) {
  $("#terminal_inner").html( $("#terminal_inner").html() + "<br>$ " + message);
  $("#terminal_inner").scrollTop(999999);
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
$("canvas").click(function(e) {
  getXY(e);
  socket.emit("click",{
    x:x,
    y:y,
    symbol:symbol,
    color:color
  });
  wt(symbol + " placed at (" + x + ", " + y + ")");
});

$("canvas").mousemove(function(e){
  if(e.which == 1){
      getXY(e);
      socket.emit("click",{
      x:x,
      y:y,
      symbol:symbol,
      color:color
    });
    wt(symbol + " placed at (" + x + ", " + y + ")");
  }
});

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
// END EVENTS

// SOCKET CONTROL
socket.on("connect", function(){
  wt("Connected with server");
});

socket.on("disconnect", function(){
  wt("Disconnected from server");
});

socket.on("timer", function(data){
  theGrid = data.data;
  drawGrid()
});
// END SOCKET CONTROL

function drawGrid() {
  ctx.clearRect(0, 0, 500, 500);
  for (var j = 1; j < gridHeight; j++) {
    for (var k = 1; k < gridWidth; k++) {
      if (theGrid[j][k] === 1) {
        //ctx.fillStyle = colorGrid[j][k];
        ctx.fillStyle = "red";
        ctx.fillRect(j, k, 1, 1);
      }
    }
  }
}