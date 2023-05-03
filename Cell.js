class Cell{
	//declaration of instance variables is optional, but good practice
	x; y; size; state; colors;

	//constructor is named as such and takes a similar form to that in Java
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size
		this.state = 0;
		this.colors = ['white', 'black'];
	}
	//to turn on a cell
	turnOn(){
		this.state =1;
	}
	//to turn off a cell
	turnOff(){
		this.state =0;
	}
	//to turn on a cell
	isOn(){
		if(this.state ==1) return true;
		else return false;
	}
	//to turn off a cell
	isOff(){
		if(this.state ==0) return true;
		else return false;
	}

	draw(){
		//these lines return a reference to the HTML canvas element above
		let can = document.querySelector("canvas");
		let ctx = can.getContext('2d');
		//all painting to the canvas is done to the canvas context object
		ctx.fillStyle = this.colors[this.state];
		ctx.fillRect(this.size*this.x, this.size*this.y, this.size, this.size); //paints cells
		//fill is solid color stroke is outline (default line width = 1) 
		ctx.strokeStyle = 'lightgrey';
		ctx.strokeRect(this.size*this.x, this.size*this.y, this.size, this.size); //paints gridlines

	}
}