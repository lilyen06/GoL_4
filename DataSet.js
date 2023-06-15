class DataSet {

    /**
	 * Construct a DataSet object
	 * called as DataSet()
	 */
    constructor() {
        this.popCounter;
        this.frames;
        this.cellArray;
        this.columns;
        this.rows;
        this.array = new Array(100).fill(null).map(() => new Array(3).fill(null)); //build an empty three column array
        this.population;
        this.position;
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
        for (var i = (this.frames-5); i <= this.frames; i++) {
            console.log(this.array[i][2]);
        }
    }

    storeFrames(frames) {
        this.frames = frames;
    }

    collectPop() {
        this.popCounter = this.array[this.frames][2];
        return this.popCounter;
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
            for (i = (this.frames-5); i <= this.frames; i++) {
                for (j = 0; j <= number; j++) {
                    if (((pop + j) == this.array[i-1][2])||((pop - j) == this.array[i-1][2])) { //compares the population to that of previous frames
                        constantCounter += 1;
                        if (constantCounter >= 3) { //checks if the population has been constant for at least three of the five frames
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
            yPos += this.array[i][1]; //adds y the position for each frame
            xPos += this.array[i][0]; //adds the x position for each frame
        }
        //calculates averages
        yAve = Math.round(yPos/this.frames);
        xAve = Math.round(xPos/this.frames);
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
        let posx = this.array[this.frames][0];
        var posy = this.array[this.frames][1];
        var i;
        for (i = (this.frames-4); i < this.frames; i++) {
            if ((posx == this.array[i][0]) && ( posy == this.array[i][1])) { //checks if both x and y position are equal to at least one of past three frames
                    return true;
            }
            return false;
        }
    }

    //gliders don't actually have the same slope they follow a pattern of every two frames having delta ys and xs of one or zero
    //function mostly rules out false patterns
    linearMotion() {
        var deltay1;
        var deltax1;
        var deltay2;
        var deltax2;
        //finds the differences in x and y over the past two frames
        deltay1 = (this.array[this.frames][1] - this.array[this.frames-1][1]);
        deltax1 = (this.array[this.frames][0] - this.array[this.frames-1][0]);
        //finds the differences in x and y over the second and third most recent frames
        deltay2 = (this.array[this.frames-1][1] - this.array[this.frames-2][1]);
        deltax2 = (this.array[this.frames-1][0] - this.array[this.frames-2][0]);
        if ((deltay1 = 1) || (deltax1 = 1) || (deltay2 == 1) || (deltax2 == 1)) {
                return true;
        }
    }

}