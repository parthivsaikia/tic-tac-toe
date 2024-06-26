function GameBoard(){
    //board dimensions
    const board = [];
    const rows = 3;
    const columns = 3;

    //adding cells to board
    for(let i = 0;i<rows;i++){
        board[i] = [];
        for(j = 0;j<columns;j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const addMarker = (row,column,player) => {
        if(board[row][column].getValue() === 0){
            board[row][column].markCell(player);
        }else{
            return;
        }
    }
    
    const showBoard = () => {
        const cellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(cellValues);
    }

    return{getBoard,addMarker,showBoard};
}

function Cell(){
    let value = 0;
    const getValue = () => value;
    const markCell = (player) => {
        value = player;
    }
    return {getValue,markCell};
}

function GameControl(playerOne = "Player One",playerTwo = "Player Two"){
    board = GameBoard();
    players = [
        {
            name:playerOne,
            mark:1
        },

        {
            name:playerTwo,
            mark:2
        }
    ]

    let activePlayer = players[0];
    const switchActivePlayer = () =>{
        activePlayer = activePlayer === players[0]? players[1]:players[0];
    }
    const getActivePlayer = () => activePlayer;

    const showNewBoard = () =>{
        board.showBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row,column) =>{
        console.log(`Cell ${row}${column} is marked by ${getActivePlayer().name}'s mark.`);
        board.addMarker(row,column,getActivePlayer().mark);
        //win condition

        switchActivePlayer();
        showNewBoard();
    }
    showNewBoard();
    return {playRound};
}

let game = GameControl();