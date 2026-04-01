const gameBoard = (() => {
  let board = new Array(9);
  const pageBoard = document.querySelector("#ttt-board");

  const populateBoard = () => {
    for (let i = 0; i <= 8; i++) {
      pageBoard.querySelector(`#tile-${i}`).textContent = board[i];
    }
  };

  const resetBoard = () => {
    for (i = 0; i <= 8; i++) {
      board[i] = i;
    }
  };

  const makeMove = (index, symbol) => {
    if (index < 0 || index > 8) {
      throw error("Index out of range: 0-8 only");
    }

    board[index] = symbol;
  };

  const checkRows = () => {
    return (
      (board[0] == board[1] && board[1] == board[2]) ||
      (board[3] == board[4] && board[4] == board[5]) ||
      (board[6] == board[7] && board[7] == board[8])
    );
  };

  const checkcols = () => {
    return (
      (board[0] == board[3] && board[3] == board[6]) ||
      (board[1] == board[4] && board[4] == board[7]) ||
      (board[2] == board[5] && board[5] == board[8])
    );
  };

  const checkdiags = () => {
    return (
      (board[0] == board[4] && board[4] == board[8]) ||
      (board[6] == board[4] && board[4] == board[2])
    );
  };

  const gameOver = () => {
    return checkRows() || checkcols() || checkdiags();
  };

  return { populateBoard, resetBoard, makeMove, gameOver };
})();

function Player(symbol, order) {
  if (!new.target) {
    throw error("Error: Must be used with the 'new' constructor");
  }
  if (!["one", "two"].includes(order)) {
    throw error("Error: Player order must be 'one' or 'two'");
  }
  this.symbol = symbol;
  this.order = order;
  this.score = 0;
  this.pageElement = document.querySelector(`#${order}.player`);
  this.pageScore = this.pageElement.querySelector(".score");

  this.increaseScore = function () {
    this.score += 1;
    this.pageScore.textContent = `Score: ${this.score}`;
  };
}

gameBoard.resetBoard();
console.log(gameBoard.gameOver());
gameBoard.populateBoard();
