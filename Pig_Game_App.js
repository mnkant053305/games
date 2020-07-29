/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// initialize variables
var scores, roundScore, activePlayer, gamePlaying, diceDom;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;  // generates value between 1 to 6 (inclusive).
        //console.log(dice);

        //2. Display the result
        diceDom.style.display = 'block'; // display dice
        diceDom.src = 'Dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

        } else {
            nextPlayer();
        }


    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 100) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            diceDom.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        } else {
            // next player
            nextPlayer();
        }

    }



});


document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {

    // set the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // reset the round score
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // set the active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // do NOT display dice when the value is 1
    diceDom.style.display = 'none';
}


function init() {

    // initialize the variables
    scores = [0, 0]; // player[0], player[1]
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // reset the values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // rename the players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';


    // remove the winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


    // remove the dice picture, when the user opens the Pig Game.
    diceDom = document.querySelector('.dice');
    diceDom.style.display = 'none';

}
