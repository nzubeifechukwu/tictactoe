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

  // Create a 2d array to represent the state of the game board,
  // where row 0 is the top row and column 0 is the left column
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  const placeToken = (r, c, playerToken) => {
    // get addresses of all cells that don't have a token
    const availableCells = [];
    // console.log("hey", availableCells);
    board.forEach((row) => {
      // console.log(row);
      for (let column = 0; column < 3; column++) {
        // console.log(row[column].getValue());
        if (row[column].getValue() === "-") {
          availableCells.push([board.indexOf(row), column]);
        }
      }
    });

    // console.log(availableCells);

    // if no available cells, game is a draw. Stop execution
    if (!availableCells.length) return;

    // place token if cell contains no player token yet, i.e. "-"
    // console.log(board[r][c].getValue());
    board[r][c].getValue() === "-"
      ? board[r][c].addToken(playerToken)
      : console.log("Cell already filled up. Choose an empty cell!");
    // if (board[r][c].getValue() === "-") {
    //   board[r][c].addToken(playerToken);
    //   // console.log(`board: ${board}`);
    // } else {
    //   console.log("Cell already filled up. Choose an empty cell!");
    // }
  };

  // May not need this after we've built the UI
  const printBoard = () => {
    const boardWithTokens = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithTokens);
  };

  return { getBoard, placeToken, printBoard };
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
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (row, column) => {
    console.log(
      `Place ${getActivePlayer().name}'s token into row ${[row]} and column ${[
        column,
      ]}...`
    );
    board.placeToken(row, column, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

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
  };
}

const game = gameController();
