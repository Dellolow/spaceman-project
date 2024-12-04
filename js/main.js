/*-------------- Constants -------------*/
const SPRITE_WIDTH = 504; // Width of each frame in the filmstrip
const TOTAL_FRAMES = 6; // Total number of frames in the filmstrip
const WORDBANK = ['PLUTO', 'MARS', 'COMET', 'BIGBANG', 'NEBULA', 'EARTH', 'STARS']; // Word bank

/*---------- Variables (state) ---------*/
let selectedWord; // The word to guess
let displayedWord; // The word as shown to the player
let wrongGuesses;   // Incorrect guesses

/*----- Cached Element References  -----*/
const spacemanEl = document.getElementById('spaceman');
const wordDisplayEl = document.getElementById('word-display');
const wrongLettersEl = document.getElementById('wrong-letters');
const letterButtonsContainer = document.getElementById('letter-btns');
const resetButton = document.getElementById('reset-button');

/*----------- Event Listeners ----------*/
resetButton.addEventListener('click', init);
letterButtonsContainer.addEventListener('click', handleGuess);


/*-------------- Functions -------------*/
function render() {
  spacemanEl.style.backgroundPositionX = `-${SPRITE_WIDTH * (6 - wrongGuesses.length)}px`;
  wordDisplayEl.textContent = displayedWord;
}
// Start a new game
function init() {
    // Reset state
    wrongGuesses = [];
    selectedWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)].toUpperCase();
    displayedWord = '_'.repeat(selectedWord.length);
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


// Check if the game is won or lost
function checkGameStatus() {
    if (displayedWord.replace(/ /g, '') === selectedWord) {
        alert('You saved the spaceman! You win!');
        disableAllButtons();
    } else if (wrongGuesses.length >= TOTAL_FRAMES) {
        alert(`Game over! The word was "${selectedWord}".`);
        disableAllButtons();
    }
}

// Disable all letter buttons
function disableAllButtons() {
    document.querySelectorAll('#letters button').forEach(button => {
        button.disabled = true;
    });
}


/*---------- Initialize Game -----------*/
init();
