const gameBoard = (() => {
    let board = new Array(9).fill(" ");
    const pageBoard = document.querySelector("#ttt-board")

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

    return { populateBoard, makeMove }
})();

document.querySelector("#pop-test").addEventListener("click", (Event) => {
    gameBoard.populateBoard();
});