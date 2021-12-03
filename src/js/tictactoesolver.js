const MATCH_NUMBER = 3
module.exports = {
    /**
     * Check whether specified character win the game, based on its horizontal position
     * @param {Array.<string[]>} boxes 2 dimensional array
     * @param {String} character O or X
     * @returns {Boolean} true, if specified character win
     */
    isWinningHorizontal: (boxes, character) => {
        let counter = 0
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            for (let j = 0; j < box.length; j++) {
                if (boxes[i][j] === character) {
                    counter++
                } else {
                    counter = 0
                }

                if (counter === MATCH_NUMBER) { // we have winner
                    return true
                }
            }
            counter = 0
        }
        return false
    },

    /**
     * Check whether specified character win the game, based on its vertical position
     * @param {Array.<string[]>} boxes 2 dimensional array containing O or X
     * @param {String} character O or X
     * @returns {Boolean} true, if specified character win
     */
    isWinningVertical: (boxes, character) => {
        let counter = 0
        for (let j = 0; j < boxes.length; j++) {
            for (let i = 0; i < boxes.length; i++) {
                const box = boxes[i];
                if (boxes[i][j] === character) {
                    counter++
                } else {
                    counter = 0
                }

                if (counter === MATCH_NUMBER) {
                    return true
                }
            }
            counter = 0
        }
        return false
    },

    /**
     * Check whether specified character win the game, based on its diagonal position
     * @param {Array.<string[]>} boxes 2 dimensional array containing O or X
     * @param {String} character O or X
     * @returns {Boolean} true, if specified character win
     */
    isWinningDiagonal: (boxes, character) => {
        let counter = 0;
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            for (let j = 0; j < box.length; j++) {
                if (boxes[i][j] === character) {
                    counter++
                    while (i < boxes.length && j < box.length) {
                        i++;
                        j++;
                        if (boxes[i][j] === character) {
                            counter++
                        } else {
                            counter = 0
                        }

                        if (counter === MATCH_NUMBER) {
                            return true
                        }
                    }
                }
            }
            counter = 0
        }
        return false
    },

    /**
    * Check whether specified character win the game, based on its diagonal-right position
    * @param {Array.<string[]>} boxes 2 dimensional array containing O or X
    * @param {String} character O or X
    * @returns {Boolean} true, if specified character win
    */
    isWinningDiagonalRight: (boxes, character) => {
        for (let i = 0; i < boxes.length; i++) {
            let box = boxes[i];
            for (let j = box.length - 1; j > 0; j--) {
                if (boxes[i][j] === character) {
                    counter++
                    while (i < boxes.length && j > 0) {
                        i--;
                        j++;
                        if (boxes[i][j] === character) {
                            counter++
                        } else {
                            counter = 0
                        }

                        if (counter === MATCH_NUMBER) {
                            return true
                        }
                    }
                }
            }
            counter = 0
        }
        return false
    }
}
