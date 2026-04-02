const gameBoard = (() => {
  let board = new Array(9);
  const pageBoard = document.querySelector("#ttt-board");

  const resetBoard = () => {
    pageBoard.replaceChildren();
    for (let i = 0; i <= 8; i++) {
      board[i] = i;
      const tile = document.createElement("button");
      tile.type = "button";
      tile.id = `tile-${i}`;
      tile.textContent = i;
      pageBoard.append(tile);
    }
  };

  const makeMove = (index, symbol) => {
    if (index < 0 || index > 8) {
      throw error("Index out of range: 0-8 only");
    }

    board[index] = symbol;
    document.querySelector(`#tile-${index}`).textContent = symbol;
  };

  const checkRows = () => {
    return (
      (board[0] === board[1] && board[1] === board[2]) ||
      (board[3] === board[4] && board[4] === board[5]) ||
      (board[6] === board[7] && board[7] === board[8])
    );
  };

  const checkcols = () => {
    return (
      (board[0] === board[3] && board[3] === board[6]) ||
      (board[1] === board[4] && board[4] === board[7]) ||
      (board[2] === board[5] && board[5] === board[8])
    );
  };

  const checkdiags = () => {
    return (
      (board[0] === board[4] && board[4] === board[8]) ||
      (board[6] === board[4] && board[4] === board[2])
    );
  };

  const gameOver = () => {
    return checkRows() || checkcols() || checkdiags();
  };

  return { resetBoard, makeMove, gameOver };
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

  this.resetScore = function() {
    this.score = 0;
    this.pageScore.textContent = `Score: 0`;
  };
}

const gameController = (() => {
  const players = [new Player("X", "one"), new Player("O", "two")];
  let turn = 1;
  const gameInfo = document.querySelector("#game-info");

  const updateInfo = () => {
    gameInfo.replaceChildren()
    const currentTurn = document.createElement("h2");
    currentTurn.textContent = `Player ${turn === 0 ? "One" : "Two"}'s turn`;
    const instructions = document.createElement("p");
    instructions.textContent = "Please click a tile to make your move";

    gameInfo.append(currentTurn);
    gameInfo.append(instructions);
  };

  const makeMove = (index) => {
    console.log(index);
    gameBoard.makeMove(index, players[turn].symbol);
    if (gameBoard.gameOver()) {
      console.log("Game Over")
      endGame();
    } else {
      turn = (turn + 1) % 2;
      updateInfo();
    };
  };

  const endGame = () => {
    document.querySelector("#ttt-board").style.pointerEvents = "none";

    const gameOverText = document.createElement("h3");
    gameOverText.textContent = `Game Over! Player ${turn === 0 ? "One" : "Two"} has won!` 
    gameInfo.replaceChildren(gameOverText);

    players[turn].increaseScore();

    document.querySelector("#start-button").classList.remove("hide");
  };

  const initTiles = () => {
    const tiles = document.querySelector("#ttt-board").children;
    for (let i = 0; i <= 8; i++) {
      tiles[i].addEventListener("click", (Event) => {
        makeMove(i);
      }, {once: true});
    };
  };

  const startGame = () => {
    turn = (turn + 1) % 2;
    document.querySelector("#ttt-board").style.pointerEvents = "all";
    gameBoard.resetBoard();
    updateInfo();
    initTiles();
  };

  const resetGame = () => {
    players[0].resetScore();
    players[1].resetScore();
    turn = 0;
    document.querySelector("#start-button").classList.remove("hide");
    document.querySelector("#ttt-board").replaceChildren();
  };

  return { startGame, resetGame };
})();

const startBtn = document.querySelector("#start-button")
startBtn.addEventListener("click", (Event) => {
  startBtn.classList.add("hide");
  gameController.startGame();
});

const resetBtn = document.querySelector("#reset-button")
resetBtn.addEventListener("click", (Event) => {
  gameController.resetGame();
});
