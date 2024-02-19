import Ship from "./ship";

export default class Gameboard {
    constructor() {
        this.board = [];
        this.mockBoard = [];
        this.missedHits = 0;
        this.allSunk = false;
        this.shipsCount = 0;
        this.sunkenShipsCount = 0;
        this.#buildBoard();
    }

    // build a board in an 8x8 2d array
    #buildBoard() {
        for (let y = 0; y < 8; y += 1) {
            const newRow = [];
            const newMockRow = [];
            for (let x = 0; x < 8; x += 1) {
                newRow.push(""); // set each cell in our board to equal ""
                newMockRow.push("");
            }
            this.board.push(newRow);
            this.mockBoard.push(newMockRow);
        }
        return true;
    }

    // will take 2 coordinates and build a ship along it
    placeShip(start, end) {
        // taking min/max so that it doesn't matter which order we input the coordinates
        const XSTART = Math.min(start[0], end[0]);
        const YSTART = Math.min(start[1], end[1]);
        const XEND = Math.max(start[0], end[0]);
        const YEND = Math.max(start[1], end[1]);

        const length = Math.max(XEND - XSTART, YEND - YSTART);

        const newShip = new Ship(length + 1);
        this.shipsCount += 1;

        for (let y = YSTART; y <= YEND; y += 1) {
            for (let x = XSTART; x <= XEND; x += 1) {
                this.board[x][y] = newShip;
            }
        }

        return this.board;
    }

    // hit a ship at a specific coordinate
    receiveAttack(coords) {
        const x = coords[0];
        const y = coords[1];

        // If coord is empty
        if (this.board[x][y] === "") {
            this.board[x][y] = "O"; // change to O which means missed hit
            this.mockBoard[x][y] = "O";
            this.missedHits += 1;
        }
        // if coord is a ship
        else if (this.board[x][y] instanceof Ship) {
            this.board[x][y].hit();

            // if this attack sinks the ship, add to sunkenShipsCount
            if (this.board[x][y].length === this.board[x][y].hits) {
                this.sunkenShipsCount += 1;

                // if all our ships are sunk now, change allSunk
                if (this.sunkenShipsCount === this.shipsCount) {
                    this.allSunk = true;
                }
            }

            this.board[x][y] = "X"; // change to X which means a hit
            this.mockBoard[x][y] = "X";
        }
    }
}
