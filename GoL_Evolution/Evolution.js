class Evolution{
    plot; dataSet; trial; reset;

    constructor(plotter, dataset){
        this.plot = plotter;
        this.dataSet = dataset;
        this.trial = dataset.array;
        this.reset = 0;
    }

    test(){
        this.drawOnPop();
        this.drawOnPos();
        this.reset++;
    }

    drawOnPop(){
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        for(let i = 0; i<100; i++){
            ctx.fillRect(20+i, this.plot.yAxis-this.trial[i][2], 1, 1);
        }
    }

    drawOnPos(){
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        for(let i = 0; i<100; i++){
            ctx.fillRect(20+this.trial[i][0], this.trial[i][1]+30, 1, 1);
        }
    }
}