const expect = require('expect');
const tictactoesolver = require('./tictactoesolver');

const boxesHorizontalPositiveTest1 = [
    ["O", "X", "O"],
    ["X", "X", "X"],
    ["O", "X", "O"],
];
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest1, "X")).toBe(true)
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest1, "O")).toBe(false)

const boxesHorizontalPositiveTest2 = [
    ["O", "X", "X", "O"],
    ["O", "O", "X", "O"],
    ["O", "X", "X", "X"],
    ["O", "O", "X", "O"],
]
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest2, "X")).toBe(true)
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest2, "O")).toBe(false)

console.log("All test has been passed")
