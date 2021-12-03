const expect = require('expect');
const tictactoesolver = require('./tictactoesolver');

const boxesHorizontalTest1 = [
    ["O", "X", "O"],
    ["X", "X", "X"],
    ["O", "X", "O"],
];
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalTest1, "X")).toBe(true)
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalTest1, "O")).toBe(false)

const boxesHorizontalTest2 = [
    ["O", "X", "X", "O"],
    ["O", "O", "X", "O"],
    ["O", "X", "X", "X"],
    ["O", "O", "X", "O"],
]
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalTest2, "X")).toBe(true)
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalTest2, "O")).toBe(false)

const boxesDiagonalTest1 = [
    ["O", "X", "X", "O"],
    ["O", "O", "X", "O"],
    ["O", "X", "X", "X"],
    ["O", "O", "X", "O"],
]
expect(tictactoesolver.isWinningDiagonal(boxesDiagonalTest1, "X")).toBe(true)
expect(tictactoesolver.isWinningDiagonal(boxesDiagonalTest1, "O")).toBe(false)

const boxesDiagonalBackTest1 = [
    ["O", "X", "X", "O"],
    ["O", "O", "O", "X"],
    ["O", "X", "X", "X"],
    ["O", "X", "X", "O"],
]
expect(tictactoesolver.isWinningDiagonalBack(boxesDiagonalBackTest1, "X")).toBe(true)
expect(tictactoesolver.isWinningDiagonalBack(boxesDiagonalBackTest1, "O")).toBe(false)

// Currently, just print to prevent confusion
// In case tests are wrong, there will be some messages on the console.
console.log("All tests have been passed")

