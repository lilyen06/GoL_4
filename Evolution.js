class Evolution{
    plot; dataSet; trial; reset;

    /**
	 * Construct an Evolution object with assigned plotter and dataset objects passed to it
	 * called as Evoliution(Plotter plotter, DataSet dataset)
	 * @param {int} plotter 
	 * @param {int} dataset
	 */
    constructor(plotter, dataset){
        // instantiates the instance variables
        this.plot = plotter;
        this.dataSet = dataset;
        this.trial = dataset.array;
        this.reset = 1;
    }

    /**
	 * Calls the drawOnPop() and drawOnPos() and increments the reset variable
	 * called as Evolution.test()
	 */
    test(){
        // encapsulating the two methods into one method
        this.drawOnPop();
        this.drawOnPos();
        this.reset++; // reset is used as a counter to control how many patterns are plotted on the generation plotter
    }

    /**
	 * Draws the frames-population graph using the data from the dataset array with the fillStyle "black"
	 * called as Evolution.drawOnPop()
	 */
    drawOnPop(){
        // draws the frames-population graph but in black to show a contrast for comparisions
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        for(let i = 0; i<100; i++){
            // using the data from the dataset array to plot the frames-population graph in black
            ctx.fillRect(20+i, this.plot.yAxis-this.trial[i][2], 1, 1);
        }
    }

    /**
	 * Draws the position graph using the data from the dataset array with the fillStyle "black"
	 * called as Evolution.drawOnPos()
	 */
    drawOnPos(){
        // draws the position graph but in black to show a contrast for comparisions
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        for(let i = 0; i<100; i++){
            // using the data form the dataset array to plot the average position of all cells in black
            ctx.fillRect(20+this.trial[i][0], this.trial[i][1]+30, 1, 1);
        }
    }
}
