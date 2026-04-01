const gameBoard = (() => {
    let board = new Array(9).fill(" ");
    const pageBoard = document.querySelector("#ttt-board")

    const populateBoard = () => {
        for (let i = 0; i <= 8; i++) {
            pageBoard.querySelector(`#tile-${i}`).textContent = board[i];
        }
    };

    return { populateBoard }
})();

document.querySelector("#pop-test").addEventListener("click", (Event) => {
    gameBoard.populateBoard();
});