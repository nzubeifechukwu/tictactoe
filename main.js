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
        console.log("Cell already filled up. Please choose an empty cell.");
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
    console.log(board.getEmptyCells());
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
          console.log(
            `GAME OVER! ${
              getActivePlayer().name
            } WINS!!!\nRefresh page to play again.`
          );
          return;
        }

        // Game is a tie if last move didn't result in a win
        console.log("GAME IS A TIE! Refresh to play again.");
        return;
      }
      console.log(
        `Placing ${getActivePlayer().name}'s token into row ${
          row + 1
        } and column ${column + 1}...`
      );
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
      console.log(
        `GAME OVER! ${
          getActivePlayer().name
        } WINS!!!\nRefresh page to play again.`
      );
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
  };
}

function screenController() {
  const game = gameController();
  const playerTurnDisplay = document.querySelector("#player-turn");
  const boardSection = document.querySelector("#board");

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
    const placedTokenMessage = `<h3>Placed ${
      game.getActivePlayer().name
    }'s token into row ${row + 1} and column ${column + 1}...</h3>`;

    game.playRound(row, column);

    if (game.getWon()) {
      updateScreen(
        "<h2>GAME OVER!!!</h2>",
        `<h3>${game.getActivePlayer().name} WINS!</h3>`
      );
      return;
    }

    if (!game.getWon() && game.getEmptyCells() < 0) {
      updateScreen("<h2>GAME OVER!!!</h2>", "<h3>Game is a TIE!</h3>");
      return;
    }

    updateScreen(placedTokenMessage);
  };

  boardSection.addEventListener("click", clickHandler);

  // Initial render
  updateScreen();
}

// Entry point
screenController();
