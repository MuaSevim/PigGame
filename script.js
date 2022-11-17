'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let active, currentScore, scores, isGameOver;

const startTheGame = () => {
  // Initial Conditions
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  //Initial Elements
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Initial Variables
  active = 0;
  currentScore = 0;
  scores = [0, 0];
  isGameOver = false;
};

startTheGame();

const switchPlayer = () => {
  active = active === 0 ? 1 : 0;
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (!isGameOver) {
    //Generate dice
    const dice = Math.trunc(Math.random() * (7 - 1) + 1);

    //Store & Display
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    //Actions, depending on dice's number
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (!isGameOver) {
    scores[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = scores[active];
    if (scores[active] < 100) {
      switchPlayer();
    } else {
      isGameOver = true;
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
    }
  }
});

btnNew.addEventListener('click', startTheGame);
