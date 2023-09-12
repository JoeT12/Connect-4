function bestMove(newBoard,tempPiece){ //function for medium ai difficulty -> parameters:a board state and a piece
    let playableColumns = getPlayableColumns(newBoard);
    let bestScore = -Infinity;
    let score = 0;
    let bestCol = playableColumns[Math.floor(Math.random()*playableColumns.length)];
    for(let y=0;y<playableColumns.length;y++){
        let newRow = get_row(newBoard,playableColumns[y]);
        let boardCopy = JSON.parse(JSON.stringify(newBoard));
        minimaxDropPiece(newRow,playableColumns[y],boardCopy,tempPiece);
        if(check_win(boardCopy,newRow,playableColumns[y],tempPiece,true)){
            score = 100000;
        }
        else{
            score = scoreNode(boardCopy,tempPiece)
        }
        if(score>bestScore){
            bestScore = score
            bestCol = playableColumns[y]
        }
    }
    return bestCol
}

function minimaxDropPiece(row,column,boardCopy,passedPiece){ //simple version of drop piece for use in minimax function
    boardCopy[column][row] = passedPiece;
    return;
}

function scoreNode(new_board,temp_piece){ //scores node of minimax tree (board state)
    let row_array = [];
    let column_array = [];
    let centerCount = 0;
    let score = 0;
    let chunk = []

    for(let z=0;z<=6;z++){
        if(new_board[3][z] == temp_piece){
            centerCount++;
        }
    }
    score += centerCount*3


    for(let x=6;x>=0;x--){ //horizontal
        for(let y =0;y<=6;y++){
            row_array.push(new_board[y][x]);
        }
        for(let c=0;c<=3;c++){
            let chunk = row_array.slice(c,c+4);
           
            score += getEvaluation(chunk,temp_piece)
            
        }
        row_array.splice(0,7);
    }
    chunk = []

    for(let x=0;x<=6;x++){ //vertical
        for(let y=6;y>=0;y--){
            column_array.push(new_board[x][y]);
        }
        for(let c=0;c<=3;c++){
            let chunk = column_array.slice(c,c+4);
            
            score += getEvaluation(chunk,temp_piece)
        }
        column_array.splice(0,7)
    }
    chunk = []

    for(let x=0;x<=3;x++){ //positive diagonal
        for(let c=6;c>=3;c--){
            for(let i =0;i<=3;i++){
                chunk.push(new_board[x+i][c-i])
                score += getEvaluation(chunk,temp_piece)
                
            }
            chunk = []
        }
    }
    chunk = []

    for(let x=0;x<=3;x++){ //anti-diagonal
        for(let c=0;c<=3;c++){
            for(let i =0;i<=3;i++){
                chunk.push(new_board[x+i][c+i])
                score += getEvaluation(chunk,temp_piece)
                
            }
            chunk = []
        }
    
    }
    chunk = []
    return score;
}

function isNodeTerminal(new_board){ //returns true terminal is board in terminal state, false otherwise
    if((getPlayableColumns(new_board)).length == 0 || minimax_checkwin(new_board,"red-piece")==true || minimax_checkwin(new_board,"yellow-piece")==true){return true;}
    else{return false;}
}

function minimax_checkwin(new_board,temp_piece){ //less efficent checkwin for use by the minimax function
    for(let x=0;x<=6;x++){ //horizontal
       for(let y=0;y<=6;y++){
            if(x+3<=6){
                if(new_board[x][y]==temp_piece && new_board[x+1][y]==temp_piece && new_board[x+2][y]==temp_piece && new_board[x+3][y]==temp_piece){
                    return true
                } 
            }
       }
    }
    
    for(let x=0;x<=6;x++){ //vertical
        for(let y=0;y<=6;y++){
            if(y+3<=6){
                if(new_board[x][y]==temp_piece && new_board[x][y+1]==temp_piece && new_board[x][y+2]==temp_piece && new_board[x][y+3]==temp_piece){
                    return true
                } 
            }
        }
    }
    
    for(let x=0;x<=6;x++){ //anti-diagonal
        for(let y=0;y<=6;y++){
            if(x+3<=6 && y+3<=6){
                if(new_board[x][y]==temp_piece && new_board[x+1][y+1]==temp_piece && new_board[x+2][y+2]==temp_piece && new_board[x+3][y+3]==temp_piece){
                    return true
                } 
            }
        }
    }
    
    for(let x=0;x<=6;x++){ //diagonal
        for(let y=0;y<=6;y++){
            if(x-3>=0 && y+3<=6){
                if(new_board[x][y]==temp_piece && new_board[x-1][y+1]==temp_piece && new_board[x-2][y+2]==temp_piece && new_board[x-3][y+3]==temp_piece){
                    return true
                } 
            }
            
        }
    }

}

function getEvaluation(givenChunk,playingPiece){ //evaluates a "chunk"(combos of 4 spaces) in a board
    let score=0,playingPieceCount=0,opposingPieceCount=0,emptySpaceCount = 0; //all variables initalized as 0
    if(playingPiece == "red-piece"){opposingPiece = "yellow-piece";}
    else{opposingPiece="red-piece";}

    for(let x=0;x in givenChunk;x++){ //examine chunk for each possible piece
        if(givenChunk[x]==playingPiece){ //playing piece
            playingPieceCount++
        }
        if(givenChunk[x]==opposingPiece){ //opposing piece
            opposingPieceCount++
        }
        if(givenChunk[x]=="0"){ //empty "piece"
            emptySpaceCount++
        }
    }


    if(playingPieceCount == 4){ //4 playing pieces 
        score += 1000;
    }

    else if(playingPieceCount == 3 && emptySpaceCount ==1){ //3 playing pieces and empty space
        score += 5;
    }
    else if(playingPieceCount == 2 && emptySpaceCount==2){ //2 playing pieces and 2 empty spaces
        score += 2;
    }

    if(opposingPieceCount == 4){
        score -= 1000;
    }
    else if(opposingPieceCount==3 && emptySpaceCount==1){  //3 opposing pieces and an empty space
        score -=4
    }
    else if(opposingPieceCount== 2 && emptySpaceCount == 2){
        score -= 2
    }
    else if(opposingPieceCount == 1 && emptySpaceCount == 3){
        score -=1
    }
    
    
   

    return score;
}

function getPlayableColumns(new_board){ //gets playable columns of given board
    let playableColumns = [];
    for(let i=0;i<=6;i++){
        if(check_empty(new_board,i)==true){ //if column got empty space...
            playableColumns.push(i); //add to playable columns
        }
    }
    return playableColumns; //return playable columns
    
}

function minimax(new_board,depth,alpha,beta,maximsing_player){ //minimax algorithm with alpha-beta pruning
    let possible_locations = getPlayableColumns(new_board); //gets playable columns of given board
    let isTerminal = isNodeTerminal(new_board);
    if(depth == 0 || isTerminal == true){
        if(isTerminal == true){ //board in terminal state
            if(minimax_checkwin(new_board,aiPiece)==true){ //Ai wins (good)
                return [null, 100000000000000]
            }
            else if(minimax_checkwin(new_board,playerPiece)==true){ //player wins (bad)
                return [null, -10000000000000]
            }
            else{
                return [null, 0]
            }
        }
        else{ //depth 0
            return [null,scoreNode(new_board,aiPiece)]//get score of boards current state
        }
    }
    if(maximsing_player==true){ //maximising player
        let value = -Infinity;
        let column = possible_locations[Math.floor(Math.random() * possible_locations.length)] //random column
        
        for(let i=0;i<=possible_locations.length-1;i++){ //for each playable column...
            let row = get_row(new_board,possible_locations[i]) //get row for given column
            let board_copy = JSON.parse(JSON.stringify(new_board)); //deep copy the board
            minimaxDropPiece(row,possible_locations[i],board_copy,aiPiece); //place AI piece in the location
            let new_score = minimax(board_copy,depth-1,alpha,beta,false)[1] //calls minimax again, passing in a different board (score at return element 1)
            if(new_score>value){ //maximise
                value = new_score;
                column = possible_locations[i];
            }
            alpha = Math.max(alpha,value); //max of alpha and value
            if(alpha>=beta){ //alpha beta pruning
                break;
            }
        }
        return [column,value]
    }
    else{ //maximising player false (minimising player)
        let value = Infinity;
        let column = possible_locations[Math.floor(Math.random() * possible_locations.length-1)]
        for(let i=0;i<=possible_locations.length-1;i++){ //for each playable column...
            let row = get_row(new_board,possible_locations[i]) //get row for given column
            let board_copy = JSON.parse(JSON.stringify(new_board)); //deep copy the board
            minimaxDropPiece(row,possible_locations[i],board_copy,playerPiece); //place player piece in the location
            let new_score = minimax(board_copy,depth-1,alpha,beta,true)[1] //calls minimax again, passing in a different board (score at element 1)
            if(new_score<value){ //minimise
                value = new_score;
                column = possible_locations[i];
            }
            beta = Math.min(beta,value); //min of beta and value
            if(alpha>=beta){ //alpha beta pruning
                break;
            }
        }
        return [column,value]
        }
}
