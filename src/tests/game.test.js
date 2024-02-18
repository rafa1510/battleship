import Game from "../game";

test("start game and defeat enemy", () => {
    const testGame = new Game();
    testGame.playerOneSetup([1, 2], [1, 3]);
    testGame.playerTwoTurn([1, 2]);
    expect(testGame.playerTwoTurn([1, 3])).toEqual("Game over, Player 2 wins!");
});

test("start game and play one turn", () => {
    const testGame = new Game();
    testGame.playerOneSetup([1, 2], [1, 3]);
    expect(testGame.playerTwoTurn([1, 3])).toEqual("Player 1's turn");
});
