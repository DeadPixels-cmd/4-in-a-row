
export const isWinner = (gameBoard, currentMove, currentPlayer) =>{
    let board = [...gameBoard];
    // eslint-disable-next-line
    board [currentMove] = currentPlayer;

    const winLines = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12],
    ];
    
    for (let i = 0; i < winLines.length; i++) {
        const [c1,c2,c3,c4] = winLines[i];

        if (gameBoard[c1] > 0 &&
             board[c1] === board[c2] &&
             board[c2] === board[c3] &&
             board[c3] === board[c4])
             {
                return true;
             }
    }
    return false;
}

export const isDraw = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    // eslint-disable-next-line
    board [currentMove] = currentPlayer;

    let count = board.reduce((n, x) => n + (x === 0), 0);
    console.log(`count ${count}`);
    return count === 0;
} 

const getRandomComputerMove = (gameBoard) => {
    let validMoves = [];
    for (let i = 0; i <gameBoard.length; i++){
        if (gameBoard[i] === 0){
            validMoves.push(i);
        }
    }
    let rndMove = Math.floor(Math.random() * validMoves.length);
    return validMoves[rndMove];

}

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0; check < moveChecks.length; check++) {
        // eslint-disable-next-line
        for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
            const [index1, index2, index3, index4] = moveChecks[check].indexes;
            const val1 = gameBoard[i + index1];
            const val2 = gameBoard[i + index2];
            const val3 = gameBoard[i + index3];
            const val4 = gameBoard[i + index4];

            if (val1 !== undefined && val2 !== undefined && val3 !== undefined && val4 !== undefined) {
                let series = val1.toString() + val2.toString() + val3.toString() + val4.toString();

                switch (series) {
                    case "1110":
                    case "2220":
                        return i + index4;
                    case "1101":
                    case "2202":
                        return i + index3;
                    case "1011":
                    case "2022":
                        return i + index2;
                    case "0111":
                    case "0222":
                        return i + index1;
                    default:
                }
            }
        }
    }
    return -1;
}

export const getComputerMove = (gameBoard) =>{
    let moveChecks = [
        //vertical lines
        {
            indexes:[0,4,8,12],
            max: 4,
            step: 1
        },

        //horizontal lines

        {
            indexes:[0,1,2,3],
            step:4,
            max:16
        },

        //diagonal lines 
        {
            indexes: [0,5,10,15],
            max:16,
            step:16
        },

        //diagonal
        {
            indexes:[3,6,9,12],
            max:16,
            step:16
        }
    ];

    let position= getPosition(gameBoard, moveChecks);
    if(position > -1) return position;

    return getRandomComputerMove(gameBoard);
};