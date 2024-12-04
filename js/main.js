/*-------------- Constants -------------*/
const SPRITE_WIDTH = 504; // Width of each frame in the filmstrip
const TOTAL_FRAMES = 6; // Total number of frames in the filmstrip
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Letters available for guessing
const WORDBANK = ['pluto', 'mars', 'comet', 'bigbang', 'nebula', 'earth', 'stars']; // Word bank

/*---------- Variables (state) ---------*/
let selectedWord; // The word to guess
let displayedWord; // The word as shown to the player
let wrongGuesses = []; // Incorrect guesses
let correctGuesses = []; // Correctly guessed letters

/*----- Cached Element References  -----*/
const spacemanEl = document.getElementById('spaceman');
const wordDisplayEl = document.getElementById('word-display');
const wrongLettersEl = document.getElementById('wrong-letters');
const letterButtonsContainer = document.getElementById('letters');
const resetButton = document.getElementById('reset-button');

/*-------------- Functions -------------*/
function render() {
  spacemanEl.style.backgroundPositionX = `-${SPRITE_WIDTH * (6 - wrongGuesses.length)}px`;
}
// Start a new game
function startGame() {
    // Reset state
    wrongGuesses = [];
    correctGuesses = [];
    selectedWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)].toUpperCase();
    displayedWord = '_ '.repeat(selectedWord.length).trim();

    // Update UI
    wordDisplayEl.textContent = displayedWord;
    // wrongLettersEl.textContent = '';
    spacemanEl.style.backgroundPositionX = '0px'; // Reset spaceman to the first frame
    generateLetterButtons();
}

// Generate letter buttons dynamically
function generateLetterButtons() {
    // letterButtonsContainer.innerHTML = '';
    LETTERS.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        // letterButtonsContainer.appendChild(button);
    });
}

// Handle a letter guess
function handleGuess(letter, button) {
    button.disabled = true; // Disable the button after use
    if (selectedWord.includes(letter)) {
        correctGuesses.push(letter);
        updateDisplayedWord();
    } else {
        wrongGuesses.push(letter);
        wrongLettersEl.textContent = wrongGuesses.join(', ');
        updateSpacemanFrame();
    }
    checkGameStatus();
}

// Update displayed word with correct guesses
function updateDisplayedWord() {
    displayedWord = selectedWord
        .split('')
        .map(letter => (correctGuesses.includes(letter) ? letter : '_'))
        .join(' ');
    wordDisplayEl.textContent = displayedWord;
}

// Update the spaceman frame for each incorrect guess
function updateSpacemanFrame() {
    spacemanEl.style.backgroundPositionX = `${-SPRITE_WIDTH * wrongGuesses.length}px`;
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

/*----------- Event Listeners ----------*/
resetButton.addEventListener('click', startGame);

/*---------- Initialize Game -----------*/
startGame();
