class Selector {
    
    /**
	 * Construct a Selector object with assigned dataset object passed to it
	 * called as Selector(DataSet data)
	 * @param {dataSet} data
	 */

    constructor(data) {
        this.data = data;
    }

    dismiss(popNumber) {
        if (this.data.popZero() == true) {
            console.log('zeropop');
            return true;
        } if ((this.data.samePosition() == true) && (this.data.popConstant(popNumber) == true)) {
            console.log('samepopsamepos');
            return true;
        } return false;
    }

    tierTwo(popNumber) {
        if ((this.data.samePosition() == true) && (this.data.popWacky(popNumber) == true)) {
            return true;
        } return false;
    }

    good(popNumber) {
        if ((this.data.diffPosition() == true) && (this.data.popConstant(popNumber) == true)) {
            if (this.data.linearMotion()) { //see description of linear motion function -- checks a very specific glider trait
                return true;
            }
        } return false;
    }

    chaos(popNumber) {
        if ((this.data.diffPosition() == true) && (this.data.popWacky(popNumber) == true)) {
            return true;
        } return false;
    }
}