/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let score , roundScore, currentPlayer, gameWorking;


init();

// textContent will shwo all the html code as wrll exp: <em> 4 or 5 or 7 </em>
//document.querySelector('#current-0').textContent = diceRoll

    //this will make only change the text of html 
//document.querySelector('#current-' + currentPlayer).innerHTML = `<em> ${diceRoll} </em>`;

// this is to read the value or the content of this ID or CLASS in the console
//let seeScore = document.querySelector('#score-0').textContent;

    
document.querySelector('.btn-roll').addEventListener('click', function(){
   if(gameWorking) {
        // 1. Random number from 1 to 6
        let diceRoll = Math.floor(Math.random() * 6 ) + 1;

        // 2.display the result (dice)
        let diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = `dice-${diceRoll}.png`;


        // 3.update the round score IF the roll number is not 1
        if (diceRoll !== 1){
            // Add the score
            roundScore+= diceRoll;
            document.getElementById(`current-${currentPlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }    


});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gameWorking){
        //1. add the current score to player score

       if (roundScore === 0){
           alert(`You must roll the dice at least once before holding`);
           nextPlayer();
       } else {

        score[currentPlayer]+= roundScore;

        //2. update the UI
        document.getElementById(`score-${currentPlayer}`).textContent = score[currentPlayer];

       }

        //3. check if the player reach 100 score and win the game

        if (score[currentPlayer] >= 100){
            document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
            gameWorking = false;
        } else{
            nextPlayer();
        }
    }

    //next player
    //nextPlayer();

});

function nextPlayer(){
    // Next player score

        // cleaner way is 
        currentPlayer  === 0 ? currentPlayer = 1 : currentPlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //This is a better way to play switch bettween two class
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
        /*
        // this a exp on how to add or remove a class
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        */

        /*
        // same as the top one
        if (currentPlayer === 0){
            currentPlayer = 1;
        } else{
            currentPlayer = 0;
        }
        */
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    score = [0,0];
    roundScore = 0;
    currentPlayer = 0;
    gameWorking = true;

    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
    
}