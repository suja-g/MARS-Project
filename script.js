let board;
let human;
let ai;
let player1;
let player2;
var levell=0;
const wins=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const cells=document.querySelectorAll(".cell");


startGame();


function friend(){
   document.getElementById("friend").style.backgroundColor="#14b1ab";
   document.getElementById("cards").style.transform= "rotateY(180deg)"
    document.getElementById("first").disabled=true;
   document.getElementById("second").disabled=true;
   document.getElementById("l1").disabled=true;
   document.getElementById("l2").disabled=true;
    document.getElementById("l3").disabled=true;
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
    var availSpot = emptySpot(board);
    
    if((availSpot.length)%2 != 0) {   
        turn(square.target.id, player1);
    }else {
        turn(square.target.id, player2);
    }  
   }
}


function selectSym(sym){
     document.getElementById("friend").style.backgroundColor="#f9d56e";   
        human = sym;
        ai = sym==='O' ? '✘' :'O';
    board = Array.from(Array(9).keys());   
if(levell!=0) {   document.getElementById("cards").style.transform= "rotateY(180deg)";   
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
    document.getElementById("first").disabled=true;
    document.getElementById("second").disabled=true;
    document.getElementById("l1").disabled=true;
    document.getElementById("l2").disabled=true;
     document.getElementById("l3").disabled=true;

   if (ai === '✘') {
      turn(bestSpot(levell), ai);
  }
}
   document.querySelector(".endgame").style.display="none";

  }

function startGame() {
    document.querySelector(".endgame").style.display="none";
    board = Array.from(Array(9).keys());
    for(var i = 0; i < cells.length; i++)
    { 
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].removeEventListener("click", turnclicks, false)
        cells[i].removeEventListener('click', turnclick, false);

    }
     document.getElementById("l3").style.backgroundColor="#f9d56e"
     document.getElementById("l2").style.backgroundColor="#f9d56e"
     document.getElementById("l1").style.backgroundColor="#f9d56e"
     document.getElementById("second").style.backgroundColor="#f9d56e"
     document.getElementById("first").style.backgroundColor="#f9d56e"
     document.getElementById("friend").style.backgroundColor="#f9d56e"
     document.getElementById("friend").disabled=false;
       document.getElementById("first").disabled=false;
       document.getElementById("second").disabled=false;
       document.getElementById("l1").disabled=false;
       document.getElementById("l2").disabled=false;
        document.getElementById("l3").disabled=false;
        
     levell=0;
}
function newGame(){
     document.getElementById("cards").style.transform= "rotateY(360deg)";
     startGame();
}

function turnclick(square) {
    if(typeof board[square.target.id]=="number") {   
    turn(square.target.id, human)
    if(!checkWin(board, human) && !checkTie()) turn(bestSpot(levell), ai);}   
}

function turn(squareId, player) {
    board[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(board, player)
    if(gameWon){ gameOver(gameWon)}
     else{checkTie();}    
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
    else{declareWin(gameWon.player==player1?"X Wins!":"O Wins!");}
}

function declareWin(who) {
        document.querySelector(".endgame").style.display="block";
        document.querySelector(".endgame .text").innerText=who;
}

function emptySpot() {
    return board.filter(s => typeof s=="number");
}

function levels(count)
{
    document.getElementById("friend").disabled=true;
    levell=count;
    if(count==1)
    {
        document.getElementById("l1").style.backgroundColor="#14b1ab"
     document.getElementById("l2").style.backgroundColor="#f9d56e"
      document.getElementById("l3").style.backgroundColor="#f9d56e";
    }
    else if(count==2)
    {
        document.getElementById("l1").style.backgroundColor="#f9d56e"
        document.getElementById("l2").style.backgroundColor="#14b1ab"
         document.getElementById("l3").style.backgroundColor="#f9d56e";
    }
    else if(count==3){
        document.getElementById("l1").style.backgroundColor="#f9d56e"
        document.getElementById("l2").style.backgroundColor="#f9d56e"
         document.getElementById("l3").style.backgroundColor="#14b1ab";
    }
}

function bestSpot(count) {
    if(count==3) {
    return minimax(board, ai).index; }
    else if(count==1)
    {
        return level1(board, ai,1).index;
    }
    else if(count==2)
    {
        return level1(board,ai,2).index;
    }
}

function checkTie()
{
    if(emptySpot().length==0)
    {
        for(var i=0; i<cells.length; i++)
        {
            cells[i].style.backgroundColor="LightGreen";
            cells[i].removeEventListener("click",turnclick,false);
            cells[i].removeEventListener("click",turnclicks,false);
        }
        declareWin("Tie Game!")
        return true;
    }
    return false;    
}

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
    }
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

function level1(newBoard, player,counts) {
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
        }
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
 var choosen;
 if(counts==1 ) {
 if(Math.random()*100<=20)
 {
     choosen=moves[bestMove];
 }
 else{
    if(moves[bestMove+1]) {
     
        choosen=moves[bestMove+1];
     }
     else if(moves[bestMove-1])
     {
         choosen=moves[bestMove-1];
     }
     else { choosen=moves[bestMove];}
     }
    }
    else{
        if(Math.random()*100<=70)
 {
     choosen=moves[bestMove];
 }
 else{
    if(moves[bestMove+1]) {
     
        choosen=moves[bestMove+1];
     }
     else if(moves[bestMove-1])
     {
         choosen=moves[bestMove-1];
     }
     else {
         choosen=moves[bestMove];
     }
     }
    }
 
 return choosen;
}

