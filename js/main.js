/*-------------- Constants -------------*/
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
conts WORDBANK = ['pluto', 'mars', 'comet', 'bigbang','nebula', 'earth', 'stars']
const SPRITE_WIDTH = 504;
const TOTAL_FRAMES =6;
/*---------- Variables (state) ---------*/
let selectedWord; //The word to guess
let usedLetters = []; // Array to tracked guessed letters
let remainingGuesses; //Number of remaining 
let revealedWord; // String representing the current state of the guessed word.
let curFrame;

/*----- Cached Element References  -----*/
const imgEl = document.querySelector('img');
const filmstripEl = document.getElementById('spaceman-filmstrip');
const btnEls = [...document.querySelectorAll('#btns-container > button')];

const lettersSlotsEl = document.getElementById('board');
const guessedLettersEl = document.getElementById('guessed-letters');
const remainingGuessesEl = document.getElementById('remaining-guesses');
const messageEl = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const letterButtonsEl = document.getElementById('letter-buttons');
const spacemanEl = document.getElementById('spaceman'); //Image container
/*-------------- Functions -------------*/
//Initialize the game
init();

function init() {
  curframe = 0;
  render();
}

function render() {
  imgEl.src = `imgs/spaceman-${curFrame}.png`;
  filmstripEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - curFrame)}px`;
  btnEls.forEach(function(btn) {
    btn.disabled = false;
    btn.style.backgroundColor = 'white';
  });
  btnEls[curFrame].disabled = true;
  btnEls[curFrame].style.backgroundColor = 'palegreen';
}

function handleBtnClick(evt) {
  const btn = evt.target;
  // Ensure that a button was clicked
  if (!btnEls.includes(btn)) return;
  curFrame = parseInt(btn.textContent);
  render();
}


function initGame()[
  //Render the initial game state ...

]

// Render the word with blanks and revealed letters
function renderWord()[

]

function handleGuess(letter) {
  //check if the letter is in the word
  //Update game state (remaining guesses. revealedWord, usedLetters)
  //Render the updated game state 
  //Check for win/lose condition
}

function checkWin() {
  //Compare revealedWord with selectedWord
}

function checkLose(){

}

function resetGame() {

}
/*----------- Event Listeners ----------*/
letterButtonsEl.addEventListener('click', (event) => {
  const clickedLetter= event.target.textContent;
})
document.getElementById('btns-container').addEventListener('click', handleBtnClick);