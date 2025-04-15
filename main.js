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
  let emptyCells = 0; // will use to check if all cells have been filled
  let placedToken = false; // will use to check if player wants to place token in an occupied cell

  // Create a 2d array to represent the state of the game board,
  // where row 0 is the top row and column 0 is the left column
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  board.forEach((row) =>
    row.some((cell) => {
      if (cell.getValue() === "-") emptyCells++;
    })
  );

  const placeToken = (r, c, playerToken) => {
    if (emptyCells) {
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

  // May not need this after we've built the UI
  const printBoard = () => {
    const boardWithTokens = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithTokens);
    return boardWithTokens; // I added it for UI
  };

  return { getBoard, placeToken, printBoard, getEmptyCells, getPlacedToken };
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

  const switchPlayerTurn = () => {
    // If last player didn't choose an empty cell, don't switch players
    if (board.getPlacedToken())
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (row, column) => {
    // If no more empty cells and no winner yet, game is a tie
    if (!board.getEmptyCells()) {
      board.printBoard();
      console.log("GAME IS A TIE! Refresh to play again.");
      return;
    }
    console.log(
      `Place ${
        getActivePlayer().name
      }'s token into row ${row} and column ${column}...`
    );

    board.placeToken(row, column, getActivePlayer().token);

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
      board.printBoard();
      console.log(
        `GAME OVER! ${
          getActivePlayer().name
        } WINS!!!\nRefresh page to play again.`
      );
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  // Initial play game message
  printNewRound();

  // For the console version, we will only use playRound, but we will need
  // getActivePlayer for the UI version
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function screenController() {
  const game = gameController();
  // const main = document.querySelector("main");
  const playerTurnDisplay = document.querySelector("#player-turn");
  const boardSection = document.querySelector("#board");

  const updateScreen = () => {
    playerTurnDisplay.textContent = `${game.getActivePlayer().name}'s turn`;
    game.getBoard().forEach((row, index) => {
      const rowDiv = document.createElement("div");
      rowDiv.dataset.row = index + 1;
      boardSection.appendChild(rowDiv);
      row.forEach((cell, index) => {
        const button = document.createElement("button");
        button.dataset.column = index + 1;
        rowDiv.appendChild(button);
        button.textContent = cell.getValue();
      });
    });
  };

  const clickHandler = (e) => {
    const column = parseInt(e.target.dataset.column);
    const row = parseInt(e.target.parentNode.dataset.row);

    game.playRound(row, column);
    updateScreen();
  };

  boardSection.addEventListener("click", clickHandler);

  // Initial render
  updateScreen();
}

screenController();
