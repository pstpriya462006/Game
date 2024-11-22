// Game variables to track scores, rounds, and state
let playerScore = 0; // Tracks the player's score
let computerScore = 0; // Tracks the computer's score
let currentRound = 0; // Current round number
const totalRounds = 5; // Total number of rounds in the game
let playerName = "Player"; // Default player name
let isGameOver = false; // Flag to track game state
let timerInterval; // Reference for the timer interval
let timeLeft = 5; // Timer countdown value in seconds

// Rules dictionary for game logic (what beats what)
const rules = {
  rock: { scissors: "crushes" },
  paper: { rock: "covers" },
  scissors: { paper: "cuts" },
};

// DOM Elements
const message = document.getElementById("message"); // Displays status messages
const outcome = document.getElementById("outcome"); // Describes round results
const score = document.getElementById("score"); // Displays scores
const roundInfo = document.getElementById("round-info"); // Shows current round info
const progressBar = document.getElementById("progress"); // Progress bar visual
const timeLeftElement = document.getElementById("time-left"); // Timer display
const restartButton = document.getElementById("restart"); // Restart button

// Update player name dynamically
document.getElementById("player-name").addEventListener("input", (e) => {
  playerName = e.target.value || "Player"; // Default to "Player" if input is empty
  console.log(`Player name updated: ${playerName}`); // Debugging
});

// Toggle between light and dark themes
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  console.log("Theme toggled."); // Debugging
});

// Attach click handlers to choice buttons
document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => handlePlayerChoice(button.id));
});

// Restart button functionality
restartButton.addEventListener("click", restartGame);

// Handles player choice and updates the game state
function handlePlayerChoice(playerChoice) {
  if (isGameOver) return; // Ignore input if the game is over

  clearInterval(timerInterval); // Stop the timer for the current round
  playGame(playerChoice); // Process the player's choice
  if (currentRound <= totalRounds) startTimer(); // Restart timer for next round if game continues
}

// Main game logic: evaluates the outcome of a round
function playGame(playerChoice) {
  const computerChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
  console.log(`Player: ${playerChoice}, Computer: ${computerChoice}`); // Debugging

  if (playerChoice === computerChoice) {
    message.textContent = "It's a draw!";
    outcome.textContent = `${playerChoice} ties with ${computerChoice}`;
  } else if (rules[playerChoice][computerChoice]) {
    message.textContent = "You win!";
    outcome.textContent = `${playerChoice} ${rules[playerChoice][computerChoice]} ${computerChoice}`;
    playerScore++;
  } else {
    message.textContent = "You lose!";
    outcome.textContent = `${computerChoice} ${rules[computerChoice][playerChoice]} ${playerChoice}`;
    computerScore++;
  }

  updateScore(); // Update scores and round info
}

// Updates the score display and checks for game end
function updateScore() {
  score.textContent = `${playerName}: ${playerScore} | Computer: ${computerScore}`;
  currentRound++;
  progressBar.style.width = `${(currentRound / totalRounds) * 100}%`;
  roundInfo.textContent = `Round: ${currentRound} / ${totalRounds}`;

  if (currentRound > totalRounds) endGame(); // End the game if rounds exceed limit
}

// Ends the game and displays the final result
function endGame() {
  isGameOver = true;
  message.textContent = playerScore > computerScore ? `${playerName} Wins! 🎉` : "Computer Wins! 😞";
  outcome.textContent = "Game over! Click Restart to play again.";
  restartButton.disabled = false;
  console.log("Game over."); // Debugging
}

// Resets the game state to start a new game
function restartGame() {
  console.log("Game restarted."); // Debugging
  playerScore = 0;
  computerScore = 0;
  currentRound = 0;
  isGameOver = false;
  message.textContent = "Make your choice!";
  outcome.textContent = "";
  score.textContent = `${playerName}: 0 | Computer: 0`;
  progressBar.style.width = "0%";
  roundInfo.textContent = `Round: 0 / ${totalRounds}`;
  restartButton.disabled = true;
  startTimer(); // Restart the timer
}

// Starts a countdown timer for each round
function startTimer() {
  console.log("Timer started."); // Debugging
  timeLeft = 5;
  timeLeftElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval); // Stop the timer when time's up
      message.textContent = "Time's up! Computer wins this round.";
      computerScore++;
      updateScore();

      if (!isGameOver) startTimer(); // Restart timer if game continues
    }
  }, 1000);
}

// Initialize the first timer when the page loads
startTimer();
