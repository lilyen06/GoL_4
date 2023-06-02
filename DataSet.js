class DataSet {

    constructor() {
        this.popCounter;
        this.frames;
        this.cellArray;
        this.columns;
        this.rows;
        this.array = new Array(100).fill(null).map(() => new Array(3).fill(null)); //build an empty three column array
    }

    getComAndRow(columns, rows) {
        this.columns = columns;
        this.rows = rows;
    }

    getCellArray(cellArray) {
        this.cellArray = cellArray;
    }

    populateArray() {
            this.popCounter = 0;
            let RowSum = 0;
            let ColumnSum = 0;
            var i,j;
            console.log(this.rows);
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

    storeFrames(frames) {
        this.frames = frames;
    }

    collectPop() {
        this.popCounter = this.array[this.frames][2];
        return this.popCounter;
    }

    popWacky() {
        if (this.popConstant() == false && this.popZero() == false) {
            return true;
        }
        return false;
    }

    popConstant() {
        this.popCounter = 0;
        var i,j;
        if (this.popZero() == true) {
            return false;
        }
        else {
            for (i = (this.frames-10); i < this.frames; i++) {
                this.popCounter = this.array[i][2];
                for (j = 0; j < 3; j++) {
                    if (((this.popCounter + j) == this.array[i-1][2])||((this.popCounter - j) == this.array[i-1][2])) {
                        return true;
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
        console.log("Hi");
        console.log(xAve);
        console.log(yAve); 
        return {
            x: xAve,
            y: yAve
        };
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