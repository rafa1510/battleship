import Game from "./game";
import { initialSetup, renderGameTurn, renderGameover } from "./view";

export default function startGame() {
    initialSetup();

    // Create game
    const game = new Game();

    // Call playerOneSetup
    controlPlayerOneSetup();

    function controlPlayerOneSetup() {
        renderGameTurn(game.playerOne, true);
        const setupForm = document.querySelector(".setupForm");
        setupForm.addEventListener("submit", () => {
            // Add each ship to our backend
            const addedCoords = new Set(); // will be used to make sure every ship is different
            let coordsToAdd = [];
            for (let i = 1; i <= 5; i += 1) {
                // Grab user input
                const startX = document.querySelector(`#ship${i}StartX`).value;
                const startY = document.querySelector(`#ship${i}StartY`).value;
                const endX = document.querySelector(`#ship${i}EndX`).value;
                const endY = document.querySelector(`#ship${i}EndY`).value;

                // Store combined coord in our set so each ship is different
                const combineCoord = [startX, startY, endX, endY];

                if (addedCoords.has(combineCoord.toString())) {
                    alert("Please place your ships in different positions");
                    controlPlayerOneSetup();
                    coordsToAdd = []; // reset coords to add
                    return false;
                }
                addedCoords.add(combineCoord.toString());
                coordsToAdd.push(combineCoord);
            }

            coordsToAdd.forEach((coord) => {
                const startCoord = coord.slice(0, 2);
                const endCoord = coord.slice(2);
                // Add to backend
                game.playerOneSetup(startCoord, endCoord);
            });

            controlPlayerTwoSetup();
        });
    }

    function controlPlayerTwoSetup() {
        renderGameTurn(game.playerTwo, true);
        const setupForm = document.querySelector(".setupForm");
        setupForm.addEventListener("submit", (event) => {
            // Add each ship to our backend
            const addedCoords = new Set(); // will be used to make sure every ship is different
            let coordsToAdd = [];
            for (let i = 1; i <= 5; i += 1) {
                // Grab user input
                const startX = document.querySelector(`#ship${i}StartX`).value;
                const startY = document.querySelector(`#ship${i}StartY`).value;
                const endX = document.querySelector(`#ship${i}EndX`).value;
                const endY = document.querySelector(`#ship${i}EndY`).value;

                // Store combined coord in our set so each ship is different
                const combineCoord = [startX, startY, endX, endY];

                if (addedCoords.has(combineCoord.toString())) {
                    alert("Please place your ships in different positions");
                    controlPlayerTwoSetup();
                    coordsToAdd = []; // reset coords to add
                    return false;
                }
                addedCoords.add(combineCoord.toString());
                coordsToAdd.push(combineCoord);
            }

            coordsToAdd.forEach((coord) => {
                const startCoord = coord.slice(0, 2);
                const endCoord = coord.slice(2);
                // Add to backend
                game.playerTwoSetup(startCoord, endCoord);
            });

            // Prevent form from reloading page
            event.preventDefault();

            controlPlayerTurn(game.playerOne);
        });
    }

    function controlPlayerTurn(player) {
        renderGameTurn(player);
        const attackForm = document.querySelector(".attackForm");
        attackForm.addEventListener("submit", (event) => {
            const xCoord = document.getElementById("attackX").value;
            const yCoord = document.getElementById("attackY").value;

            const attackCoord = [xCoord, yCoord];

            if (player === game.playerOne) {
                if (game.playerOneTurn(attackCoord)) {
                    renderGameover(player);
                } else {
                    controlPlayerTurn(game.playerTwo);
                }
            } else if (player === game.playerTwo) {
                if (game.playerTwoTurn(attackCoord)) {
                    renderGameover(player);
                } else {
                    controlPlayerTurn(game.playerOne);
                }
            }

            // Prevent from from reloading page
            event.preventDefault();
        });
    }
}
