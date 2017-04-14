/* jshint node: true */
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var core = require('./server/core.js');

//SOCKET ON CONNECT
io.on('connect',function(socket) {
  core.updateGrid();
  console.log("user connected");
  io.emit('timer', { 
    data:core.theGrid
    //color: core.colorGrid
  });
	socket.on('click',function(data) {
    core.add(data.x,data.y,data.symbol,data.color);
    io.emit('click', { 
      x:data.x,
      y:data.y,
      symbol:data.symbol,
      color:data.color,
      id:data.id
    });
    // io.emit('timer', { 
    //   data:core.theGrid
    // });
  });

  socket.on('mouseMove',function(data) {
    data.points.forEach(function(point) {
      core.add(point[0],point[1],data.symbol,data.color);
    });
    // io.emit('timer', { 
    //   data:core.theGrid,
    //   color: core.colorGrid
    // });
  });

	socket.on('random',function() {
    core.fillRandom();
  });
	
	socket.on('clear',function() {
    core.clear();
  });

});

setInterval(function() {  
  core.updateGrid();
  io.emit('timer', { 
    data:core.theGrid
   //color: core.colorGrid
  });
},1000);

// setInterval(function() {  
//   core.updateGrid();
// }, 10);

core.fillRandom();
server.listen(3000);