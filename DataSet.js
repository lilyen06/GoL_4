class DataSet {

    constructor() {
        this.frames;
        this.cellArray;
        this.columns;
        this.rows;
        this.population = new Array();
        this.position = new Array();
        this.array = new Array(100).fill(null).map(() => new Array(3).fill(null));
    }

    getComAndRow(columns, rows) {
        this.columns = columns;
        this.rows = rows;
    }

    getCellArray(cellArray) {
        this.cellArray = cellArray;
    }

    populateArray() {
        // for (i = 0; i < 50; i++) {
            let PopCounter = 0;
            let RowSum = 0;
            let ColumnSum = 0;
            // Game.frameloop();
            var i,j;
            console.log(this.rows);
            for (i = 0; i < this.rows; i++) {
                for (j = 0; j < this.columns; j++) {
                    if (this.cellArray.isOn(i,j)) {
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
       // }
    }

    //pos x is column 0, pos y is column 1, population is column 3

    collectPop() {
        let PopCounter = 0;
        var i,j;
        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                if (this.cellArray.isOn(i,j)) {
                    PopCounter += 1;
                }
            }
        }
        PopCounter = this.array[this.frames][2];
        return PopCounter;
    }

    storeFrames(frames) {
        this.frames = frames;
    }

    popWacky() {
        if (this.popConstant() == false && this.popZero() == false) {
            return true;
        }
        return false;
    }

    popConstant() {
        let pop = 0;
        var i,j;
        for (i = (this.frames-10); i < this.frames; i++) {
            pop = this.array[i][2];
            for (j = 0; j < 3; j++) {
                if (((pop + j) == this.array[i-1][2])||((pop - j) == this.array[i-1][2])) {
                    return true;
                }
            }
            return false;
        }
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

    diffPosition() {
        if (this.samePosition() == false) {
            return true;
        }
        return false;
    }

    samePosition() {
        let pos = 0;
        var i,j;
        for (i = (this.frames-10); i < this.frames; i++) {
            pos = this.array[i][2];
            for (j = 0; j < 3; j++) {
                if (((pos + j) == this.array[i-1][2])||((pos - j) == this.array[i-1][2])) {
                    return true;
                }
            }
            return false;
        }
    }

}
//store frames method with paramter frames assigned to this.frames
//call store frames in game loop
//determine if pop is constant growing or goes to zero (three methods)
//determine average position, if it is changing, or staying relatively the same
//selector should be able to ask using those methods