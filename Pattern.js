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
        let xlast = null;
        let ylast = null;
        for (let i=0;i<this.numAlive;i++){
            let xrand = Math.floor(Math.random()*this.cols);
            let yrand = Math.floor(Math.random()*this.rows);
            while(xrand==xlast && yrand==ylast){
                xrand = Math.floor(Math.random()*this.cols);
                yrand = Math.floor(Math.random()*this.rows);
            }
            this.grid.turnOn(xrand+(this.game.columns/2-this.cols/2),yrand+(this.game.rows/2-this.rows/2));
            xlast = xrand;
            ylast = yrand;
        }
    }
}