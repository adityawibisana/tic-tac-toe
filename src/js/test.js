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

console.log("All test has been passed")

