let board;
//var player;
let human='O';
let ai='X';
//var ai;
//var friend;
//var temp;
const wins=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const cells=document.querySelectorAll(".cell");
startGame();
//h2h();
function selectSym(sym){
    human = sym;
    ai = sym==='O' ? 'X' :'O';
    if(human==='O')
    {
      document.getElementById("second").style.backgroundColor="green";
      document.getElementById("first").style.backgroundColor="rgb(248, 85, 166)";
    }
    else{
        document.getElementById("first").style.backgroundColor="green";
      document.getElementById("second").style.backgroundColor="rgb(248, 85, 166)";
    }
    board = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', turnclick, false);
    }
    if (ai === 'X') {
      turn(bestSpot(),aiPlayer);
      
    }
   // document.querySelector('.selectSym').style.display = "none";
  }

function startGame() {
    document.querySelector(".endgame").style.display="none";
    board = Array.from(Array(9).keys());
    for(var i = 0; i < cells.length; i++)
    { 
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click', turnclick, false);
    }
}

function turnclick(square) {
    if(typeof board[square.target.id]=="number") {
    turn(square.target.id, human)
    if(!checkWin(board, human) && !checkTie()) turn(bestSpot(), ai);}   
}

function turn(squareId, player) {
    board[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(board, player)
    if(gameWon) gameOver(gameWon)
}

function checkWin(boards, player) {
    let plays = boards.reduce((a, e, i) => 
            (e === player)? a.concat(i):a , []);
    let gameWon = null;
    for (let [index, win] of wins.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }      
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of wins[gameWon.index]) 
    {
        document.getElementById(index).style.backgroundColor = 
                gameWon.player == human ? "LightBlue" : "Salmon";
    }
    for(var i=0; i<cells.length; i++) {
    cells[i].removeEventListener("click", turnclick, false);
    }
    declareWin(gameWon.player==human?"YOU WIN!":"YOU LOSE!"); 
}

function declareWin(who) {
        document.querySelector(".endgame").style.display="block";
        document.querySelector(".endgame .text").innerText=who;
}

function emptySpot() {
    return board.filter(s => typeof s=="number");
}

function bestSpot() {
    return minimax(board, ai).index;
}

function checkTie()
{
    if(emptySpot().length==0)
    {
        for(var i=0; i<cells.length; i++)
        {
            cells[i].style.backgroundColor="LightGreen";
            cells[i].removeEventListener("click",turnclick,false);
        }
        declareWin("Tie Game!")
        return true;
    }
    return false;    
}

//console.log(emptyS());

function minimax(newBoard, player) {
    var availSpots = emptySpot(newBoard);
    
    if(checkWin(newBoard, human)) {
           return {score: -10};
     } else if(checkWin(newBoard, ai)) {
           return {score: 20};
     } else if(availSpots.length===0) {
           return {score: 0};
     }
     
     var moves=[];
     for(var i=0; i<availSpots.length; i++)
     {
        var move={};     
        move.index= newBoard[availSpots[i]];
        newBoard[availSpots[i]]=player;

     if(player==ai) {
        var result = minimax(newBoard, human);
        move.score = result.score;
        
     }else {
        var result=minimax(newBoard, ai);
        move.score=result.score;
        //move.score=(minimax(newBoard,ai)).score;
    }
    board[id]=backUp;
    if ((player === ai && move.score === 10) || (player === human && move.score === -10))
      return move;
    else 
      moves.push(move);
    
}
 var bestMove;
 if(player===ai) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
        if(moves[i].score>bestScore) {
               bestScore=moves[i].score;
               bestMove=i;
        }
     }
 }else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
        if(moves[i].score<bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
        }    
    }
 }
 return moves[bestMove];
}

