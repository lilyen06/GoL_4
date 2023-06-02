class Game{
	//declaration of instance variables is optional, but good practice 
	grid; rows; columns; cellsize; frames; running;toroidal;pattern;

	/**
	 * constructor is named as such and takes a similar form to that in Java
	 * @param {int} columns 
	 * @param {int} rows 
	 * @param {int} cellsize 
	 * @param {boolean} toroidal 
	 * @param {dataSet} data
	 * @param {plotter} plotter
	 */
	constructor(columns, rows, cellsize, toroidal, data, plotter, selector){
		this.columns = columns;
		this.rows = rows;
		this.cellsize = cellsize;
		this.toroidal = toroidal;
		this.grid = new CellArray(columns, rows, cellsize, toroidal); // builds the CellArray object
		this.frames = 0;
		this.running = false;
		this.data = data;
		this.plotter = plotter; // assigns a the parameter plotter to a new class variable called plotter
		this.selector = selector;
	}

	/**
	 * intitiaizes the canvas
	 */
	initialize(){

		// //glider -- in array coordinates array[y][x]
		// this.grid.array[1][13].turnOn();
		// this.grid.array[2][13].turnOn();
		// this.grid.array[3][13].turnOn();
		// this.grid.array[3][12].turnOn();
		// this.grid.array[2][11].turnOn();
		
		// //random pattern
		// this.grid.array[4][3].turnOn();
		// this.grid.array[4][2].turnOn();
		// this.grid.array[2][4].turnOn();
		// this.grid.array[4][2].turnOn();
		// this.grid.array[5][1].turnOn();
		// this.grid.array[6][3].turnOn();
		// this.grid.array[6][2].turnOn();
		// this.grid.array[6][4].turnOn();
		// this.grid.array[7][4].turnOn();
		// this.grid.array[8][4].turnOn();
		// this.grid.array[9][4].turnOn();
		// this.grid.array[10][4].turnOn();
		// this.grid.array[11][4].turnOn();
		// this.grid.array[12][4].turnOn();
		
		//gosper glider gun

		// //block
		// this.grid.array[12][7].turnOn();
		// this.grid.array[13][7].turnOn();
		// this.grid.array[12][8].turnOn();
		// this.grid.array[13][8].turnOn();

		// //glider
		// this.grid.array[18][7].turnOn();
		// this.grid.array[18][8].turnOn();
		// this.grid.array[18][9].turnOn();
		// this.grid.array[19][9].turnOn();
		// this.grid.array[20][8].turnOn();

		// //ship
		// this.grid.array[12][18].turnOn();
		// this.grid.array[13][18].turnOn();
		// this.grid.array[12][19].turnOn();	
		// this.grid.array[14][19].turnOn();
		// this.grid.array[13][20].turnOn();
		// this.grid.array[14][20].turnOn();

		// //glider	
		// this.grid.array[17][42].turnOn();
		// this.grid.array[18][41].turnOn();
		// this.grid.array[17][43].turnOn();
		// this.grid.array[18][42].turnOn();
		// this.grid.array[19][43].turnOn();

		// //ship
		// this.grid.array[11][29].turnOn();
		// this.grid.array[12][29].turnOn();		
		// this.grid.array[12][30].turnOn();
		// this.grid.array[10][30].turnOn();	
		// this.grid.array[10][31].turnOn();
		// this.grid.array[11][31].turnOn();

		// //block
		// this.grid.array[10][41].turnOn();
		// this.grid.array[11][41].turnOn();
		// this.grid.array[10][42].turnOn();
		// this.grid.array[11][42].turnOn();

		this.grid.draw();
	 }

	/**
	 * initialize the canvas using a pattern parameter
	 * @param {Pattern} pattern 
	 */
	initialize(pattern){
		// generate and draw a pattern
		this.pattern = pattern.randomize();
		// update the grid
		this.grid.draw();
	}

	/**
	 * Draw the last pattern generated
	 */
	drawLastPat(){
		let r, c;
		// loop through all cells
		for (r = 0; r < this.rows; r++) {
			for (c = 0; c < this.columns; c++) {
				// transcribe on pattern cells to grid pattern cells
				if (this.pattern.isOn(r,c)){
					this.grid.turnOn(r,c);
				}
			}
		}
		// reset operator interface
		this.frames = 0;
		this.grid.draw();
	}

	/**
	 * Start the frameLoop
	 */
	start(){
		if(!this.running){
			this.running = true;
			window.requestAnimationFrame(()=>this.frameLoop());
		}	
	}

	/**
	 * Stop the frameloop
	 */
	stop(){
		if(this.running)this.running = false;	
	}


	/**
	 * Clear the screen (turn all cells off)
	 */
	clear(){
		let r, c;
		// loop through all cells
		for (r = 0; r < this.rows; r++) {
			for (c = 0; c < this.columns; c++) {
				// turn off given cell
				this.grid.turnOff(r, c);
			}
		}
		// reset operator interface
		this.frames = 0;
		this.grid.draw();
		this.plotter.clear();
	}
	
	/**
	 * updates the game with the new neighbors count
	 */
	update() {
		let count = this.countNeighbors();
		this.updateGrid(count);
	}

	/**
	 * iterates through the entire grid and called updateCell on each cell
	 * @param {Array} counts 
	 */
	updateGrid(counts) {
		let r, c;
		for (r = 0; r < this.rows; r++) {
			for (c = 0; c < this.columns; c++) {
				let cell = this.grid.getCell(r, c);
				this.updateCell(cell, counts[r][c]);
			}
		}
	}
	
	/**
	 * implements the GoL logic provided a cell and its live count
	 * @param {Cell} cell 
	 * @param {int} count 
	 */
	updateCell(cell, count) {
		if (cell.isOn()) {
			if (count < 2 || count > 3) {
				cell.turnOff();
			}
				} else {
					if (count == 3) {
						cell.turnOn();
				}
		}
	}
  
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
				if(this.grid.isOn(r,c)){
					sum++;
				}
			}
		}
		return sum;
	} 

	/**
	 * helper function to update the html elements
	 */
	updateHTML(){
		document.getElementById("generation").innerHTML = "Cells alive: "+this.cellsAlive()+" Generation: "+this.frames;

	}

	/**
	 * Counts and returns the live cells in the 8 cell perimeter
	 * @param {int} r 
	 * @param {int} c 
	 * @returns int count
	 */
	countAlive(r, c) {
		let count = 0;
		count += this.grid.test(r - 1, c - 1);
		count += this.grid.test(r - 1, c);
		count += this.grid.test(r - 1, c + 1);
		count += this.grid.test(r, c - 1);
		count += this.grid.test(r, c + 1);
		count += this.grid.test(r + 1, c - 1);
		count += this.grid.test(r + 1, c);
		count += this.grid.test(r + 1, c + 1);
		return count;
	}

	/**
   * uses nested or loops to find the sum of all x and all y positions of alive cells
	 * called as this.avgPos()
	 * @returns the average value of the x and y position of all alive cells
	 */
	avgPos(){
		let allX=0;
		let allY=0;
		for(let i = 0; i<this.rows; i++){
			for(let j = 0; j<this.columns; j++){
				if(this.grid.isOn(i, j)){
					allX+=j;
					allY+=i;
				}
			}
		}
		return {
			// returns the average
			x: allX/this.cellsAlive(),
			y: allY/this.cellsAlive()
		};
	}
  
  /*
	 * clear the canvas, generate and draw a new random pattern
	 */
	reloop(){
		this.clear();
		this.initialize(new Pattern(6,5,conway,10));
	}

	/**
	 * this is the frame loop that executes every generation
	 */
	frameLoop(){
		//frame update and draw
		this.update();	 
		this.grid.draw();
		//updates the HTML elements
		this.updateHTML();
		// initialize a graph on the canvas
		this.plotter.initialize();
		// plots the population-frames graph
		this.plotter.drawPop(this.frames, 2*this.cellsAlive());
		// plots the average position
		var pos = this.avgPos();
		this.plotter.drawPosition(4*pos.x, 8*pos.y); // blows up the values of (x, y) to help differentiate from the other graph

		this.data.storeFrames(this.frames);
		// this.data.setComAndRow(this.columns,this.rows);
		// this.data.setCellArray(this.grid);
		this.data.populateArray();

		this.frames++;
		
		 if (this.frames >= 30) {
		 	this.stop();
			// console.log(this.selector.dismiss(5,5));
			// console.log(this.selector.tierTwo(5,5));
			// console.log(this.selector.good(5,5));
			// console.log(this.selector.chaos(5,5));
			console.log(this.data.getPosition(23));
			console.log(this.data.getPopulation(23));
		// 	//this.reloop(); // uncomment for automatic relooping
		// 	// this.data.storeFrames(this.frames);
		}
		
		//timeout to call animation frame to restart the loop -- 1000/60 is 60 fps
		if(this.running)setTimeout(()=>window.requestAnimationFrame(()=>this.frameLoop()), 1000/24);

	}

}