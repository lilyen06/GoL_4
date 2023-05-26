class Mutator{
    conway;

    constructor(conway){
        this.conway = conway;
    }

    /**
     * Return the differences between the average position and the point given
     * @param {int} rows
     * @param {int} cols
     * @param {CellArray} pattern 
     */
    differences(rows, cols, pattern){
        let x=0;
        let y=0;
        var xy = pattern.avgPos();
        if (rows<xy.y){
            y=1;
        } else if (rows>xy.y){
            y=-1;
        } if (cols<xy.x){
            x=1;
        } else if (cols>xy.x){
            x=-1;
        }
        return {
			// returns the differences
			x: x,
			y: y
		};
    }

    /**
     * Move the cell with the least amount of neighbour towards the average position point
     * @param {CellArray} pattern 
     */
    moveLonely(pattern){
        let counts = pattern.countNeighbors();
        let countstemp = 0;
        let countsleast = -1;
        let rows;
        let cols;
        for (let r=0; r<=pattern.rows-1; r++){
            for (let c=0; c<=pattern.columns-1; c++) {
                console.log(r+"          "+c);
                if (pattern.isOn(r,c)){
                    countstemp = counts[r][c];
                    if (countsleast==-1){
                        countsleast = countstemp
                        rows = r;
                        cols = c;
                    } else {
                        if (countstemp < countsleast){
                            countsleast = countstemp;
                            rows = r;
                            cols = c
                        }
                    }
                }
            }
        }
        var xy = this.differences(rows,cols,pattern);
        pattern.turnOff(rows,cols);
        pattern.turnOn(rows+xy.y,cols+xy.x);
        return pattern;
    }
}