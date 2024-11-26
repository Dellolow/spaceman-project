/*----- constants -----*/
// Define any constants that remain the same throughout the game.
// For example, the number of maximum guesses, or a set of test words.
const MAX_GUESSES = 6;
const WORDS = ["SPACEMAN", "JAVASCRIPT", "CODING", "PROGRAMMER"];

/*----- state variables -----*/
// Declare the state variables to track the game's current state.
let word;             // The word to be guessed
let guessedLetters;   // Array of guessed letters
let remainingGuesses; // Number of incorrect guesses remaining

/*----- cached elements  -----*/
// Cache references to DOM elements that will be updated frequently.
const wordDisplayEl = document.getElementById("word-display");
const remainingGuessesEl = document.getElementById("remaining-guesses");
const guessedLettersEl = document.getElementById("guessed-letters");
const letterButtons = document.querySelectorAll("#letter-buttons button");
const restartButton = document.getElementById("restart-game");

/*----- event listeners -----*/
// Add event listeners to the buttons for interactivity.
letterButtons.forEach(button => {
  button.addEventListener("click", handleLetterGuess);
});

restartButton.addEventListener("click", initialize);

/*----- functions -----*/

/**
 * Initialize the game state and render the initial UI.
 */
function initialize() {
  // Randomly pick a word from the WORDS array
  word = WORDS[Math.floor(Math.random() * WORDS.length)];

  // Reset state variables
  guessedLetters = [];
  remainingGuesses = MAX_GUESSES;

  // Render the initial game state
  render();
}

/**
 * Handle the user guessing a letter.
 * @param {Event} evt - The event triggered by clicking a letter button.
 */
function handleLetterGuess(evt) {
  const guessedLetter = evt.target.textContent;

  // Disable the button to prevent re-guessing the same letter
  evt.target.disabled = true;

  // Check if the guessed letter is in the word
  if (word.includes(guessedLetter)) {
    guessedLetters.push(guessedLetter);
  } else {
    remainingGuesses--;
  }

  // Re-render the UI to reflect the new game state
  render();

  // Check for win/loss conditions
  checkGameStatus();
}

/**
 * Render the game's current state to the DOM.
 */
function render() {


// Kick off the app by calling initialize
initialize();
