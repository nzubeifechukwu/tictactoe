/**
 * A cell represents one square on the board and can have of
 * "-": empty cell, no token palced in the square yet
 * "X": Player 1's token
 * "O": Player 2's token
 */
function cell() {
  let value = "-";

  // Accept a player's token to change the value of the cell
  const addToken = (playerToken) => {
    value = playerToken;
  };
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

/**
 * The gameboard represents the state of the board.
 * Each square represents a cell (defined above).
 */
function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let emptyCells = -1; // will use to check if all cells have been filled
  let placedToken = false; // will use to check if player wants to place token in an occupied cell

  // Create a 2d array to represent the state of the game board,
  // where row 0 is the top row and column 0 is the left column
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
      emptyCells++;
    }
  }

  const getBoard = () => board;

  const placeToken = (r, c, playerToken) => {
    if (emptyCells >= 0) {
      // place token if cell contains no token yet, i.e. contains "-"
      if (board[r][c].getValue() === "-") {
        board[r][c].addToken(playerToken);
        emptyCells--;
        placedToken = true;
      } else {
        placedToken = false;
      }
    }
  };

  const getEmptyCells = () => emptyCells;

  const getPlacedToken = () => placedToken;

  return {
    getBoard,
    placeToken,
    getEmptyCells,
    getPlacedToken,
  };
}

function gameController(
  playerOneName = "Player X",
  playerTwoName = "Player O"
) {
  const board = gameBoard();
  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];
  let activePlayer = players[0];
  let won = false; // use to stop execution after game is won

  const switchPlayerTurn = () => {
    // If last player didn't choose an empty cell, don't switch players
    if (board.getPlacedToken())
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (row, column) => {
    // Stop placing token once game is won
    if (!won) {
      if (board.getEmptyCells() <= 0) {
        board.placeToken(row, column, getActivePlayer().token);

        // Check if last move results in a win
        if (
          (board.getBoard()[0][0].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[2][2].getValue() === "X") ||
          (board.getBoard()[0][0].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[2][2].getValue() === "O") ||
          (board.getBoard()[0][2].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[2][0].getValue() === "X") ||
          (board.getBoard()[0][2].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[2][0].getValue() === "O") ||
          (board.getBoard()[0][0].getValue() === "X" &&
            board.getBoard()[0][1].getValue() === "X" &&
            board.getBoard()[0][2].getValue() === "X") ||
          (board.getBoard()[0][0].getValue() === "O" &&
            board.getBoard()[0][1].getValue() === "O" &&
            board.getBoard()[0][2].getValue() === "O") ||
          (board.getBoard()[1][0].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[1][2].getValue() === "X") ||
          (board.getBoard()[1][0].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[1][2].getValue() === "O") ||
          (board.getBoard()[2][0].getValue() === "X" &&
            board.getBoard()[2][1].getValue() === "X" &&
            board.getBoard()[2][2].getValue() === "X") ||
          (board.getBoard()[2][0].getValue() === "O" &&
            board.getBoard()[2][1].getValue() === "O" &&
            board.getBoard()[2][2].getValue() === "O") ||
          (board.getBoard()[0][0].getValue() === "X" &&
            board.getBoard()[1][0].getValue() === "X" &&
            board.getBoard()[2][0].getValue() === "X") ||
          (board.getBoard()[0][0].getValue() === "O" &&
            board.getBoard()[1][0].getValue() === "O" &&
            board.getBoard()[2][0].getValue() === "O") ||
          (board.getBoard()[0][1].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[2][1].getValue() === "X") ||
          (board.getBoard()[0][1].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[2][1].getValue() === "O") ||
          (board.getBoard()[0][2].getValue() === "X" &&
            board.getBoard()[1][2].getValue() === "X" &&
            board.getBoard()[2][2].getValue() === "X") ||
          (board.getBoard()[0][2].getValue() === "O" &&
            board.getBoard()[1][2].getValue() === "O" &&
            board.getBoard()[2][2].getValue() === "O")
        ) {
          won = true;
          return;
        }
        // Game is a tie if last move didn't result in a win, so stop execution
        return;
      }
      board.placeToken(row, column, getActivePlayer().token);
    }

    // Check for winner
    if (
      (board.getBoard()[0][0].getValue() === "X" &&
        board.getBoard()[1][1].getValue() === "X" &&
        board.getBoard()[2][2].getValue() === "X") ||
      (board.getBoard()[0][0].getValue() === "O" &&
        board.getBoard()[1][1].getValue() === "O" &&
        board.getBoard()[2][2].getValue() === "O") ||
      (board.getBoard()[0][2].getValue() === "X" &&
        board.getBoard()[1][1].getValue() === "X" &&
        board.getBoard()[2][0].getValue() === "X") ||
      (board.getBoard()[0][2].getValue() === "O" &&
        board.getBoard()[1][1].getValue() === "O" &&
        board.getBoard()[2][0].getValue() === "O") ||
      (board.getBoard()[0][0].getValue() === "X" &&
        board.getBoard()[0][1].getValue() === "X" &&
        board.getBoard()[0][2].getValue() === "X") ||
      (board.getBoard()[0][0].getValue() === "O" &&
        board.getBoard()[0][1].getValue() === "O" &&
        board.getBoard()[0][2].getValue() === "O") ||
      (board.getBoard()[1][0].getValue() === "X" &&
        board.getBoard()[1][1].getValue() === "X" &&
        board.getBoard()[1][2].getValue() === "X") ||
      (board.getBoard()[1][0].getValue() === "O" &&
        board.getBoard()[1][1].getValue() === "O" &&
        board.getBoard()[1][2].getValue() === "O") ||
      (board.getBoard()[2][0].getValue() === "X" &&
        board.getBoard()[2][1].getValue() === "X" &&
        board.getBoard()[2][2].getValue() === "X") ||
      (board.getBoard()[2][0].getValue() === "O" &&
        board.getBoard()[2][1].getValue() === "O" &&
        board.getBoard()[2][2].getValue() === "O") ||
      (board.getBoard()[0][0].getValue() === "X" &&
        board.getBoard()[1][0].getValue() === "X" &&
        board.getBoard()[2][0].getValue() === "X") ||
      (board.getBoard()[0][0].getValue() === "O" &&
        board.getBoard()[1][0].getValue() === "O" &&
        board.getBoard()[2][0].getValue() === "O") ||
      (board.getBoard()[0][1].getValue() === "X" &&
        board.getBoard()[1][1].getValue() === "X" &&
        board.getBoard()[2][1].getValue() === "X") ||
      (board.getBoard()[0][1].getValue() === "O" &&
        board.getBoard()[1][1].getValue() === "O" &&
        board.getBoard()[2][1].getValue() === "O") ||
      (board.getBoard()[0][2].getValue() === "X" &&
        board.getBoard()[1][2].getValue() === "X" &&
        board.getBoard()[2][2].getValue() === "X") ||
      (board.getBoard()[0][2].getValue() === "O" &&
        board.getBoard()[1][2].getValue() === "O" &&
        board.getBoard()[2][2].getValue() === "O")
    ) {
      won = true;
      return;
    }

    switchPlayerTurn();
  };

  const getWon = () => won;

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getEmptyCells: board.getEmptyCells,
    getWon,
    getPlacedToken: board.getPlacedToken,
  };
}

function screenController() {
  let playerOne, playerTwo;
  const playerTurnDisplay = document.querySelector("#player-turn");
  const boardSection = document.querySelector("#board");
  const playButton = document.querySelector("#play");
  const dialog = document.querySelector("dialog");
  const submitBtn = document.querySelector("#submit");
  const closeBtn = document.querySelector("#close");
  const playerOneInput = document.querySelector("#player-one");
  const playerTwoInput = document.querySelector("#player-two");

  // Initial render
  playButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    game = gameController();
    updateScreen();
    dialog.close();
  });

  playerOneInput.addEventListener("change", (event) => {
    playerOne = event.target.value.toUpperCase().trim();
  });

  playerTwoInput.addEventListener("change", (event) => {
    playerTwo = event.target.value.toUpperCase().trim();
  });

  submitBtn.addEventListener("click", () => {
    if (playerOne && playerTwo) {
      game = gameController(playerOne, playerTwo);
    } else if (playerOne || playerTwo) {
      game = gameController(playerOne || playerTwo);
    } else {
      game = gameController();
    }
    updateScreen();
    dialog.close();
  });

  const updateScreen = (
    message1 = "",
    message2 = `<h2>${game.getActivePlayer().name}'s turn</h2>`
  ) => {
    boardSection.textContent = "";
    playerTurnDisplay.innerHTML = message1 + message2;

    game.getBoard().forEach((row, index) => {
      const rowDiv = document.createElement("div");
      rowDiv.dataset.row = index;
      boardSection.appendChild(rowDiv);

      row.forEach((cell, index) => {
        const button = document.createElement("button");
        button.dataset.column = index;
        rowDiv.appendChild(button);
        button.textContent = cell.getValue();
      });
    });
  };

  const clickHandler = (event) => {
    const column = parseInt(event.target.dataset.column);
    const row = parseInt(event.target.parentNode.dataset.row);

    // Had to exclusively set the name and token because game.playRound() will switch the active player
    const name = game.getActivePlayer().name;
    const token = game.getActivePlayer().token;

    game.playRound(row, column);

    if (game.getWon()) {
      updateScreen("<h3>GAME OVER!!!</h3>", `<h2>${name} WINS!</h2>`);
      playButton.textContent = "Play Again";
      return;
    }

    if (!game.getWon() && game.getEmptyCells() < 0) {
      updateScreen("<h3>GAME OVER!!!</h3>", "<h2>Game is a TIE!</h2>");
      playButton.textContent = "Play Again";
      return;
    }

    if (!game.getPlacedToken()) {
      updateScreen("<h3>Cell already filled up! Choose another cell.</h3>");
    } else {
      updateScreen(
        `<h3>Placed ${name}'s token (${token}) into row ${row + 1} and column ${
          column + 1
        }...</h3>`
      );
    }
  };
  boardSection.addEventListener("click", clickHandler);
}

// Entry point
screenController();
