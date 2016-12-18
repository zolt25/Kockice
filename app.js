/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, badRoll, winning;
newGame ();

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var x = document.querySelector("#score-0").textContent;
//console.log(x);

document.querySelector(".dice").style.display = "none";
document.querySelector("#dice2").style.display = "none";

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function() {

    if(gamePlaying) {

    // random broj
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var diceRoll = dice + dice2;
    if (diceRoll === 12) {
        
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            badRoll = 0;
            nextPlayer();
    } else {
        badRoll = 0;
    }
    


    // display
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    var diceDOM = document.querySelector("#dice2");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice2 + ".png";


    //ako broj nije 1 updateaj score
    if (dice > 1 && dice2 > 1) {
        roundScore += diceRoll;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }}

});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winning) {
        document.querySelector("#name-" + activePlayer).textContent = "Player " + (activePlayer + 1) + " WINS!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector("#dice2").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    } else {
        nextPlayer();
    }}

})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", newGame);

function newGame() {
    
    winning = prompt("Input winning score");

    //winning = document.getElementById("#numbers").value;

    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}