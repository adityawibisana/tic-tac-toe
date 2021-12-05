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
            boardSize = size;
            reDraw();
            $("#error-size").html("")
        } else {
            $("#error-size").html("Minimum value is 3")
        }
    })

    $("#match").on("input", function () {
        const size = parseInt(this.value, 10)
        if (!isNaN(size) && size >= 3) {
            match = size
            $("#error-match").html("")
        } else {
            $("#error-match").html("Minimum value is 3")
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

            const xWin = isWin(boxes, x, match)
            if (xWin) {
                x_win++;
                $('#x_win').html(`${x_win}`)
                return showWinnerAndReset(x, xWin)
            }

            const oWin = isWin(boxes, o, match)
            if (oWin) {
                o_win++;
                $('#o_win').html(`${o_win}`)
                return showWinnerAndReset(o, oWin)
            }

            if (count >= boardSize * boardSize) {
                setTimeout(() => {
                    alert(`Tie. Game will be restarted`)
                    reset()
                }, 0);
            }
        });
        reset()
    }

    function showWinnerAndReset(winner, winPos) {
        for (let i = 0; i < winPos.length; i++) {
            console.log(`Win position:${winPos[i][0]}-${winPos[i][1]}`)
            $(`#${winPos[i][0]}-${winPos[i][1]}`).addClass('winbox')
        }
        setTimeout(() => {
            alert(`${winner} has won the game.Game will be restarted`)
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
        $("#game td div").removeClass('winbox')
        boxes = new Array(boardSize).fill("-").map(() => new Array(boardSize).fill("-"));
        count = 0
    }

    function isWin(boxes, character, match) {
        return getHorizontalWinPositions(boxes, character, match)
            || getVerticalWinPositions(boxes, character, match)
            || getDiagonalWinPositions(boxes, character, match)
            || getDiagonalBackWinPositions(boxes, character, match)
    }

    /**
    * Get horizontal win positions of the specified character.
    * @param {Array.<string[]>} boxes 2 dimensional array
    * @param {String} character O or X
    * @param {Integer} adjacentNumber number of adjacent-horizontal O and X required to win
    * @returns {Array} list of horizontal win positions (row-column-index). Null if there aren't any.
    */
    function getHorizontalWinPositions(boxes, character, adjacentNumber) {
        let counter = 0
        let winPos = []
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            for (let j = 0; j < box.length; j++) {
                if (boxes[i][j] === character) {
                    counter++
                    winPos.push([i, j])
                } else {
                    counter = 0
                    winPos = []
                }

                if (counter === adjacentNumber) { // we have winner
                    return winPos
                }
            }
            counter = 0
            winPos = []
        }
        return null
    }

    /**
    * Get vertical win positions of the specified character.
    * @param {Array.<string[]>} boxes 2 dimensional array
    * @param {String} character O or X
    * @param {Integer} adjacentNumber number of adjacent-vertical O or X required to win
    * @returns {Array} list of vertical win positions (row-column-index). Null if there aren't any.
    */
    function getVerticalWinPositions(boxes, character, adjacentNumber) {
        let counter = 0
        let winPos = []
        for (let j = 0; j < boxes.length; j++) {
            for (let i = 0; i < boxes.length; i++) {
                const box = boxes[i];
                if (boxes[i][j] === character) {
                    counter++
                    winPos.push([i, j])
                } else {
                    counter = 0
                    winPos = []
                }

                if (counter === adjacentNumber) {
                    return winPos
                }
            }
            counter = 0
            winPos = []
        }
        return null
    }

    /**
    * Get diagonal win positions of the specified character.
    * @param {Array.<string[]>} boxes 2 dimensional array
    * @param {String} character O or X
    * @param {Integer} adjacentNumber number of adjacent-diagonal O or X required to win
    * @returns {Array} list of diagonal win positions (row-column-index). Null if there aren't any.
    */
    function getDiagonalWinPositions(boxes, character, adjacentNumber) {
        let counter = 0;
        let winPos = []
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            for (let j = 0; j < box.length; j++) {
                if (boxes[i][j] === character) {
                    counter++
                    winPos.push([i, j])
                    // use new variable because we don't want to interfere current iteration
                    let row = i;
                    let column = j;
                    while (row + 1 < boxes.length && column + 1 < box.length) {
                        row++;
                        column++;
                        if (boxes[row][column] === character) {
                            counter++
                            winPos.push([row, column])
                        } else {
                            counter = 0
                            winPos = []
                        }
                        if (counter === adjacentNumber) {
                            return winPos
                        }
                    }
                }
                counter = 0;
                winPos = []
            }
            counter = 0
            winPos = []
        }
        return null
    }

    /**
    * Get diagonal-back win positions of the specified character.
    * @param {Array.<string[]>} boxes 2 dimensional array
    * @param {String} character O or X
    * @param {Integer} adjacentNumber number of adjacent-diagonal-back O or X required to win
    * @returns {Array} list of diagonal-back win positions (row-column-index). Null if there aren't any.
    */
    function getDiagonalBackWinPositions(boxes, character, adjacentNumber) {
        let winPos = []
        for (let i = 0; i < boxes.length; i++) {
            let box = boxes[i];
            for (let j = box.length - 1; j >= 0; j--) {
                counter = 0;
                if (boxes[i][j] === character) {
                    counter++
                    winPos.push([i, j])

                    // use new variable because we don't want to interfere current iteration
                    let row = i;
                    let column = j;
                    while (row + 1 < box.length && column - 1 >= 0) {
                        row++;
                        column--;
                        if (boxes[row][column] === character) {
                            counter++
                            winPos.push([row, column])
                        } else {
                            counter = 0
                            winPos = []
                        }

                        if (counter === adjacentNumber) {
                            return winPos
                        }
                    }
                }
            }
        }
        return null
    }
});
