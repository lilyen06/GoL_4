class Plotter{
	// declaration of variables
	cellPosX; cellPosY; 

	constructor(x,y){
		this.cellPosX = x;
		this.cellPosY = y;
	}

	initialize(){
	// a graph
		this.draw();
	}

	draw(){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = "blue";
		ctx.fillRect(this.cellPosX, this.cellPosY, 2, 2); //paints cells
	}
}