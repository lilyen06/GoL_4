class Mutator{
    conway;

    /**
     * instantiates mutator
     * @param {Game} conway 
     */
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
     * @returns pattern CellArray
     */
    moveLonely(pattern){
        let counts = pattern.countNeighbors();
        let countstemp = 0;
        let countsleast = -1;
        let rows;
        let cols;
        for (let r=0; r<=pattern.rows-1; r++){
            for (let c=0; c<=pattern.columns-1; c++) {
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

    /**
     * add a point near to the average position
     * @param {CellArray} pattern 
     * @returns pattern CellArray
     */
    addPoint(pattern){
        var xy = pattern.avgPos();
        let x = Math.floor(xy.x);
        let y = Math.floor(xy.y);
        while (pattern.isOn(y,x)){
            if (x>y){
                y++;
            } else {
                x++;
            }
        }
        pattern.turnOn(y,x);
        return pattern;
    }

    /**
     * remove a point near to the average position
     * @param {CellArray} pattern 
     * @returns pattern CellArray
     */
    killPoint(pattern){
        var xy = pattern.avgPos();
        let x = Math.floor(xy.x);
        let y = Math.floor(xy.y);
        let num = 0;
        let square = true;
        while (!pattern.isOn(y,x)&&square){
            if (num==0)x++;
            if (num==1)y++;
            if (num==3)x--;
            if (num==4)x--;
            if (num==5)y--;
            if (num==6)y--;
            if (num==7)x++;
            if (num==8)x++;
            if (num>8){
                square = false;
            }
            num++;
        }
        if (square){
            pattern.turnOff(y,x);
        } else {
            this.addPoint(pattern);
        }
        return pattern;
    }
}