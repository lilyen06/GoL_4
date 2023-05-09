class DataSet {

    constructor() {
        this.population = new Array();
        this.position = new Array();
        this.frames = 0;
        this.array = new Array(100).fill(null).map(() => new Array(3).fill(null));
    }

    createPop() {
        // for (i = 0; i < 50; i++) {
            let PopCounter = 0;
            let RowSum = 0;
            let ColumnSum = 0;
            // Game.frameloop();
            for (i = 0; i < Game.rows; i++) {
                for (j = 0; j < Game.columns; j++) {
                    if (CellArray.isOn(i,j)) {
                        PopCounter += 1;
                        RowSum += i;
                        ColumnSum += j;
                    }
                }
            }
            let y = Math.round(RowSum/PopCounter);
            let x = Math.round(ColumnSum/PopCounter);
            this.array[this.frames][1] = y;
            this.array[this.frames][0] = x;
            this.array[this.frames][2] = PopCounter;
            console.log(this.position[frames]);
       // }
    }
    //pos x is column 0, pos y is column 1, population is column 3

    storeFrames(frames) {
        frames = this.frames;
    }

    popGrowing() {

    }

    popConstant() {

    }

    popZero() {

    }

    avePosition() {

    }

    diffPosition() {

    }

    samePosition() {

    }

}
//store frames method with paramter frames assigned to this.frames
//call store frames in game loop
//determine if pop is constant growing or goes to zero (three methods)
//determine average position, if it is changing, or staying relatively the same
//selector should be able to ask using those methods