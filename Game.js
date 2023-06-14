class Game{
	//declaration of instance variables is optional, but good practice 
	grid; rows; columns; cellsize; frames; running;toroidal;pattern;mutated;mutator;selector;

	/**
	 * constructor is named as such and takes a similar form to that in Java
	 * @param {int} columns 
	 * @param {int} rows 
	 * @param {int} cellsize 
	 * @param {boolean} toroidal 
	 * @param {DataSet} data
	 * @param {Plotter} plotter
	 * @param {Evolution} evolve
	 * @param {Selector} selector
	 */
	constructor(columns, rows, cellsize, toroidal, data, plotter, evolve, selector){
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
		this.evolve = evolve;
		this.mutator = new Mutator(this); // instantiate a mutator
	}

	/**
	 * intitiaizes the canvas
	 */
	initialize(){
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
	 * Mutate and reloop the pattern until isolating one with a constant population and changing position
	 */
	mutate(){
		// if Selector's dismiss is triggered, or a pattern has been mutated 5 times, generate and mutate a new pattern
		if (this.selector.dismiss(5,5)||this.mutated>=5){
			console.log('Dismiss');
			this.reloop();
			this.mutated = 0;
		} 
		// if Selector's chaos is triggered, mutate the pattern based on how many mutations it has already undergone
		else if (this.selector.chaos(5,5)){
			if (this.mutated <=3){
				this.pattern = this.mutator.addPoint(this.pattern);
				this.clear();
				this.drawPat(this.pattern);
				this.mutated++;
			} else {
				this.pattern = this.mutator.killPoint(this.pattern);
				this.clear();
				this.drawPat(this.pattern);
				this.mutated++;
			}
		}
		// if Selector's good for a larger range is triggered, check if it is a perfect match, if not moveLonely, if yes draw the pattern and stop the game
		else if (this.selector.good(5,5)){
			if (!this.selector.good(0,0)){
				console.log("found almost pat!");
				this.pattern = this.mutator.moveLonely(this.pattern);
				this.clear();
				this.drawPat(this.pattern);
				this.mutated++;
			} else {
				console.log("found pat!!!");
				this.clear();
				this.drawPat(this.pattern);
				this.stop();
			}
		} 
	}

	/**
	 * Draws the pattern fed into the function
	 * @param {CellArray} pattern 
	 */
	drawPat(pattern){
		let r, c;
		// loop through all cells
		for (r = 0; r < this.rows; r++) {
			for (c = 0; c < this.columns; c++) {
				// transcribe on pattern cells to grid pattern cells
				if (pattern.isOn(r,c)){
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
	}
	
	nextTrial(){
		// first clear the grid without clearing the plotter
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
		// turning the current trial to black
		//this.evolve.drawOnPop();
		//console.log(8);
		if(this.frames==0 && this.evolve.reset==0){
			this.clear();
		}
	}
	
	/**
	 * updates the game with the new neighbors count
	 */
	update() {
		let count = this.grid.countNeighbors();
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
	 * helper function to update the html elements
	 */
	updateHTML(){
		document.getElementById("generation").innerHTML = "Cells alive: "+this.grid.cellsAlive()+" Generation: "+this.frames;

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
		this.plotter.drawPop(this.frames, this.grid.cellsAlive());
		// plots the average position
		this.plotter.drawPosition(this.data.array[this.frames][0], this.data.array[this.frames][1]);

		this.data.storeFrames(this.frames);
		// this.data.setCellArray(this.grid);
		this.data.populateArray();

		console.log(this.data.getPosition(this.frames));

		this.frames++;
		
		if (this.frames >= 100){
			if(this.evolve.reset%2==0){
				this.evolve.reset=1;
				this.plotter.clear();
			}
			this.evolve.test();
			this.mutate();
		}
		
		//timeout to call animation frame to restart the loop -- 1000/60 is 60 fps
		if(this.running)setTimeout(()=>window.requestAnimationFrame(()=>this.frameLoop()), 1000/24);

	}

}
