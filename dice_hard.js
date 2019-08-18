let score , roundScore, currentPlayer, gameWorking, lassroll, lassrollTwo;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameWorking) {

         // 1. Random number from 1 to 6
        
         let diceRoll = Math.floor(Math.random() * 6 ) + 1;
         let diceRollTwo = Math.floor(Math.random() * 6 ) + 1;
 
         // 2.display the result (dice)
        
         document.getElementById('dice-1').style.display = 'block';
         document.getElementById('dice-2').style.display = 'block';
         document.getElementById(`dice-1`).src = `dice-${diceRoll}.png`;
         document.getElementById(`dice-2`).src = `dice-${diceRollTwo}.png`;
 
        // 3.update the round score IF the roll number is not 1
         
        if (diceRoll === 6 && lassroll === 6 || diceRollTwo === 6 && lassrollTwo === 6){
            score[currentPlayer] = 0
            document.getElementById(`score-${currentPlayer}`).textContent = score[currentPlayer];
            nextPlayer();
        } else if (diceRoll !== 1 && diceRollTwo !== 1){
            // Add the score
            roundScore+= diceRoll + diceRollTwo;
            document.getElementById(`current-${currentPlayer}`).textContent = roundScore;
       }else {
             nextPlayer();
        }

        lassroll = diceRoll;
        lassrollTwo = diceRollTwo;

        console.log(diceRoll, diceRollTwo);

    }    
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gameWorking){
        
        //1. add the current score to player score
       if (roundScore === 0){
           alert(`You must roll the dice at least once before holding`);
           nextPlayer();
       }else {
            score[currentPlayer]+= roundScore;
            
            //2. update the UI
            document.getElementById(`score-${currentPlayer}`).textContent = score[currentPlayer];
        }

        let finalScore = document.getElementById(`final-score`).value;
        let winningScore;

        if (finalScore){
             winningScore = finalScore;
        }else{
            winningScore = 100;
        }

        //3. check if the player reach 100 score and win the game
        if (score[currentPlayer] >= winningScore){
            document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
            diceRemove();
            document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
            gameWorking = false;
        } else{
            nextPlayer();
        }
    }
});

function nextPlayer(){
    
    currentPlayer  === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceRemove();
        
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    score = [0,0];
    roundScore = 0;
    currentPlayer = 0;
    gameWorking = true;
    lassroll = 0;
    lassrollTwo = 0;
    //playerNumber();

    diceRemove();
    
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

function diceRemove(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}



    // the old way
/*
function playerNumber(){
    
    let winningScore = prompt(`What do you want your winning score to be?`);

    if(isNaN(winningScore)){
        alert(`Put a number not letter`);
        playerNumber();
    } else if (winningScore <= 0 || winningScore === 'null'){
        alert(`You have to put a number higher then 0`)
        playerNumber();

        document.querySelector(`.final-score`).value = winningScore;
    }
    
}
*/

