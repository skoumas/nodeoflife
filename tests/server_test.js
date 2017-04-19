var chai = require('chai'), expect = chai.expect, should = chai.should();

describe('Gol', function() {

  it('should be initialized', function( ) {
		var gol = require('../server/gol.js')({gridSize: 50});
		gol.should.be.an('object');
  });

  it('should get healthy grid', function() {
		var gridSize = 50;
    var gol = require('../server/gol.js')({gridSize: gridSize });
		var grid = gol.getGrid();
		grid.should.have.lengthOf(gridSize);
			grid[0].should.have.lengthOf(gridSize);
		grid[0][0].should.have.lengthOf(2);
		expect(grid[0][0]).to.have.any.keys("1", "0");
		grid[0][0][1].should.be.a("string");
  });

  it('should be cleared property', function() {
		var gridSize = 50;
    var gol = require('../server/gol.js')({gridSize: gridSize });
		var grid = gol.getGrid();
		gol.clear();
		grid.should.have.lengthOf(gridSize);
			grid[0].should.have.lengthOf(gridSize);
		grid[0][0].should.have.lengthOf(2);
		expect(grid[0][0][0]).to.equal(0);
		expect(grid[0][0][1]).to.equal('#ffffff');
  });

	it('should be able to add a point succesfully', function() {
		var gridSize = 50;
    var gol = require('../server/gol.js')({gridSize: gridSize });
		var grid = gol.getGrid();
		var oldValue = grid[10][10];
		gol.add(10,10,"block","#d3d3d3");
		var newValue = grid[10][10];
		grid.should.have.lengthOf(gridSize);
		grid[0].should.have.lengthOf(gridSize);
		grid[0][0].should.have.lengthOf(2);
		expect(grid[0][0][0]).to.equal(0);
		expect(grid[0][0][1]).to.equal('#ffffff');
  });

});


describe('Client', function() {
	it('should be able to add a point succesfully', function() {
		var client = require('../client/client.js');
	});

});
