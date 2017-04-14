/* jshint node: true */
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gol = require('./server/core.js');

//SOCKET ON CONNECT
io.on('connect',function(socket) {
  
  
  gol.updateGrid();

  io.emit('timer', { 
    data:gol.theGrid
  });

	socket.on('click',function(data) {
    gol.add(data.x,data.y,data.symbol,data.color);
    io.emit('click', { 
      x:data.x,
      y:data.y,
      symbol:data.symbol,
      color:data.color,
      id:data.id
    });
  });
	
	socket.on('clear',function() {
    gol.clear();
  });

});

setInterval(function() {  
  gol.updateGrid();
  io.emit('timer', { 
    data:gol.theGrid
  });
},1000);

server.listen(3000);