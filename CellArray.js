class CellArray{
	//declaration of instance variables is optional, but good practice 
	array; rows; columns; cellsize;

	/**
	 * constructor is named as such and takes a similar form to that in Java
	 * @param {int} columns 
	 * @param {int} rows 
	 * @param {int} cellsize 
	 * @param {boolean} toroidal 
	 */
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

	/**
	 * populates the counts[][] with the countAlive values
	 * @returns counts Array
	 */
	countNeighbors() {
		let counts =  new Array(this.rows).fill(null).map(() => new Array(this.columns).fill(null));// builds an empty 2d array in JavaScript
			//loops through our cell array and stores the counts of each cell in the int array
			let r, c; 
			for (r = 0; r < this.rows; r++) {
				for (c = 0; c < this.columns; c++) {
					counts[r][c] = this.countAlive(r, c);
				}

			}
		return counts;
	}

	/**
	 * return the number of cells alive in this update
	 * @returns sum of cells alive (int)
	 */
	cellsAlive(){
		//loops through CellArray and sums all currently alive cells
		let r, c, sum = 0;
		for (r = 0; r < this.rows; r++) {
			for (c = 0; c < this.columns; c++) {
				if(this.isOn(r,c)){
					sum++;
				}
			}
		}
		return sum;
	} 

	/**
	 * Counts and returns the live cells in the 8 cell perimeter
	 * @param {int} r 
	 * @param {int} c 
	 * @returns int count
	 */
	countAlive(r, c) {
		let count = 0;
		count += this.test(r - 1, c - 1);
		count += this.test(r - 1, c);
		count += this.test(r - 1, c + 1);
		count += this.test(r, c - 1);
		count += this.test(r, c + 1);
		count += this.test(r + 1, c - 1);
		count += this.test(r + 1, c);
		count += this.test(r + 1, c + 1);
		return count;
	}

	/**
	 * Draws each cell in the CellArray
	 */
	draw(){
		let r, c; //calls draw method of each Cell in 2d array
		for(r=0; r<this.rows; r++){
			for(c=0; c<this.columns; c++){
				this.array[r][c].draw();
			}
		}
	};

	/**
	 * Cell getter, takes rows and columns as parameters
	 * @param {int} r 
	 * @param {int} c 
	 * @returns Cell
	 */
	getCell(r, c) {
		return this.array[r][c];
	}
	
	/**
	 * Turns on a cell at row r and column c
	 * @param {int} r 
	 * @param {int} c 
	 */
	turnOn(r, c) {
		this.array[r][c].turnOn();
	}

	/**
	 * Turns off a cell at row r and column c
	 * @param {int} r 
	 * @param {int} c 
	 */
	turnOff(r, c) {
		this.array[r][c].turnOff();
	}

	//cell checker
	/**
	 * Checks if the cell at row r and column c is on
	 * @param {int} r 
	 * @param {int} c 
	 * @returns boolean
	 */
	isOn(r, c) {
		return this.array[r][c].isOn();
	}

	/**
	 * test returns 0 for cells outside the array it cannot find
	 * @param {int} r 
	 * @param {int} c 
	 * @returns 0 or 1
	 */
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