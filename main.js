"use strict;" 

var conway;//must be declared in the global scope to be accessed via HTML onclick attibute

var can = document.querySelector("canvas"); //reference to our canvas

var mousedown = false;

//main function is called on windowload event
window.addEventListener("load", function(event) {

	//instantiate game (columns, rows, cellsize, toroidal overlap)
	conway = new Game(50, 40, 7, false);
	pattern = new Pattern(5,5,conway,8);
	conway.initialize(pattern);

});

can.addEventListener("mousedown", function(event){

	updateCanvasCell(can, event, 1, conway.grid.columns, conway.grid.rows);
	mousedown = true;

});

can.addEventListener("mousemove", function(event){

	if(mousedown)updateCanvasCell(can, event, 1, conway.grid.columns, conway.grid.rows);
	

});

can.addEventListener("mouseup", function(event){

	mousedown = false;
	lastCellX = null;
	lastCellY = null;

});

