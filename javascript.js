const gameboard = (function () {
    let board = Array(9).fill("");

    function checkIfCellIsOccupied(cell) {
        return board[cell] !== "";
    }

    function entryInGameboard(player, cell) {
        if(checkIfCellIsOccupied(cell)===false){
            board[cell] = player;
        }else{
            console.log("Cell is already occupied");
        }
    }

    function resetBoard(){
        board.fill("");
    }

    function getBoard(){
        return [...board];
    }
    
    return {
        entryInGameboard, resetBoard, getBoard
    };
})();

const createPlayer = (playername, marker) => {
    return { playername, marker };
};

const gameController = (function () {
    let players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    let currentPlayerIndex = 0;
    
    function playTurn(cell) {
        let player = players[currentPlayerIndex];
        let currentBoard = gameboard.getBoard();
        
        if (currentBoard[cell] === "") {  // Directly check if the cell is empty
            gameboard.entryInGameboard(player.marker, cell);
            currentPlayerIndex = 1 - currentPlayerIndex; // Switch player (0 ↔ 1)
        } else {
            console.log("Invalid move, cell occupied!");
        }
        console.log(checkWin());
    }

    function restartGame() {
        gameboard.resetBoard();
        currentPlayerIndex = 0;
    }

    function getCurrentPlayer() {
        return players[currentPlayerIndex];
    }

    function isBoardFull() {
        return !gameboard.getBoard().includes(""); // If no 0s left, board is full
    }

    function checkWin(){
        let currentBoard = gameboard.getBoard();
        if (isBoardFull()){
            return "Draw";
        }
        for (let i=0; i<9; i=i+3){
            if (currentBoard[i] !== "" && currentBoard[i]=== currentBoard[i+1] && currentBoard[i]=== currentBoard[i+2]){
                for(let isWinningPlayer of players){
                    if ( isWinningPlayer.marker === currentBoard[i]){
                        return isWinningPlayer.playername;
                    }
                }
            }
        }
        for (let i=0; i<3; i=i+1){
            if (currentBoard[i] !== "" && currentBoard[i]=== currentBoard[i+3] && currentBoard[i]=== currentBoard[i+6]){
                for(let isWinningPlayer of players){
                    if ( isWinningPlayer.marker === currentBoard[i]){
                        return isWinningPlayer.playername;
                    }
                }
            }
        }
        if (currentBoard[0] !== "" && currentBoard[0] === currentBoard[4] && currentBoard[4] === currentBoard[8]){
            for(let isWinningPlayer of players){
                if ( isWinningPlayer.marker === currentBoard[0]){
                    return isWinningPlayer.playername;
                }
            }
        }
        if (currentBoard[2] !== "" && currentBoard[2] === currentBoard[4] && currentBoard[4] === currentBoard[6]){
            for(let isWinningPlayer of players){
                if ( isWinningPlayer.marker === currentBoard[2]){
                    return isWinningPlayer.playername;
                }
            }
        }

        return null;
    }

    return { playTurn, restartGame, getCurrentPlayer };
})();

const displayFunction = (function () {    
    function displayGameBoard(){
        let currentBoard = gameboard.getBoard();
        let currentPlayer = gameController.getCurrentPlayer();
        for (let i=0; i<9; i=i+1){
            const currentCell = document.getElementById(i);
            currentCell.innerHTML = `${currentBoard[i]}`;
        }
        console.log(currentBoard);
    }

    return { displayGameBoard }
})();

document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", function () {
      console.log("Zelle angeklickt:", index);
      gameController.playTurn(index);
      displayFunction.displayGameBoard();
    });
  });  