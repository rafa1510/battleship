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
            return `Game over, ${this.playerOne.name} wins!`;
        }
        return `${this.playerTwo.name}'s turn`;
    }

    playerTwoTurn(coords) {
        this.playerOne.board.receiveAttack(coords);
        if (this.playerOne.board.allSunk) {
            return `Game over, ${this.playerTwo.name} wins!`;
        }
        return `${this.playerOne.name}'s turn`;
    }

    nextTurn() {
        if (this.checkGameover()) {
            this.gameover();
        } else {
            this.playerOneTurn();
            this.playerTwoTurn();
        }
    }
}
