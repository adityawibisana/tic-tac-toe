// JavaScript Document
$(document).ready(function () {
    let boardSize = 7
    let count = 0;
    const x = "X";
    const o = "O";
    let o_win = 0;
    let x_win = 0;

    let boxes = new Array(boardSize).fill("-").map(() => new Array(boardSize).fill("-"));
    let match = 3

    reDraw()

    $("#board_size").on("input", function () {
        const size = parseInt(this.value, 10)
        if (!isNaN(size) && size >= 3) {
            boardSize = size
            reDraw()
        }
    })

    $("#match").on("input", function () {
        const size = parseInt(this.value, 10)
        if (!isNaN(size) && size >= 3) {
            match = size
        }
    })

    function reDraw() {
        $('#game').empty()
        $('#game').append('<tr></tr>')
        for (let i = 0; i < boardSize; i++) {
            let content = `<tr>`
            for (let j = 0; j < boardSize; j++) {
                content += `<td><div id=${i}-${j} class="btn span1 basebox">+</div></td>`;
            }
            content += `</tr>`;
            $('#game tr:last').after(content);
        }
        $('#game td div').click(function () {
            if ($(this).hasClass('disable')) {
                return alert('Already selected')
            }

            let character = "-"
            if (count % 2 === 0) {
                $(this).text(o)
                $(this).addClass('o btn-primary');
                character = o
            } else {
                $(this).text(x)
                $(this).addClass('x btn-info');
                character = x
            }
            count++
            $(this).addClass('disable');

            const row = parseInt(this.id.split('-')[0])
            const column = parseInt(this.id.split('-')[1])
            boxes[row][column] = character

            for (let i = 0; i < boardSize; i++) {
                let printChar = ""
                for (let j = 0; j < boardSize; j++) {
                    printChar += `${boxes[i][j]}`
                }
                console.log(printChar)
            }

            if (isWin(boxes, x)) {
                x_win++;
                $('#x_win').html(`${x_win}`)
                showWinnerAndReset(x)
            } else if (isWin(boxes, o)) {
                o_win++;
                $('#o_win').html(`${o_win}`)
                showWinnerAndReset(o)
            }
        });
        reset()
    }

    function showWinnerAndReset(winner) {
        setTimeout(() => {
            alert(`${winner} has won the game. Game will be restarted`)
            reset()
        }, 0);
    }

    function reset() {
        $("#game td div").text("+");
        $("#game td div").removeClass('disable')
        $("#game td div").removeClass('o')
        $("#game td div").removeClass('x')
        $("#game td div").removeClass('btn-primary')
        $("#game td div").removeClass('btn-info')
        boxes = new Array(boardSize).fill("-").map(() => new Array(boardSize).fill("-"));
    }

    function isWin(boxes, character) {
        return isWinningHorizontal(boxes, character)
            || isWinningVertical(boxes, character)
            || isWinningDiagonal(boxes, character)
            || isWinningDiagonalBack(boxes, character)
    }

    /**
   * Check whether specified character win the game, based on its horizontal position
   * @param {Array.<string[]>} boxes 2 dimensional array
   * @param {String} character O or X
   * @returns {Boolean} true, if specified character win
   */
    function isWinningHorizontal(boxes, character) {
        let counter = 0
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            for (let j = 0; j < box.length; j++) {
                if (boxes[i][j] === character) {
                    counter++
                } else {
                    counter = 0
                }

                if (counter === match) { // we have winner
                    return true
                }
            }
            counter = 0
        }
        return false
    }

    /**
     * Check whether specified character win the game, based on its vertical position
     * @param {Array.<string[]>} boxes 2 dimensional array containing O or X
     * @param {String} character O or X
     * @returns {Boolean} true, if specified character win
     */
    function isWinningVertical(boxes, character) {
        let counter = 0
        for (let j = 0; j < boxes.length; j++) {
            for (let i = 0; i < boxes.length; i++) {
                const box = boxes[i];
                if (boxes[i][j] === character) {
                    counter++
                } else {
                    counter = 0
                }

                if (counter === match) {
                    return true
                }
            }
            counter = 0
        }
        return false
    }

    /**
     * Check whether specified character win the game, based on its diagonal position
     * @param {Array.<string[]>} boxes 2 dimensional array containing O or X
     * @param {String} character O or X
     * @returns {Boolean} true, if specified character win
     */
    function isWinningDiagonal(boxes, character) {
        let counter = 0;
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            for (let j = 0; j < box.length; j++) {
                if (boxes[i][j] === character) {
                    counter++
                    // use new variable because we don't want to interfere current iteration
                    let row = i;
                    let column = j;
                    while (row + 1 < boxes.length && column + 1 < box.length) {
                        row++;
                        column++;
                        if (boxes[row][column] === character) {
                            counter++
                        } else {
                            counter = 0
                        }
                        if (counter === match) {
                            return true
                        }
                    }
                }
                counter = 0;
            }
            counter = 0
        }
        return false
    }

    /**
    * Check whether specified character win the game, based on its diagonal-back position
    * @param {Array.<string[]>} boxes 2 dimensional array containing O or X
    * @param {String} character O or X
    * @returns {Boolean} true, if specified character win
    */
    function isWinningDiagonalBack(boxes, character) {
        for (let i = 0; i < boxes.length; i++) {
            let box = boxes[i];
            for (let j = box.length - 1; j >= 0; j--) {
                counter = 0;
                if (boxes[i][j] === character) {
                    counter++

                    // use new variable because we don't want to interfere current iteration
                    let row = i;
                    let column = j;
                    while (row + 1 < box.length && column - 1 >= 0) {
                        row++;
                        column--;
                        if (boxes[row][column] === character) {
                            counter++
                        } else {
                            counter = 0
                        }

                        if (counter === match) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
});
