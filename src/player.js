import Gameboard from "./gameboard";

export default class Player {
    constructor(name = "Player 1") {
        this.name = name;
        this.board = new Gameboard();
    }
}