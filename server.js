var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var core = require('./server/core.js');

//SOCKET ON CONNECT
io.on('connect',function(socket) {

	socket.on('click', function (data) {
  	core.add(data.x,data.y,data.symbol,data.color);
  });

	socket.on('random', function (data) {
  	core.fillRandom();
  });
	
	socket.on('clear', function (data) {
  	core.clear();
  });

});

setInterval(function() {  
  core.updateGrid();
 	
  io.emit('timer', { 
		data:core.theGrid
	});

}, 10);

core.fillRandom();
server.listen(3000);