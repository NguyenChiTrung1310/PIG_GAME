/*
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
    After that, it's the next player's turn 
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, activePlayer, roundScore, gamePlaying;

init();


// Handling event button btn-roll
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Random dice
        var dice = Math.floor(Math.random() * 6) + 1; // random dice = (1-6).

        // display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Update current score
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});

// Handling event button btn-hold

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to the GLOBAL Score
        scores[activePlayer] += roundScore;
        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player win 
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'none';

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    gamePlaying = true;
    //document.querySelector('#current-' + activePlayer).textContent = dice;

    document.querySelector('.dice').style.display = 'none'; // get element img by a class (dice) 
    //                                                          and set property 'display' to 'none' value

    // set score and current score = 0 as default
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}