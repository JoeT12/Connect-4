var piece;
var board;
var game_over = false;
var ai_turn = true;
var red;
var yellow;
var aiPiece;
var playerPiece;

window.onload = function(){    
    if(window.location.href.match("game_page.html") != null){ //if index page, dont run this
        build_board();
        assign_pieces();
    }
    else{return;}
}

function assign_pieces(){ //asigns value of each piece to player, runs AI if neccesary
    red = sessionStorage.getItem("red-piece");
    yellow = sessionStorage.getItem("yellow-piece");
    if(red == "AI" && yellow == "AI"){
        piece = "red-piece";
        playerPiece = "red-piece";
        aiPiece = "yellow-piece";
        AI();
    }
    else if(red == "human" && yellow == "AI"){
        piece="red-piece";
        playerPiece = "red-piece";
        aiPiece = "yellow-piece";
    }
    else if(yellow == "human" && red == "AI"){
        piece="yellow-piece";
        playerPiece = "yellow-piece";
        aiPiece = "red-piece";
    }
    else if(red == "human" && yellow == "human"){
        ai_turn = false;
        piece="red-piece";
    }
}

function AI(){ //function that drops the piece when its the AI's turn
    let dropped = "";
    let chosen_difficulty = sessionStorage.getItem("difficulty");
    if(red == "AI" && yellow == "AI"){
        ai_turn = true;
        if(chosen_difficulty == "easy"){ //difficulty easy
            setTimeout(function(){
                dropped = drop_piece(Math.floor(Math.random() * 7) + 1)
                if(dropped == "not dropped"){
                    drop_piece(Math.floor(Math.random() * 7) + 1)
                };
            }, 800)
        }
        else if(chosen_difficulty == "medium"){ //difficulty medium
            setTimeout(function(){
            if(red == "AI"){
                let col = bestMove(board,playerPiece)
                drop_piece(col+1,false)
            }
            else{ //yellow AI
                let col = bestMove(board,aiPiece)
                drop_piece(col+1,false)
            }
        },800)
        }
        else{ //difficulty hard
            setTimeout(function(){
            let col = minimax(board,5,-Infinity,Infinity,true)[0]
            drop_piece(col+1,false)
            if(aiPiece == "red-piece"){
                aiPiece = "yellow-piece"
                playerPiece = "red-piece"
            }
            else{
                aiPiece = "red-piece"
                playerPiece = "yellow-piece"
            }

            },800)
        }
    }
    else if(red == "human" || yellow == "human"){
        ai_turn = false;
        if(chosen_difficulty == "easy"){
            dropped = drop_piece(Math.floor(Math.random() * 7) + 1);
            if(dropped == "not dropped"){
                dropped = drop_piece(Math.floor(Math.random() * 7) + 1);
            }
        }
        else if(chosen_difficulty == "medium"){ //chosen dif medium
            if(red == "AI"){
                let col = bestMove(board,"red-piece")
                drop_piece(col+1,false)
            }
            else{ //yellow AI
                let col = bestMove(board,"yellow-piece")
                drop_piece(col+1,false)
            }

        }
        else{ //chosen difficulty hard
            let col = minimax(board,5,-Infinity,Infinity,true)[0]
            drop_piece(col+1,false)
        }
    }
    else{return;}
}

function build_board(){//shows board on screen + adds event functionality + initalises global board.
    board = [];
    for(let i=1;i<=6;i++){ //y-axis
        for(let j=1;j<=7;j++){ //x-axis
            if(i==1){
                let row = ["0","0","0","0","0","0","0"];
                board.push(row)
                let section = document.createElement("div");
                section.id = "row" + j.toString();
                section.classList.add("row");
                document.getElementById("board").append(section);
                section.addEventListener("mouseover",function(){show_piecetop(j);});
                section.addEventListener("mouseout",function(){remove_piecetop(j);});
                section.addEventListener("click",function(){drop_piece(j,true)})
            }
            let section = document.createElement("div");
            section.id =  j.toString() + "," + i.toString();
            section.classList.add("section");
            document.getElementById("row" + j.toString()).append(section);
        }
    }
}

function swap_piece(){ //swaps the playing piece to the opposing colour
    if(piece=="red-piece"){
        piece="yellow-piece";
        if(ai_turn==true){AI();}
        else{
            if(red=="AI" || yellow == "AI"){
                ai_turn=true;
            }
            }
        }
    else{
        piece="red-piece";
        if(ai_turn==true){AI();}
        else{
            if(red=="AI" || yellow == "AI"){
                ai_turn=true;
            }
            }
        }
    return;
}

function drop_piece(column,player_dropping){ //drops piece into board
    if(game_over == true){return;} //cant drop if game over
    if(player_dropping==true && (red=="AI"&&yellow=="AI")){return;}
    if(check_empty(board,column-1)==true){ //if free space in row....
        let first_freerow = (get_row(board,column-1)); //get first free available column
        board[column-1][first_freerow]=piece; //place piece in it
        document.getElementById(column.toString()+","+(first_freerow).toString()).classList.add(piece); //show it on screen
        remove_piecetop(column);
        check_win(board,column-1,first_freerow,piece,false);//checks to see if move caused a win
    } 
    else{ //if not free space in the given row then....
        return "not dropped";
    }
    swap_piece(); //swaps the playing piece to opposing color
    console.log(board[0])
}

function get_row(new_board,column){ //gets the first free row of a given column
    for(let x=6;x>=1;x--){
        if(new_board[column][x]=="0"){return x;}
    }
}

function check_empty(new_board,column){ //checks for empty slot in a given column
    let empty = false;
    for(let i=7;i>=1;i--){
        if(new_board[column][i]=="0"){empty = true;}
    }
    return empty;
}

function check_draw(){ //checks to see if a draw occurs
    let occupied_columns = 0;
    for(let x=0;x<=6;x++){
        if(check_empty(board,x)==false){
            occupied_columns++;
        }
    }
    if(occupied_columns == 7){
        document.getElementById("results").innerText = "Draw!";
        game_over = true;
    }
    return;
}

function check_win(tempBoard,row,column,tempPiece,isminimax){ //checks for a win based on the last move
    if(row==null && column == null){
        return false
    }
    let consec_horizontals = 0;
    let consec_verticals = 0;
    let consec_diagonals = 0;
    let consec_antidiagonals = 0;
    let last_placedpiece = tempPiece;
    for(let x=0;x<=6;x++){
        if(tempBoard[x][column]==last_placedpiece){//horizontal
            consec_horizontals++;
        }
        else{consec_horizontals=0;}

        if(tempBoard[row][x]==last_placedpiece){//vertical
            consec_verticals++;
        }
        else{consec_verticals=0;}

        if(column+row-x<=6 && row-row+x>=0){//diagonal
            if(tempBoard[row-row+x][column+row-x]==last_placedpiece){
                consec_diagonals++;
            }
            else{consec_diagonals=0;}
        }
        

        if(row-row+x>=0 && column-row+x<=6 && column-row+x>=0){//antidiagonal
            if(tempBoard[row-row+x][column-row+x]==last_placedpiece){
                consec_antidiagonals++;
            }
            else{consec_antidiagonals=0;}
        }
        
        if ((consec_horizontals>=4 || consec_verticals >= 4 || consec_diagonals >= 4 || consec_antidiagonals >= 4) && isminimax == false){
            let winnning_piece = piece.split("-");
            document.getElementById("results").innerText= winnning_piece[0] + " " + "wins!";
            game_over=true;
            window.scrollTo(0, document.body.scrollHeight);
        }

        else if((consec_horizontals==4 || consec_verticals == 4 || consec_diagonals == 4 || consec_antidiagonals == 4) && isminimax == true){
            return true;
        }
        
    }
    check_draw();
}

function show_piecetop(column){ //shows piece at top of row when hovering
    if(game_over==true){return;}
    if(red == "AI" && yellow == "AI"){return;}
    let section = document.getElementById(column);
    section.classList.add(piece);
}

function remove_piecetop(column){ //removes piece from top of row when mouseout
    (document.getElementById(column)).classList.remove(piece);
}

function play(){ //ran when play button pressed on first tab. initalises game prefrences
    let red_piece = document.getElementById("red").value;
    let yellow_piece = document.getElementById("yellow").value;
    let difficulty = document.getElementById("difficulty").value;
    if(red_piece == "Human"){sessionStorage.setItem("red-piece","human");}
    else{sessionStorage.setItem("red-piece","AI");}
    if(yellow_piece == "Human"){sessionStorage.setItem("yellow-piece","human");}
    else{sessionStorage.setItem("yellow-piece","AI");}
    if(difficulty == "Easy"){sessionStorage.setItem("difficulty","easy");}
    else if(difficulty == "Medium"){sessionStorage.setItem("difficulty","medium");}
    else if(difficulty == "Hard"){sessionStorage.setItem("difficulty","hard");}
    window.location.href = ("./game_page.html");
}

function check_preferences(){ //function used to make difficulty combo box unusable if AI not selected
    let red_piece = document.getElementById("red").value;
    let yellow_piece = document.getElementById("yellow").value;
    if(red_piece == "Human" && yellow_piece == "Human"){document.getElementById("difficulty").disabled = true;}
    else if(red_piece == "AI" || yellow_piece == "AI"){document.getElementById("difficulty").disabled = false;}
    else{return;}
}

function back(){ //takes player back to index page upon pressing back button
    window.location.href = ("./index.html");
}

function reset(){ //reloads page when user presses reset button
    window.location.reload();
}