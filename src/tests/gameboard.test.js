import Ship from "../ship";
import Gameboard from "../gameboard";

// tests for placing ships

test("place ship at 0,0 until 0,3", () => {
    const board = new Gameboard();
    const matchShip = new Ship(4);
    const matchBoard = [
        [matchShip, matchShip, matchShip, matchShip, "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
    ];
    expect(board.placeShip([0, 0], [0, 3])).toEqual(matchBoard);
});

test("place ship at 3,4 until 5,4", () => {
    const board = new Gameboard();
    const matchShip = new Ship(3);
    const matchBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", matchShip, "", "", ""],
        ["", "", "", "", matchShip, "", "", ""],
        ["", "", "", "", matchShip, "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
    ];
    expect(board.placeShip([3, 4], [5, 4])).toEqual(matchBoard);
});

// tests for hitting ships

test("hit a ship at a specific coordinate", () => {
    const board = new Gameboard();
    board.placeShip([3, 4], [5, 4]);
    board.receiveAttack([4, 4]);
    board.receiveAttack([3, 4]);
    expect(board.board[5][4].hits).toEqual(2);
});

test("hit a coordinate with no ship", () => {
    const board = new Gameboard();
    board.placeShip([3, 4], [5, 4]);
    board.receiveAttack([7, 4]);
    expect(board.missedHits).toEqual(1);
});

test("hit a ship at the same coordinate twice", () => {
    const board = new Gameboard();
    board.placeShip([7, 4], [7, 0]);
    board.receiveAttack([7, 2]);
    board.receiveAttack([7, 2]);
    expect(board.board[7][3].hits).toEqual(1);
});

test("sink the only ship in the board", () => {
    const board = new Gameboard();
    board.placeShip([7, 4], [7, 0]);
    board.receiveAttack([7, 0]);
    board.receiveAttack([7, 1]);
    board.receiveAttack([7, 2]);
    board.receiveAttack([7, 3]);
    board.receiveAttack([7, 4]);
    expect(board.allSunk).toEqual(true);
});
