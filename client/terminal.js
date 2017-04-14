'use strict';
/**
* Terminal is the class that handles the output to a terminal area
*/

function Terminal(object) {
	var object = object;
	 
	/**
	 * Writes at the terminal
	 * @param {string} message
	 * @return null
	*/
	function write(message) {
		$(object).html( $(object).html() + "<br>$ " + message);
  	$(object).scrollTop(999999);
	}
		
	return {
		write: function(message) {write(message)}
	}
};