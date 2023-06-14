class Evolution{
    plot; dataSet; trial; reset;

    constructor(plotter, dataset){
        // instantiates the instance variables
        this.plot = plotter;
        this.dataSet = dataset;
        this.trial = dataset.array;
        this.reset = 1;
    }

    test(){
        // encapsulating the two methods into one method
        this.drawOnPop();
        this.drawOnPos();
        this.reset++; // reset is used as a counter to control how many patterns are plotted on the generation plotter
    }

    drawOnPop(){
        // draws the frames-population graph but in black to show a contrast for comparisions
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        for(let i = 0; i<100; i++){
            ctx.fillRect(20+i, this.plot.yAxis-this.trial[i][2], 1, 1);
        }
    }

    drawOnPos(){
        // draws the position graph but in black to show a contrast for comparisions
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        for(let i = 0; i<100; i++){
            ctx.fillRect(20+this.trial[i][0], this.trial[i][1]+30, 1, 1);
        }
    }
}
