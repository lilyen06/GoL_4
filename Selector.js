class Selector {
    
    /**
	 * constructor is named as such and takes a similar form to that in Java
	 * @param {dataSet} data
	 */

    constructor(data) {
        this.data = data;
    }

    //if same population and same average position, or if population zero, ignore
    dismiss(popNumber) {
        if (this.data.popZero() == true) {
            console.log('zeropop');
            return true;
        } if ((this.data.samePosition() == true) && (this.data.popConstant(popNumber) == true)) {
            console.log('samepopsamepos');
            return true;
        } return false;
    }

    //if same position different populations ignore it
    tierTwo(popNumber) {
        if ((this.data.samePosition() == true) && (this.data.popWacky(popNumber) == true)) {
            return true;
        } return false;
    }

    //same population and changing position, very good
    //tracking sets of three as we go
    good(popNumber) {
        if ((this.data.diffPosition() == true) && (this.data.popConstant(popNumber) == true)) {
            return true;
        } return false;
    }

    //different population and different position is good
    chaos(popNumber) {
        if ((this.data.diffPosition() == true) && (this.data.popWacky(popNumber) == true)) {
            return true;
        } return false;
    }

    // linearMotion(popNumber, posNumber) {
    //     var slope1;
    //     var slope2;
    //     var deltay;
    //     var deltax;
    //     console.log(this.data.getyPosition(this.frames));
    //     deltay = (this.data.getyPosition(this.frames) - this.data.getyPosition(this.frames-1));
    //     deltax = (this.data.getxPosition(this.frames) - this.data.getxPosition(this.frames-1));
    //     slope1 = (deltay/deltax);
    //     deltay = (this.data.getyPosition(this.frames-1) - this.data.getyPosition(this.frames-2));
    //     deltax = (this.data.getxPosition(this.frames-1) - this.data.getxPosition(this.frames-2));
    //     slope2 = (deltay/deltax);
    //     if (slope1 == slope2) {
    //         return true;
    //     }
    // }
}