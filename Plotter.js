class Plotter{
	// declaration of variables
	x; y; 

	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	initialize(){
		// a graph
		// for(let i = 0; i<1000; i++){
		// 	this.x = i;
		// 	this.draw();
		// }
	}

	draw(x, y){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = "blue";
		ctx.fillRect(x, y, 1, 1); //paints cells
	}
}