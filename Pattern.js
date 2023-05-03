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
        xlast = null;
        ylast = null;
        for (i=0;i<this.numAlive;i++){
            xrand = Math.floor(Math.random()*cols);
            yrand = Math.floor(Math.random()*rows);
            if(xrand==xlast && yrand==ylast){
                this.grid.turnOn(xrand+(game.cols/2-cols/2),yrand+(game.rows/2-rows/2));
                i--;
            }
            xlast = xrand;
            ylast = yrand;
        }
    }
}