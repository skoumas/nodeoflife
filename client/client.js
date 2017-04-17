'use strict';
// Main objects
$(function(){

  // Here we store all the objects we need
  var model = {
    user: User,
    terminal: new Terminal($("#terminal_inner")),
    gol: new Gol($("canvas")),
    socket: null,
    url: "www.skoumas.com"
  };
 
  var controller = {

    init: function() {
      // Check if server is online
      if (typeof(io) == "undefined"){
        terminal.write("Can't connect to server. Please start node server.js");
      } else {
        model.socket = io("http://" + model.url + ":3000");
        $("#my_color").css("background-color",model.user.getColor());
        $("#my_id").html(model.user.getId());
        model.terminal.write("Welcome. Your color is: " + model.user.getColor());
        model.terminal.write("Welcome. You are user: " + model.user.getId());
				view.init();
      }

      if (typeof(model.socket)!=="undefined"){

        model.socket.on("connect", function(){
          model.gol.setSocket(model.socket);
          model.gol.setUser(model.user);
          model.gol.setTerminal(model.terminal);
          model.gol.init();
          model.terminal.write("Connected with server");
          setInterval(function(){
            view.refresh();
          },1000);
        });

        model.socket.on("disconnect", function(){
          model.terminal.write("Disconnected from server");
        });

        model.socket.on("click", function(data){
          model.gol.add(data.x,data.y,data.symbol,data.color);
        });

        model.socket.on("timer", function(data){
          model.gol.setGrid(data.data);
        });
      }
    }
  }
  
  var view = {
    init: function() {
      // When the symbol is switched
      $(".symbol").click(function(){
        $(".symbol").removeClass("selected-symbol");
        model.user.setSymbol( $(this).attr("data-id"));
        model.terminal.write("Selected '" + model.user.getSymbol() + "'");
        $(this).addClass("selected-symbol");
      })
      // Clear the socket
      $("#clear").click(function(){
        model.socket.emit("clear");
        model.terminal.write("Clearing canvas.");
      });
    },

		refresh: function() {
			model.gol.drawGrid();
		}
  }

  controller.init();

}());