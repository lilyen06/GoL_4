class Cell{
	//declaration of instance variables is optional, but good practice
	x; y; size; state; colors; //hi

	/**
	 * constructor is named as such and takes a similar form to that in Java
	 * @param {int} x 
	 * @param {int} y 
	 * @param {int} size 
	 */
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size
		this.state = 0;
		this.colors = ['white', 'black'];
	}
	/**
	 * turn on a cell (state = 1)
	 */
	turnOn(){
		this.state =1;
	}
	/**
	 * turn off a cell (state = 0)
	 */
	turnOff(){
		this.state =0;
	}
	/**
	 * tests if the cell is on, returns boolean
	 * @returns boolean on
	 */
	isOn(){
		if(this.state ==1) return true;
		else return false;
	}
	/**
	 * tests if the cell is off, returns boolean
	 * @returns boolean off
	 */
	isOff(){
		if(this.state ==0) return true;
		else return false;
	}
	/**
	 * draws the outline and colour of the cell
	 */
	draw(){
		//these lines return a reference to the HTML canvas element above
		let can = document.getElementById("life");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = this.colors[this.state];
		ctx.fillRect(this.size*this.x, this.size*this.y, this.size, this.size); //paints cells
		//fill is solid color stroke is outline (default line width = 1) 
		ctx.strokeStyle = 'lightgrey';
		ctx.strokeRect(this.size*this.x, this.size*this.y, this.size, this.size); //paints gridlines

	}
}