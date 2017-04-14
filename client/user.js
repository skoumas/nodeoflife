'use strict';
/**
 * User is the class that defines a new user and his/her properties
*/
function User() {
	var symbol = "block";
	var color = getRandomColor();
  var id = Math.round(+new Date()/1000);

	/**
	 * Sets a random color for the new user
	 * @return string
	 */
	function getRandomColor() {
	  var letters = "0123456789ABCDEF";
	  var color = "#";
	  for (var i = 0; i < 6; i++ ) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
	}
		
	return {
		setSymbol: function(newsymbol) {symbol = newsymbol},
		getSymbol: function() {return symbol;},
		getId: function() {return id;},
		getColor: function() {return color;},
	}
};