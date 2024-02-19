import Player from "./player";

export default class Game {
    constructor() {
        this.playerOne = new Player("Player 1");
        this.playerTwo = new Player("Player 2");
    }

    playerOneSetup(start, end) {
        this.playerOne.board.placeShip(start, end);
    }

    playerTwoSetup(start, end) {
        this.playerTwo.board.placeShip(start, end);
    }

    playerOneTurn(coords) {
        this.playerTwo.board.receiveAttack(coords);
        if (this.playerTwo.board.allSunk) {
            return true;
        }
        return `${this.playerTwo.name}'s turn`;
    }

    playerTwoTurn(coords) {
        this.playerOne.board.receiveAttack(coords);
        if (this.playerOne.board.allSunk) {
            return true;
        }
        return false;
    }
}
