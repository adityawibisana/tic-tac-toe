const tictactoesolver = require('./tictactoesolver');

const boxesHorizontalPositiveTest1 = [
    ["O", "X", "O"],
    ["X", "X", "X"],
    ["O", "X", "O"],
]

console.log(`${tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest1, "X")}`)

