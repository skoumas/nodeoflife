var chai = require('chai'), expect = chai.expect, should = chai.should();
var jsdom = require('mocha-jsdom');

describe('Gol', function() {
	
	/**
	  * Checks if the gol function exists and is being initialized.
	*/
  it('should be initialized', function( ) {
		var gol = require('../server/gol.js')({gridSize: 50});
		gol.should.be.an('object');
  });

  /**
	  * Checks if the produces grid is as required.
	*/
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

	/**
	  * Checks if the array is being cleared properly
	*/
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

	/**
	  * Checks if the array succesfuly adds a new shape
	*/
	it('should be able to add a point succesfully', function() {
		var gridSize = 50;
		let x,y;
		x = 20;
		y = 20;
    var gol = require('../server/gol.js')({ gridSize: gridSize });
		var grid = gol.getGrid();
		let oldValue = grid[x][y][1];
		gol.add(x,y,"block","#d3d3d3");
		let newValue = grid[x][y][1];
		expect(oldValue).to.not.equal(newValue);
	});
});