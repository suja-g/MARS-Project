let board;
//var player;
let human;
let ai;
let player1;
let player2;
//var ai;
//var friend;
//var opponent;
const wins=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const cells=document.querySelectorAll(".cell");
startGame();
function friend(){
   document.getElementById("friend").style.backgroundColor="#14b1ab";
   document.getElementById("first").style.backgroundColor="#f9d56e";
   //document.getElementById("ai").style.backgroundColor="#f9d56e";
   document.getElementById("second").style.backgroundColor="#f9d56e";
    player1='X'
    player2='O'
    document.querySelector(".endgame").style.display="none";
    board = Array.from(Array(9).keys());
    for(var i = 0; i < cells.length; i++)
    {   cells[i].removeEventListener("click", turnclick, false); 
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color"); 
        cells[i].addEventListener('click', turnclicks, false);
    } 
}
function turnclicks(square){
   if(typeof board[square.target.id]=="number"){
   // turn(square.target.id, player1)
   
    var availSpot = emptySpot(board);
    
    if((availSpot.length)%2 != 0){
       
        turn1(square.target.id, player1);
      
    }else{
        
        turn1(square.target.id, player2);
    }
   
   }
}

//h2h();
function selectSym(sym){
    
document.getElementById("friend").style.backgroundColor="#f9d56e";
//document.getElementById("ai").style.backgroundColor="#14b1ab";
        human = sym;
        ai = sym==='O' ? '✘' :'O';
    board = Array.from(Array(9).keys());   
      
    if(human=='O')
    {

      document.getElementById("second").style.backgroundColor="#14b1ab";    
      document.getElementById("first").style.backgroundColor="#f9d56e";
    }
    else{
        document.getElementById("first").style.backgroundColor="#14b1ab";
        document.getElementById("second").style.backgroundColor="#f9d56e";
    }   

    for(var i = 0; i < cells.length; i++)
    {   cells[i].removeEventListener("click", turnclicks, false);
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click', turnclick, false)
    }

  /*  if (ai === '✘') {
      turn(bestSpot(), ai)
  }*/
   // document.querySelector('.selectSym').style.display = "none";
   document.querySelector(".endgame").style.display="none";
  }
 /* function robo()
  {
    document.getElementById("ai").style.backgroundColor="#14b1ab";
    document.getElementById("friend").style.backgroundColor="#f9d56e";
  }*/

function startGame() {
    document.querySelector(".endgame").style.display="none";
    board = Array.from(Array(9).keys());
    for(var i = 0; i < cells.length; i++)
    { 
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].removeEventListener("click", turnclicks, false)
       /*cells[i].addEventListener('click', turnclick, false);*/
    }
    document.getElementById("second").style.backgroundColor="#f9d56e"
     document.getElementById("friend").style.backgroundColor="#f9d56e"
      document.getElementById("first").style.backgroundColor="#f9d56e";
     // document.getElementById("ai").style.backgroundColor="#f9d56e";
}

/*function turnclick1(square) {
    if(typeof board[square.target.id]=="number") {   
    turn1(square.target.id, player1)
    if(!checkWin(board, player1) && !checkTie()) turn(bestSpot(), ai);}   
}*/
function turn1(squareId, player) {
    board[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(board, player)
    if(gameWon) gameOver(gameWon)
    checkTie1();    
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
    checkTie();    
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
    cells[i].removeEventListener("click", turnclicks, false);
    }
   if(gameWon.player==human || gameWon.player==ai){  
    declareWin(gameWon.player==human?"YOU WIN!":"YOU LOSE!"); }
    else{declareWin(gameWon.player==player1?"You Win!":"Friend wins!");}
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

function checkTie1()
{
    if(emptySpot().length==-1)
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
           return {score: 10};
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
   // board[id]=backUp;
   newBoard[availSpots[i]]=move.index;
    if ((player === ai && move.score === 10) || (player === human && move.score === -10))
      return move;
    else 
      moves.push(move);
    
}
 var bestMove;
 if(player===ai) {
    var bestScore = -100000;
    for (var i = 0; i < moves.length; i++) {
        if(moves[i].score>bestScore) {
               bestScore=moves[i].score;
               bestMove=i;
        }
     }
 }else {
    var bestScore = 100000;
    for (var i = 0; i < moves.length; i++) {
        if(moves[i].score<bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
        }    
    }
 }
 return moves[bestMove];
}

