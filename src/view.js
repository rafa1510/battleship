// make nav
function createNav() {
    const nav = document.createElement("nav");
    nav.textContent = "Battleship";
    document.body.appendChild(nav);
}

// make main, titlecontainer, and gameContainer
function createMain() {
    const main = document.createElement("main");

    const titleContainer = document.createElement("div");
    titleContainer.className = "titleContainer";
    main.appendChild(titleContainer);

    const gameContainer = document.createElement("div");
    gameContainer.className = "gameContainer";
    main.appendChild(gameContainer);

    document.body.appendChild(main);
}

// render a gameboard and append it to main
function renderGameboard(givenBoard) {
    const gameboard = document.createElement("div");
    gameboard.className = "gameboard";
    for (let y = 0; y < 8; y += 1) {
        const label = document.createElement("div"); // label's on our Y axis
        label.className = "label";
        label.textContent = y;

        gameboard.appendChild(label);

        for (let x = 0; x < 8; x += 1) {
            const cell = document.createElement("div");
            cell.className = "cell";

            // if our coord is storing an object (so our ship), set it to *
            if (givenBoard[x][y] instanceof Object) {
                cell.textContent = "*";
            } else {
                cell.textContent = givenBoard[x][y];
            }

            gameboard.appendChild(cell);
        }
    }

    // label's on our X axis
    const emptyLabel = document.createElement("div");
    emptyLabel.className = "label";
    gameboard.appendChild(emptyLabel);

    for (let i = 0; i < 8; i += 1) {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = i;
        gameboard.appendChild(label);
    }

    const gameContainer = document.querySelector(".gameContainer");
    gameContainer.appendChild(gameboard);
}

// render a player's board & mockboard for their turn
function renderGameTurn(player) {
    // reset gameContainer
    const gameContainer = document.querySelector(".gameContainer");
    gameContainer.innerHTML = "";

    // add user's actual gameboard
    renderGameboard(player.board.board);

    // add user's mock gameboard
    renderGameboard(player.board.mockBoard);

    // add our main text
    renderTurnTitle(player);
}

// make gameSetup
function renderGameSetup() {}
// make gameover
// make setupTItle
function renderSetupTitle() {}
// make turnTitle
function renderTurnTitle(player) {
    // reset titleContainer
    const titleContainer = document.querySelector(".titleContainer");
    titleContainer.innerHTML = "";

    // add our main text & next turn button
    const mainText = document.createElement("div");
    mainText.className = "mainText";
    mainText.textContent = `${player.name} Turn - Attack`;

    const nextTurn = document.createElement("button");
    nextTurn.textContent = "Next Turn";

    titleContainer.appendChild(mainText);
    titleContainer.appendChild(nextTurn);
}

export { createNav, createMain, renderGameTurn };
