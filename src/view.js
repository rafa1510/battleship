function initialSetup() {
    // make nav
    const nav = document.createElement("nav");
    nav.textContent = "Battleship";
    document.body.appendChild(nav);

    // make main, titlecontainer, and gameContainer
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

// make turnTitle
function renderTurnTitle(player, setup = false) {
    // reset titleContainer
    const titleContainer = document.querySelector(".titleContainer");
    titleContainer.innerHTML = "";

    // add our main text & next turn button
    const mainText = document.createElement("div");
    mainText.className = "mainText";

    if (!setup) {
        mainText.textContent = `${player.name} Turn - Attack`;

        const nextTurn = document.createElement("button");
        nextTurn.textContent = "Next Turn";

        titleContainer.appendChild(mainText);
        titleContainer.appendChild(nextTurn);
    } else {
        mainText.textContent = `${player.name} Turn - Setup your Ships`;
        titleContainer.appendChild(mainText);
    }
}

// render setupForm
function renderSetupForm() {
    const form = document.createElement("form");

    function renderShipSetup(shipNum) {
        const label = document.createElement("label");
        label.className = "shipSetup";
        label.textContent = `Ship ${shipNum}`;

        // Start label
        const shipStartLabel = document.createElement("label");
        shipStartLabel.className = "shipLabel";
        shipStartLabel.textContent = "Start:";
        const startSelectX = document.createElement("select");
        startSelectX.id = `ship${shipNum}StartX`;
        const startSelectY = document.createElement("select");
        startSelectY.id = `ship${shipNum}StartY`;

        // End label
        const shipEndLabel = document.createElement("label");
        shipEndLabel.className = "shipLabel";
        shipEndLabel.textContent = "Start:";
        const endSelectX = document.createElement("select");
        endSelectX.id = `ship${shipNum}EndX`;
        const endSelectY = document.createElement("select");
        endSelectY.id = `ship${shipNum}EndY`;

        const labelList = [startSelectX, startSelectY, endSelectX, endSelectY]; // create a list so we can easily add options to each one

        // Select options
        for (let i = 0; i < 8; i += 1) {
            labelList.forEach((currentLabel) => {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                currentLabel.appendChild(option);
            });
        }

        // Append labels to parent labels
        shipStartLabel.appendChild(startSelectX);
        shipStartLabel.appendChild(startSelectY);
        shipEndLabel.appendChild(endSelectX);
        shipEndLabel.appendChild(endSelectY);

        label.appendChild(shipStartLabel);
        label.appendChild(shipEndLabel);

        form.appendChild(label);
    }

    // Create 5 ships
    for (let i = 1; i <= 5; i += 1) {
        renderShipSetup(i);
    }

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.className = "formSubmitButton";
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);

    const gameContainer = document.querySelector(".gameContainer");
    gameContainer.appendChild(form);
}

// render a player's board & mockboard for their turn
function renderGameTurn(player, setup = false) {
    // add our main text
    renderTurnTitle(player, setup);

    // reset gameContainer
    const gameContainer = document.querySelector(".gameContainer");
    gameContainer.innerHTML = "";

    // add user's actual gameboard
    renderGameboard(player.board.board);

    if (!setup) {
        // add user's mock gameboard
        renderGameboard(player.board.mockBoard);
    } else {
        renderSetupForm();
    }
}

// make gameover
function renderGameover(player) {
    const dialog = document.createElement("dialog");
    const gameoverText = document.createElement("h1");
    gameoverText.textContent = `Game over! ${player.name} wins!`;

    dialog.appendChild(gameoverText);
    document.body.appendChild(dialog);
    dialog.showModal();
}

export { initialSetup, renderGameTurn, renderGameover };
