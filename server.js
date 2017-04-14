/* jshint node: true */
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gol = require('./server/gol.js')({gridSize: 50});

io.on('connect',function(socket) {

  io.emit('timer', { 
    data:gol.getGrid()
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
    data:gol.getGrid()
  });
},1000);

server.listen(3000);