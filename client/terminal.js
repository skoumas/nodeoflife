function Terminal(object) {
	var object = object;
	 
	function write(message) {
		$(object).html( $(object).html() + "<br>$ " + message);
  	$(object).scrollTop(999999);
	}
		
	return {
		write: function(message) {write(message)}
	}
};