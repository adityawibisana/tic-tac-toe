const expect = require('expect');
const tictactoesolver = require('./tictactoesolver');

const boxesHorizontalPositiveTest1 = [
    ["O", "X", "O"],
    ["X", "X", "X"],
    ["O", "X", "O"],
];
const boxesHorizontalPositiveTest2 = [
    ["O", "X", "X", "O"],
    ["O", "O", "O", "O"],
    ["O", "X", "X", "X"],
    ["O", "O", "X", "O"],
]
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest1, "X")).toBe(true)
expect(tictactoesolver.isWinningHorizontal(boxesHorizontalPositiveTest2, "X")).toBe(true)

