var board;
var player;
const human='O';
const opponent='X';
var ai;
var friend;
var temp;
const wins=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const cells=document.querySelectorAll(".cell");
startGame();
//h2h();

function opposite1(ai) {
    temp='ai';
        ai=opponent;
        
        //console.log(temp);
        
        document.getElementById("ai").style.backgroundColor="green";
        //console.log(ai);
        document.getElementById("friend").style.backgroundColor="rgb(248, 85, 166)";
        
    }
function opposite(friend)    {
    
        friend=opponent;
        temp='friend';
        document.getElementById("friend").style.backgroundColor="green";
        document.getElementById("ai").style.backgroundColor="rgb(248, 85, 166)";
    
}
/*function h2h()
{
    document.querySelector(".endgame").style.display="none";
    board=Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++)
    {
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click',turnClick,false);
    }
}
function turnClick(square) {
    if(typeof board[square.target.id]=="number") {
    turn(square.target.id,human);
    if(!checkWin(board,human)&&!checkTie()) {
        turn(square.target.id, friend);
    }
}
}
function start() {
    if(temp==='ai') {
        h2h();
    }
    else if(temp==='friend') {
        startGame();
    }
}*/

function startGame() {
    document.querySelector(".endgame").style.display="none";
    board=Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++)
    {
        cells[i].innerText="";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click',turnclick,false);
    }
}
function turnclick(square) {
    if(typeof board[square.target.id]=="number") {
    turn(square.target.id,human);
    if(!checkWin(board,human)&&!checkTie()) {
        //if(temp===ai) 
        turn(bestSpot(), ai);
        //else if(temp===friend) 
       // {turn(square.target.id, friend); 
        //console.log(friend);}
}
}
}

/*function checkMove(temp,square) {
    if(temp===ai)
    {
        turn(bestSpot(), ai); 
    }
    else if(temp===friend)
    {
        turn(square, friend); 
    }
}*/

function turn(squareId, player) {
    board[squareId]=player;
    document.getElementById(squareId).innerText=player;
    let gameWon=checkWin(board,player);
    if(gameWon) gameOver(gameWon);
}
function checkWin(boards, player) {
    let plays=boards.reduce((a,e,i) => (e===player) ? a.concat(i):a,[]);
    let gameWon=null;
    for (let [index, win] of wins.entries()) {
        if(win.every(elem => plays.indexOf(elem)>-1)) {
            gameWon = {index: index, player: player};
            break;
        }
        
    }
    return gameWon;

}
function gameOver(gameWon) {
    for (let index of wins[ gameWon.index ]) 
    {
        document.getElementById(index).style.backgroundColor = gameWon.player == human ? "LightBlue" : "Salmon";
    }
    for(var i=0;i<cells.length;i++) {
    cells[i].removeEventListener("click", turnclick, false);
    }
    declareWin(gameWon.player==human?"YOU WIN!":"YOU LOSE!");
}
function declareWin(who) {
document.querySelector(".endgame").style.display="block";
document.querySelector(".endgame .text").innerText=who;
}

function empty() {
    return board.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(board, ai).index;
}
function checkTie()
{
    if(empty().length===0)
    {
        for(var i=0;i<cells.length;i++)
        {
            cells[i].style.backgroundColor="LightGreen";
            cells[i].removeEventListener("click",turnclick,false);
        }
        declareWin("Tie Game!")
        return true;
    }
    else {
        return false;
    }
}

//console.log(empty());

function minimax(board,player) {
    var availSpots=empty();
    if(checkWin(board,human)) {
    return {score: -10};
     } else if(checkWin(board,ai)) {
    return {score: 10};
     } else if(availSpots===0) {
    return {score: 0};
     }
     
     var moves=[];
     for(let i=0;i<availSpots.length;i++)
     {
         var move={}; 
         let id=availSpots[i];
         let backUp=board[id];
         board[id]=player;    
         move.id=id;
    //move.index=newBoard[availSpots[i]];
    //newBoard[availSpots[i]]=player;
    if(player==ai) {
        move.score=minimax(board,human).score;
    } else {
        //var result=minimax(newBoard,ai);
        move.score=minimax(board,ai).score;
        //move.score=(minimax(newBoard,ai)).score;
    }
    board[id]=backUp;
   /* if ((player === ai && move.score === 10) || (player === human && move.score === -10))
      return move;
    else */
      moves.push(move);
    
}
var bestMove;
if(player===ai) {
    var bestScore=-100000;
    for (var i = 0; i < moves.length; i++) {
        if(moves[i].score>bestScore) {
            bestScore=moves[i].score;
            bestMove=moves[i];
        }
        
    }
 } else {
    
    var bestScore=100000;
    for (var i = 0; i < moves.length; i++) {
        if(moves[i].score<bestScore) {
            bestScore=moves[i].score;
            bestMove=i;
        }
        
    }
 }
return bestMove;
}
/*function gameScore(mini_max,newBoard,availSpots) {
    if(minimax(newBoard,human)&&checkWin(newBoard,human)) {
        return -10;
         } else if(minimax(newBoard,human)&&checkWin(newBoard,ai)) {
        return 10;
         } else if(availSpots===0) {
        return 0;
         }    
}*/
