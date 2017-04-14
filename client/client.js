'use strict';
// Main objects
var user = new User(); //Create the new user
var terminal = new Terminal($("#terminal_inner")); //Load the terminal
var gol = new Gol($("canvas")); //Load the canvas gol visualizer

// Check if server is online
if (typeof(io) == "undefined"){
  terminal.write("Can't connect to server. Please start node server.js");
} else {
  var socket = io("http://www.skoumas.com:3000");
	$("#my_color").css("background-color",user.getColor());
	$("#my_id").html(user.getId());
	terminal.write("Welcome. Your color is: " + user.getColor());
	terminal.write("Welcome. You are user: " + user.getId());
}

if (typeof(socket)!=="undefined"){

	socket.on("connect", function(){
	  terminal.write("Connected with server");
		setInterval(function() {  
		  gol.drawGrid();
		},1000);
	});

	socket.on("disconnect", function(){
	  terminal.write("Disconnected from server");
	});

	socket.on("click", function(data){
		gol.add(data.x,data.y,data.symbol,data.color);
	});

	socket.on("timer", function(data){
	  gol.setGrid(data.data);
	});

}

// When the symbol is switched
$(".symbol").click(function(){
  $(".symbol").removeClass("selected-symbol");
  user.setSymbol( $(this).attr("data-id"));
  terminal.write("Selected '" + user.getSymbol() + "'");
  $(this).addClass("selected-symbol");
})

// Clear the socket
$("#clear").click(function(){
  socket.emit("clear");
  terminal.write("Clearing canvas.");
});