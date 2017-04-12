var assert = require('assert');
describe('Core', function() {
  
	describe('#core.createArray()', function() {
    it('should create array', function(done) {
      var core = require('../server/core.js');
      array = core.createArray(300); 
			if (array instanceof Array) 
        done();
    });
  });

 

});