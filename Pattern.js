class Pattern{
    rows;cols;numAlive;grid;game;

    constructor(rows,cols,game,numAlive){
        this.rows = rows;
        this.cols = cols;
        this.numAlive = numAlive;
        this.game = game;
        this.grid = game.grid;
    }

    randomize(){
        let pattern = new CellArray(this.game.columns, this.game.rows, this.game.cellsize, this.game.toroidal);
        for (let i=0;i<this.numAlive;i++){
            let xrand = Math.floor(Math.random()*this.cols);
            let yrand = Math.floor(Math.random()*this.rows);
            let y = yrand+Math.floor(this.game.rows/2-this.rows/2)
            let x = xrand+Math.floor(this.game.columns/2-this.cols/2)
            while(this.grid.isOn(y,x)){
                xrand = Math.floor(Math.random()*this.cols);
                yrand = Math.floor(Math.random()*this.rows);
                y = yrand+Math.floor(this.game.rows/2-this.rows/2)
                x = xrand+Math.floor(this.game.columns/2-this.cols/2)
            }
            this.grid.turnOn(y,x);
            pattern.turnOn(y,x);
        }
        return pattern;
    }
}