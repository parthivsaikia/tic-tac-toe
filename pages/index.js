function GameBoard(){
    //board dimensions
    const board = [];
    const rows = 3;
    const columns = 3;

    //adding cells to board
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const addMarker = (row, column, player) => {
        if(board[row][column].getValue() === ""){
            board[row][column].markCell(player);
        } else {
            return;
        }
    }

    const showBoard = () => {
        const cellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(cellValues);
    }

    return {getBoard, addMarker, showBoard};
}

function Cell(){
    let value = "";
    const getValue = () => value;
    const markCell = (player) => {
        value = player;
    }
    return {getValue, markCell};
}

function GameControl(playerOne = "Player One", playerTwo = "Player Two"){
    const board = GameBoard();
    const players = [
        {
            name: playerOne,
            mark: "x"
        },
        {
            name: playerTwo,
            mark: "o"
        }
    ]
    let gameOver = false;
    
    let msg = "";
    const getMsg = () => msg;

    let activePlayer = players[0];
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const showNewBoard = () => {
        board.showBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    function checkWinner(row,column,player){
        boardArray = board.getBoard();
        if(
            boardArray[0][column].getValue() == player&&
            boardArray[1][column].getValue() == player&&
            boardArray[2][column].getValue() == player
        ){
            gameOver = true;
            msg = `${activePlayer.name} won.!!!`
            return true;
        }

        if(
            boardArray[row][0].getValue() == player &&
            boardArray[row][1].getValue() == player &&
            boardArray[row][2].getValue() == player 
        ){
            gameOver = true;
            msg = `${activePlayer.name} won.!!!`
            return true;
        }

        if(
            row == column&&
            boardArray[0][0].getValue() == player&&
            boardArray[1][1].getValue() == player&&
            boardArray[2][2].getValue() == player
        ){
            gameOver = true;
            msg = `${activePlayer.name} won.!!!`
            return true;
        }

        if(
            row + column == 2&&
            boardArray[0][2].getValue() == player &&
            boardArray[1][1].getValue() == player &&
            boardArray[2][0].getValue() == player 
        ){
            gameOver = true;
            msg = `${activePlayer.name} won.!!!`
            
            return true;
        }else{
            return false;
        }

        
    }

    function checkDraw(){
        boardArray = board.getBoard();
        const cellValues = [];
        boardArray.forEach((row)=>{
            row.forEach((cell)=>{
                cellValues.push(cell.getValue());
            });
        });
        if(cellValues.includes("")){
            return false;
        }else{
            msg = `Draw!!!`
            gameOver = true;
            return true;
        }
    }
    

    const playRound = (row, column) => {
        if(gameOver) return;
        
        console.log(`Cell ${row}${column} is marked by ${getActivePlayer().name}'s mark.`);
        board.addMarker(row, column, getActivePlayer().mark);
        //win condition
        if(checkWinner(row,column,activePlayer.mark)){
            
            return;
        }

        if(checkDraw() ){
           
            return;
        }

        switchActivePlayer();
        showNewBoard();
    }
    showNewBoard();
    return {playRound, getActivePlayer, getBoard: board.getBoard,gameOver:() => gameOver,getMsg};
}

function ScreenController(){

    const playerOne = localStorage.getItem('playerOne') || "Player One";
    const playerTwo = localStorage.getItem('playerTwo') || "Player Two";
    const game = GameControl(playerOne,playerTwo);
    
    const divTurn = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    
    const updateScreen = () => {
        const activePlayer = game.getActivePlayer();
        boardDiv.textContent = "";
        divTurn.textContent = `${activePlayer.name}'s turn.`;
        const board = game.getBoard();
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });

        if(game.gameOver()){
            const result = document.createElement('dialog');
            const rematchBtn = document.createElement('button');
            const backButton = document.createElement('button');
            result.textContent = game.getMsg();
            rematchBtn.textContent = "Restart";
            backButton.textContent = "Back to Homepage"
            rematchBtn.addEventListener('click',()=>{
                window.location.reload();
            })
            backButton.addEventListener('click',()=>{
                window.location.href = "index.html";
            })
            boardDiv.appendChild(result);
            result.appendChild(rematchBtn);
            result.appendChild(backButton);
            result.showModal();
            
        }
    }

    function clickHandlerBoard(e){
        if(game.gameOver()) return;
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if(selectedRow == null || selectedColumn == null) return;
        game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandlerBoard);
    updateScreen();
}

ScreenController();
