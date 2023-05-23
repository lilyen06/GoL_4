class Mutator{
    conway;

    constructor(conway){
        this.conway = conway;
    }

    /**
     * 
     * @param {CellArray} pattern 
     */
    moveLonely(pattern){
        let counts = pattern.countNeighbors();
        let countstemp = 0;
        let countsleast = -1;
        let rows;
        let cols;
        for (let r=0; r<=pattern.rows; r++){
            for (let c=0; c<=pattern.columns; c++) {
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
        let xdif = 1;
        let ydif = 1;
        pattern.turnOff(rows,cols);
        pattern.turnOff(rows+ydif,cols+xdif);
        return pattern;
    }
}