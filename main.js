"use strict;" 

var conway;//must be declared in the global scope to be accessed via HTML onclick attibute

var can = document.querySelector("canvas"); //reference to our canvas

var mousedown = false;

/**
 * main function is called on windowload event
 */
window.addEventListener("load", function(event) {

	//instantiate game (columns, rows, cellsize, toroidal overlap)
	conway = new Game(50, 40, 7, false);
	pattern = new Pattern(6,5,conway,10);
	conway.initialize(pattern);

});

/**
 * listen for a mouse click event
 */
can.addEventListener("mousedown", function(event){

	updateCanvasCell(can, event, 1, conway.grid.columns, conway.grid.rows);
	mousedown = true;

});

/**
 * listen for the mouses movement
 */
can.addEventListener("mousemove", function(event){

	if(mousedown)updateCanvasCell(can, event, 1, conway.grid.columns, conway.grid.rows);
	

});

/**
 * listen for the end of a mouse click
 */
can.addEventListener("mouseup", function(event){

	mousedown = false;
	lastCellX = null;
	lastCellY = null;

});

