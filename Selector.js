class Selector {
    
    /**
	 * constructor is named as such and takes a similar form to that in Java
	 * @param {dataSet} data
	 */

    constructor(data) {
        this.data = data;
    }

    //if same population and same average position, or if population zero, ignore
    dismiss(popNumber, posNumber) {
        if (this.data.popZero() == true) {
            return true;
        } if ((this.data.samePosition(posNumber) == true) && (this.data.popConstant(popNumber) == true)) {
            return true;
        } return false;
    }

    //if same position different populations ignore it
    tierTwo(popNumber, posNumber) {
        if ((this.data.samePosition(posNumber) == true) && (this.data.popWacky(popNumber) == true)) {
            return true;
        } return false;
    }

    //same population and changing position, very good
    //tracking sets of three as we go
    good(popNumber, posNumber) {
        if ((this.data.diffPosition(posNumber) == true) && (this.data.popConstant(popNumber) == true)) {
            if (this.data.linearMotion(popNumber, posNumber)) {
                return true;
            }
        } return false;
    }

    //different population and different position is good
    chaos(popNumber, posNumber) {
        if ((this.data.diffPosition(posNumber) == true) && (this.data.popWacky(popNumber) == true)) {
            return true;
        } return false;
    }

    linearMotion(popNumber, posNumber) {
        var slope1;
        var slope2;
        var deltay;
        var deltax;
        deltay = (this.data.array[this.frames][1] - this.data.array[this.frames-1][1]);
        deltax = (this.data.array[this.frames][0] - this.data.array[this.frames-1][0]);
        slope1 = (deltay/deltax);
        deltay = (this.data.array[this.frames-1][1] - this.data.array[this.frames-2][1]);
        deltax = (this.data.array[this.frames-1][0] - this.data.array[this.frames-2][0]);
        slope2 = (deltay/deltax);
        if (slope1 == slope2) {
            return true;
        }
    }
}