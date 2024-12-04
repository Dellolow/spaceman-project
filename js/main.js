/*-------------- Constants -------------*/
const SPRITE_WIDTH = 504; // Width of each frame in the filmstrip
const TOTAL_FRAMES = 6; // Total number of frames in the filmstrip
const WORDBANK = ['PLUTO', 'MARS', 'COMET', 'BIGBANG', 'NEBULA', 'EARTH', 'STARS']; // Word bank
const MAX_WRONG_GUESSES = 6;

/*---------- Variables (state) ---------*/
let selectedWord; // The word to guess
let displayedWord; // The word as shown to the player
let wrongGuesses;   // Incorrect guesses

/*----- Cached Element References  -----*/
const spacemanEl = document.getElementById('spaceman');
const wordDisplayEl = document.getElementById('word-display');
const letterButtonsContainer = document.getElementById('letter-btns');
const resetButton = document.getElementById('reset-button');
const letterBtns = document.querySelectorAll('#letter-btns > button');
const msgEl = document.querySelector('p');


/*----------- Event Listeners ----------*/
resetButton.addEventListener('click', init);
letterButtonsContainer.addEventListener('click', handleGuess);

/*---------- Initialize Game -----------*/
init();

/*-------------- Functions -------------*/
function render() {
  spacemanEl.style.backgroundPositionX = `-${SPRITE_WIDTH * (6 - wrongGuesses.length)}px`;
  wordDisplayEl.textContent = displayedWord;
  renderLetterBtns();
  renderMessage();
}

function renderLetterBtns() {
    letterBtns.forEach(function(btn) {
        const letter = btn.innerText;
        if (wrongGuesses.includes(letter)) {
            btn.style.backgroundColor = 'pink';
        } else if (displayedWord.includes(letter)) {
            btn.style.backgroundColor = 'lightgreen';
        } else {
            btn.style.backgroundColor = 'white';
        }
    }); 
}

function renderMessage() {
    if (selectedWord === displayedWord) {
        msgEl.innerText = 'WINNER';
        disabledLetterButtons();
    } else if (wrongGuesses.length === MAX_WRONG_GUESSES) {
        msgEl.innerText = 'LOSER';
        disabledLetterButtons();
    } else {
        msgEl.innerText = `${MAX_WRONG_GUESSES - wrongGuesses.length} INCORRECT GUESSES REMAINING`;
    }
}

function disabledLetterButtons() {
    letterBtns.forEach((btn) => {
        btn.disabled = true;
    });
}

// Start a new game
function init() {
    // Reset state
    wrongGuesses = [];
    selectedWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)].toUpperCase();
    displayedWord = '_'.repeat(selectedWord.length);
    letterBtns.forEach(function(btn) {
        btn.disabled = false; // Re-enable the button
        btn.style.backgroundColor = 'white'; // Reset button style
    });
    render();
}

// Handle a letter guess
// Update all impacted state, then call render
function handleGuess(evt) {
    const letter = evt.target.innerText; 
    if (letter.length !== 1 || wrongGuesses.includes(letter) || displayedWord.includes(letter)) return;
    if (selectedWord.includes(letter)) {
        let newDisplayedWord = '';
        for (i = 0; i < selectedWord.length; i++) {
            newDisplayedWord += selectedWord[i] === letter ? letter : displayedWord[i];  
        }
        displayedWord = newDisplayedWord;
    } else {
        wrongGuesses.push(letter);
    }
    // Gaurd against letter already used or game over or button miss
    render();
}







