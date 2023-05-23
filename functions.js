/**
 * Reads mouse pointer position on parameter canvas and returns point object
 * @param {Canvas} canvas 
 * @param {int} borderwidth 
 * @param {Event} event 
 * @returns 
 */
function getMousePos(canvas, borderwidth, event) {
    //for mouse x, y coordinates
    var x,y;
	//This is the current screen rectangle of canvas
	var rect = canvas.getBoundingClientRect(); 
	//Return position offsets as x, y properties
	return {
  		x: event.clientX - rect.left - (borderwidth),
  		y: event.clientY - rect.top - (borderwidth)
	};
}

var lastCellX, lastCellY;
/**
 * Updates instance variables cellX and cellY with cell position
 * @param {Canvas} canvas 
 * @param {Event} event 
 * @param {iny} borderwidth 
 * @param {int} resolutionX 
 * @param {int} resolutionY 
 */
function updateCanvasCell(canvas, event, borderwidth, resolutionX, resolutionY){
	var mousePos = getMousePos(canvas, borderwidth, event);

	//fetch the canvas width and height
	var canvasWidth = canvas.offsetWidth - (2*borderwidth);
	var canvasHeight = canvas.offsetHeight - (2*borderwidth);
		
	//to accomodate for canvas resizing		
	cellX = Math.floor(mousePos.x / (canvasWidth / resolutionX));
	cellY = Math.floor(mousePos.y / (canvasHeight / resolutionY));

	event.preventDefault();

	const button = event.button;

		    switch(button) {
		    	case 0:
		    		//console.log(cellX, cellY, conway.grid.isOn(cellY, cellX));
		    		if(cellX!=lastCellX || cellY!=lastCellY ){
		    			if(conway.grid.isOn(cellY, cellX))conway.grid.turnOff(cellY, cellX);
		    			else conway.grid.turnOn(cellY, cellX);
		    			conway.grid.draw();
		    		}
		    	case 1:
		    		//action to take on middle button click
		    	case 2:
		    		//action to take on right button click
		    }
	lastCellX = cellX;
	lastCellY = cellY;

}
