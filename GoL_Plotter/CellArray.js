class CellArray{
	//declaration of instance variables is optional, but good practice 
	array; rows; columns; cellsize;

	//constructor is named as such and takes a similar form to that in Java
	constructor(columns, rows, cellsize, toroidal){
		this.columns = columns;
		this.rows = rows;
		this.cellsize = cellsize;
		this.toroidal = toroidal;
		this.array = new Array(rows).fill(null).map(() => new Array(columns).fill(null)); // builds an empty 2d array in JavaScript

		//these lines return a reference to the HTML canvas element above
		let can = document.querySelector("canvas");
		//these lines resize the canvas to fit the CellArray
		can.height =this.rows*this.cellsize;
		can.width =this.columns*this.cellsize;


		let r, c; //populates empty 2d array with Cells
		for(r=0; r<this.rows; r++){
			for(c=0; c<this.columns; c++){
				this.array[r][c] = new Cell(c,r,cellsize); //swap to array coordinates array[y][x]
				
			}
		}
	};

	draw(){
		let r, c; //calls draw method of each Cell in 2d array
		for(r=0; r<this.rows; r++){
			for(c=0; c<this.columns; c++){
				this.array[r][c].draw();
			}
		}
	};

	//cell getter
	getCell(r, c) {
		return this.array[r][c];
	}
	
	//cell setter
	turnOn(r, c) {
		this.array[r][c].turnOn();
	}

	//cell setter
	turnOff(r, c) {
		this.array[r][c].turnOff();
	}

	//cell checker
	isOn(r, c) {
		return this.array[r][c].isOn();
	}

	//test returns 0 for cells outside the array it cannot find
	test(r, c) {
			
		 try {
		 	//this boolean controls weather or not the grid experiences toroidal overlap
 			if(this.toroidal){
				//modifications to cell test results to map to toroidal grid	
				if(c == -1) {
					if(this.array[r][this.columns-1].isOn())return 1;
				}if(c == this.columns) {
					if(this.array[r][0].isOn())return 1;
				}if(r == -1) {
					if(this.array[this.rows-1][c].isOn())return 1;
				}if(r == this.rows) {
					if(this.array[0][c].isOn())return 1;
				}
			}
			//normal test results
			if (this.array[r][c].isOn()) {
				return 1;
			}

		}catch(err) {

  			//any out of bounds cells are off
		}
		
		return 0;
	}

}