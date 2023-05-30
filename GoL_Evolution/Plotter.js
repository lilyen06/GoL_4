class Plotter{
	// declaration of variables
	x; y; xAxis; yAxis;

	/**
	 * Construct a plotter object with assigned length of X and Y axes
	 * called as Plotter(int x, int y)
	 * @param {int} x 
	 * @param {int} y 
	 */
	constructor(x,y){
		// assigning the class variables
		this.x = x;
		this.y = y;
		this.xAxis=250;
		this.yAxis=135;
	}

	/**
	 * Initializes the graph on the Generation Plotter canvas and draws the axes
	 * called as plotter.initialize()
	 */
	initialize(){
		// fetching the graph
		var c = document.getElementById("graph");
		var ctx = c.getContext("2d");

		// labels the two graphs by the colour
		// ctx.fillStyle = "blue";
		// ctx.font = "4px Verdana";
		// ctx.fillText("Population", 40, 26);

		// ctx.fillStyle = "red";
		// ctx.font = "4px Verdana";
		// ctx.fillText("Position", 40, 20);
		
		// draws the y-axis
		ctx.beginPath();
		ctx.moveTo(20, 20); // starting point of the y-axis (at the top)
		ctx.lineTo(20, this.yAxis); // draws the line to the y-axis origin
		ctx.stroke();
		// daws the x-axis
		ctx.beginPath();
		ctx.moveTo(20, this.yAxis); // starting at the origin
		ctx.lineTo(this.xAxis, this.yAxis); // draws the line to the "end" of the x-axis (on the right)
		ctx.stroke();
	}

	/**
	 * Plots the population of cells with respect to frames on the Generation Plotter axes
	 * called as plotter.drawPop(int x, int y)
	 * @param {int} x
	 * @param {int} y
	 */
	drawPop(x, y){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object, ctx
		ctx.fillStyle = "blue"; // plotted points are blue to differentiate from the other graph
		ctx.fillRect(20+x, this.yAxis-y, 1, 1); //paints cells at the xy coordinate given by the parameter
	}

	/**
	 * Plots the average position of all the cells on the Generation Plotter axes
	 * called as plotter.drawPosition(int x, int y)
	 * @param {int} x 
	 * @param {int} y 
	 */
	drawPosition(x, y){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = "red"; // plotted points are red to differentiate from the other graph
		ctx.fillRect(20+x, y+30, 2, 2); //paints cells at te xy coordinates given by the parameter
		// the y-value passed to fillRect remains to be y because the percieved directionality flips
	}

	/**
	 * Clears the plotted points on the Generation Plotter graph
	 * called as plotter.clear()
	 */
	clear(){
		// grabbing the reference to the Generation Plotter graph
		let can = document.getElementById("graph");
		let ctx = can.getContext('2d');
		// clearing the entire canvas
		ctx.clearRect(0, 0, 350, 234);
	}
}