const gameBoard = (() => {
    let board = new Array(9);
    for (i = 0; i <= 8; i++) {
        board[i] = i;
    };

    const pageBoard = document.querySelector("#ttt-board");

    const populateBoard = () => {
        for (let i = 0; i <= 8; i++) {
            pageBoard.querySelector(`#tile-${i}`).textContent = board[i];
        }
    };

    const makeMove = (index, symbol) => {
        if (index < 0 || index > 8) {
            throw error("Index out of range: 0-8 only")
        }

        board[index] = symbol
    };

    const checkRows = () => {
        return ((board[0] == board[1] && board[1] == board[2])
                || (board[3] == board[4] && board[4] == board[5])
                || (board[6] == board[7] && board[7] == board[8]));
    };

    const checkcols = () => {
        return ((board[0] == board[3] && board[3] == board[6])
                || (board[1] == board[4] && board[4] == board[7])
                || (board[2] == board[5] && board[5] == board[8]));
    };

    const checkdiags = () => {
        return ((board[0] == board[4] && board[4] == board[8])
                || (board[6] == board[4] && board[4] == board[2]));
    };

    const gameOver = () => {
        return checkRows() || checkcols() || checkdiags();
    };

    return { populateBoard, makeMove, gameOver };
})();

gameBoard.populateBoard();
console.log(gameBoard.gameOver());