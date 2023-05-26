class Pattern{
    rows;cols;numAlive;grid;game;

    /**
     * Populates the class variables of a pattern
     * @param {int} rows 
     * @param {int} cols 
     * @param {Game} game 
     * @param {int} numAlive 
     */
    constructor(rows,cols,game,numAlive){
        this.rows = rows; 
        this.cols = cols;
        this.numAlive = numAlive; // represents the number of cells to be turned on within the pattern grid space
        this.game = game;
        this.grid = game.grid; // grab the game's grid in order to turn on cells
    }

    /**
     * Generates and draws a new random pattern
     * @returns a CellArray() of the pattern
     */
    randomize(){
        // create a new CellArray to be populated with the new random pattern
        let pattern = new CellArray(this.game.columns, this.game.rows, this.game.cellsize, this.game.toroidal);
        // repeats the random placement of live cells for the number of cells the constructor is told to turn on
        for (let i=0;i<this.numAlive;i++){
            // generate a random x and y value within the parameters of the pattern size
            let xrand = Math.floor(Math.random()*this.cols);
            let yrand = Math.floor(Math.random()*this.rows);
            // create variables which place the pattern grid and random x and y values in the center of the game grid
            let y = yrand+Math.floor(this.game.rows/2-this.rows/2)
            let x = xrand+Math.floor(this.game.columns/2-this.cols/2)
            // check if the x,y coordinate is already on, if so ignore the point and repeat the above process until a new, off cell is found
            while(this.grid.isOn(y,x)){
                xrand = Math.floor(Math.random()*this.cols);
                yrand = Math.floor(Math.random()*this.rows);
                y = yrand+Math.floor(this.game.rows/2-this.rows/2)
                x = xrand+Math.floor(this.game.columns/2-this.cols/2)
            }
            // turn on the cell on both the game grid and pattern CellArray grid
            this.grid.turnOn(y,x);
            pattern.turnOn(y,x);
        }
        // return the pattern CellArray, to be transcribed if required by game
        return pattern;
    }
}