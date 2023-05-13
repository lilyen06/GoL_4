class Plotter{
	// declaration of variables
	x; y; xAxis; yAxis;

	/**
	 * Construct a plotter object with assigned length of X and Y axes
	 * @param {int} x 
	 * @param {int} y 
	 */
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.xAxis=250;
		this.yAxis=135;
	}

	/**
	 * Initializes the graph on the Generation Plotter canvas and draws the axes
	 */
	initialize(){
		// a graph
		var c = document.getElementById("graph");
		var ctx = c.getContext("2d");

		// labels the two graphs by the colour
		// ctx.fillStyle = "blue";
		// ctx.font = "4px Verdana";
		// ctx.fillText("Population", 40, 26);

		// ctx.fillStyle = "red";
		// ctx.font = "4px Verdana";
		// ctx.fillText("Position", 40, 20);
		
		// y-axis
		ctx.beginPath();
		ctx.moveTo(20, 20);
		ctx.lineTo(20, this.yAxis);
		ctx.stroke();
		// x-axis
		ctx.beginPath();
		ctx.moveTo(20, this.yAxis);
		ctx.lineTo(this.xAxis, this.yAxis);
		ctx.stroke();
	}

	/**
	 * Plots the population of cells with respect to frames on the Generation Plotter axes
	 * @param {int} x
	 * @param {int} y
	 */
	drawPop(x, y){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = "blue";
		ctx.fillRect(20+x, this.yAxis-y, 1, 1); //paints cells
	}

	/**
	 * Plots the average position of all the cells on the Generation Plotter axes
	 * @param {int} x 
	 * @param {int} y 
	 */
	drawPosition(x, y){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = "red";
		ctx.fillRect(20+x, y, 1, 1); //paints cells
	}

	/**
	 * Clears the plotted points on the Generation Plotter graph
	 */
	clear(){
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		ctx.clearRect(21, 0, 300, 133);
	}
}