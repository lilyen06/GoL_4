class DataSet {

    constructor() {
        this.frames;
        this.cellArray;
        this.columns;
        this.rows;
        this.population;
        this.position;
        this.array = new Array(100).fill(null).map(() => new Array(3).fill(null));
    }

    setComAndRow(columns, rows) {
        this.columns = columns;
        this.rows = rows;
    }

    setCellArray(cellArray) {
        this.cellArray = cellArray;
    }

    getPosition(index) {
        return (this.array[index][0],this.array[index][1]);
    }

    getPopulation(index) {
        return this.array[index][0];
    }

    populateArray() {
        this.popCounter = 0;
        let RowSum = 0;
        let ColumnSum = 0;
        var i,j;
            for (i = 0; i < this.rows; i++) {
                for (j = 0; j < this.columns; j++) {
                    if (this.cellArray.isOn(i,j)) {
                        this.popCounter += 1;
                        RowSum += i;
                        ColumnSum += j;
                    }
                }
            }
            let y = Math.round(RowSum/this.popCounter);
            let x = Math.round(ColumnSum/this.popCounter);
            this.array[this.frames][0] = x; //the first column of the array stores ave x position
            this.array[this.frames][1] = y; //the second column of the array stores ave y position
            this.array[this.frames][2] = this.popCounter; //the third column stores population
    }

    printPopSet() {
        for (var i = (this.frames-5); i < this.frames; i++) {
            console.log(this.array[i][2]);
        }
    }

    storeFrames(frames) {
        this.frames = frames;
    }

    popWacky(number) {
        if (this.popConstant(number) == false && this.popZero() == false) {
            return true;
        }
        return false;
    }

    popConstant(number) {
        let pop = this.array[this.frames][2];
        let constantCounter = 0;
        var i,j;
        if (this.popZero() == false) {
            for (i = (this.frames-5); i < this.frames; i++) {
                for (j = 0; j < number; j++) {
                    if (((pop + j) == this.array[i-1][2])||((pop - j) == this.array[i-1][2])) {
                        constantCounter += 1;
                        console.log(pop);
                        console.log(this.array[i-1][2]);
                        if (constantCounter >= 4) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    popZero() {
        if (this.array[this.frames][2] == 0) {
            return true;
        }
        return false;
    }

    avePosition() {
        let yPos = 0;
        let xPos = 0;
        let yAve = 0;
        let xAve = 0;
        var i;
        for (i = 0; i < this.frames; i++) {
            yPos += this.array[i][1];
            xPos += this.array[i][0];
        }
        yAve = Math.round(yPos/this.frames);
        xAve = Math.round(xPos/this.frames);
        return (xAve,yAve);
    }

    diffPosition(number) {
        let yPos = this.array[this.frames][1];;
        let xPos = this.array[this.frames][0];
        var i,j;
        for (i = (this.frames-5); i < this.frames; i++) {
            for (j = 0; j < number; j++) {
                if (((yPos + j) == this.array[i-1][1])||((yPos - j) == this.array[i-1][1])) {
                    if (((xPos + j) == this.array[i-1][0])||((xPos - j) == this.array[i-1][0])) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    samePosition(number) {
        if (this.diffPosition(number) == false) {
            return true;
        }
        return false;
    }

}
//store frames method with paramter frames assigned to this.frames
//call store frames in game loop
//determine if pop is constant growing or goes to zero (three methods)
//determine average position, if it is changing, or staying relatively the same
//selector should be able to ask using those methods