class Evolution{
    plot; data; trial;

    constructor(plotter, dataset){
        this.plot=plotter;
        this.data=dataset;
        this.trial= new Array(20);
    }

    drawOnTopOfPop(){
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        ctx.fillRect(20+this.data.avePosition().x, this.plot.yAxis-this.data.avePosition.y, 1, 1);
    }

    drawOnTopOfPos(){
        let can = document.getElementById("graph");
        let ctx = can.getContext('2d');
        ctx.fillStyle="black";
        ctx.fillRect(20+this.data.avePosition().x, this.data.avePosition.y, 2, 2);
    }
}