// JavaScript Document
$(document).ready(function () {
    const x = "x";
    const o = "o";
    let count = 0;
    let o_win = 0;
    let x_win = 0;
    $('#game li').click(function () {

        if (isOWin()) {
            alert('O has won the game. Start a new game')
            $("#game li").text("+");
            $("#game li").removeClass('disable')
            $("#game li").removeClass('o')
            $("#game li").removeClass('x')
            $("#game li").removeClass('btn-primary')
            $("#game li").removeClass('btn-info')
        }
        else if (isXWin()) {
            alert('X wins has won the game. Start a new game')
            $("#game li").text("+");
            $("#game li").removeClass('disable')
            $("#game li").removeClass('o')
            $("#game li").removeClass('x')
            $("#game li").removeClass('btn-primary')
            $("#game li").removeClass('btn-info')
        }
        else if (count == 9) {
            alert('Its a tie. It will restart.')
            $("#game li").text("+");
            $("#game li").removeClass('disable')
            $("#game li").removeClass('o')
            $("#game li").removeClass('x')
            $("#game li").removeClass('btn-primary')
            $("#game li").removeClass('btn-info')
            count = 0
        }
        else if ($(this).hasClass('disable')) {
            alert('Already selected')
        }
        else if (count % 2 == 0) {
            count++
            $(this).text(o)
            $(this).addClass('disable o btn-primary')
            if (isOWin()) {
                alert('O wins')
                count = 0
                o_win++
                $('#o_win').text(o_win)
            }
        }
        else {
            count++
            $(this).text(x)
            $(this).addClass('disable x btn-info')
            if (isXWin()) {
                alert('X wins')
                count = 0
                x_win++
                $('#x_win').text(x_win)
            }
        }

        function isOWin() {
            return $("#one").hasClass('o') && $("#two").hasClass('o') && $("#three").hasClass('o') || $("#four").hasClass('o') && $("#five").hasClass('o') && $("#six").hasClass('o') || $("#seven").hasClass('o') && $("#eight").hasClass('o') && $("#nine").hasClass('o') || $("#one").hasClass('o') && $("#four").hasClass('o') && $("#seven").hasClass('o') || $("#two").hasClass('o') && $("#five").hasClass('o') && $("#eight").hasClass('o') || $("#three").hasClass('o') && $("#six").hasClass('o') && $("#nine").hasClass('o') || $("#one").hasClass('o') && $("#five").hasClass('o') && $("#nine").hasClass('o') || $("#three").hasClass('o') && $("#five").hasClass('o') && $("#seven").hasClass('o')
        }

        function isXWin() {
            return $("#one").hasClass('x') && $("#two").hasClass('x') && $("#three").hasClass('x') || $("#four").hasClass('x') && $("#five").hasClass('x') && $("#six").hasClass('x') || $("#seven").hasClass('x') && $("#eight").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#four").hasClass('x') && $("#seven").hasClass('x') || $("#two").hasClass('x') && $("#five").hasClass('x') && $("#eight").hasClass('x') || $("#three").hasClass('x') && $("#six").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#five").hasClass('x') && $("#nine").hasClass('x') || $("#three").hasClass('x') && $("#five").hasClass('x') && $("#seven").hasClass('x')
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
                    if (box[i][j] === character) {
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
        }
    });
    $("#reset").click(function () {
        $("#game li").text("+");
        $("#game li").removeClass('disable')
        $("#game li").removeClass('o')
        $("#game li").removeClass('x')
        $("#game li").removeClass('btn-primary')
        $("#game li").removeClass('btn-info')
        count = 0

    });
});
