const homePage = document.querySelector('#home-page');
const gamePage = document.querySelector('#game-page');
const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const learningPrompt = document.getElementById('learning-prompt');
const tapSound = document.getElementById('tap-sound');
const scoreSound = document.getElementById('score-sound');
const wrongSound = document.getElementById('wrong-sound');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const gridContainer = document.getElementById('grid-container');
const gridSizeButtons = document.querySelectorAll('.grid-size-btn');
const soundFolderPath = 'sounds/';
const homeButton = document.querySelector('#home-button');

const alphabetImages = {
  A: 'images/apple.png',
  B: 'images/banana.png',
  C: 'images/cat.png',
  D: 'images/dog.png',
  E: 'images/elephant.png',
  F: 'images/frog.png',
  G: 'images/giraffe.png',
  H: 'images/horse.png',
  I: 'images/ice-cream.png',
  J: 'images/jelly-fish.png',
  K: 'images/kangaroo.png',
  L: 'images/lion.png',
  M: 'images/monkey.png',
  N: 'images/nose.png',
  O: 'images/orange.png',
  P: 'images/penguin.png',
  Q: 'images/queen.png',
  R: 'images/rainbow.png',
  S: 'images/sun.png',
  T: 'images/tiger.png',
  U: 'images/umbrella.png',
  V: 'images/violin.png',
  W: 'images/watermelon.png',
  X: 'images/x-ray.png',
  Y: 'images/yak.png',
  Z: 'images/zebra.png',
  1: 'images/one.png',
  2: 'images/two.png',
  3: 'images/three.png',
  4: 'images/four.png',
  5: 'images/five.png',
  6: 'images/six.png',
  7: 'images/seven.png',
  8: 'images/eight.png',
  9: 'images/nine.png',
  0: 'images/zero.png',
};

let gridSize = 9; // Default grid size
let score = 0;
let totalTries = 0; // Tracks total clicks
let activeCellIndex = null;
let interval = null;
let currentTask = null;
let gridContent = []; // Stores current cell content (alphabets/numbers)
let easySpeed = 2000;
let intermediateSpeed = 1000;
let hardSpeed = 500;
let gameSpeed;
// let timer; // Tracks the countdown timer
// let timeLeft = 60; // Initial time in seconds (adjust as needed)

// Function to start the timer
// function startTimer() {
//   clearInterval(timer); // Clear any previous timer
//   timeLeft = 60; // Reset timer to 60 seconds (or any desired time)
//   const timerDisplay = document.querySelector('#timer');
//   timerDisplay.textContent = `Time Left: ${timeLeft}s`;

//   timer = setInterval(() => {
//     if (timeLeft > 0) {
//       timeLeft--;
//       timerDisplay.textContent = `Time Left: ${timeLeft}s`;
//     } else {
//       clearInterval(timer);
//       endGame(); // Call game-ending logic
//     }
//   }, 1000);
// }

// // Function to end the game
// function endGame() {
//   clearInterval(interval); // Stop the grid updates
//   clearInterval(timer); // Stop the timer
//   alert(`Game Over! Your final score is: ${score} / ${totalTries}`);
//   resetGame(); // Reset the game state for a new round
// }

homeButton.addEventListener('click', () => {
  // clearInterval(timer); // Stop the timer
  clearInterval(interval); // Stop the game loop
  homePage.style.display = 'block';
  gamePage.style.display = 'none';
  resetGame(); // Reset the game state
});

// Function to reset the game
function resetGame() {
  score = 0;
  totalTries = 0;
  updateScore();
  clearCells();
  // const timerDisplay = document.querySelector('#timer');
  // timerDisplay.textContent = 'Time Left: 0s';
}

// Function to play the corresponding sound
function playSound(content) {
  const audio = new Audio(`${soundFolderPath}${content.toLowerCase()}.mp3`);
  audio.play();
}

function handleCellClick(index) {
  // tapSound.play();
  totalTries++; // Increment total tries
  const cells = document.querySelectorAll('.cell');
  const content = cells[index].textContent;

  if (index === activeCellIndex) {
    score++;
    // scoreSound.play();
    playSound(content);

    // Remove content after matched
    cells[index].textContent = '';

    // Set background image based on the alphabet
    if (alphabetImages[content]) {
      cells[index].style.backgroundImage = `url('${alphabetImages[content]}')`;
      cells[index].style.backgroundSize = 'cover'; // Ensure the image covers the cell
      cells[index].style.backgroundPosition = 'center';
      cells[index].style.backgroundRepeat = 'no-repeat';
    }

    // Clear the background after a delay
    setTimeout(() => {
      cells[index].style.backgroundImage = '';
      cells[index].textContent = ''; // Clear the cell content
    }, gameSpeed / 2); // Adjust the delay as needed

    // Correct cell animation
    cells[index].classList.add('correct');
    setTimeout(() => cells[index].classList.remove('correct'), gameSpeed / 2);

    // Clear the interval to prevent overlap and trigger the next immediately
    // clearInterval(interval);
    // populateGridWithActiveContent();
    // startGame(gameSpeed); // Resume the game with the current speed
  } else {
    wrongSound.play();
  }
  updateScore();
}

// Learning tasks
const tasks = {
  easy: ['Tap the yellow square!', 'Tap the yellow square!'],
  intermediate: ['Tap the yellow square!', 'Tap the yellow square!'],
  hard: ['Tap the yellow square!', 'Tap the yellow square!'],
};

// Update the prompt and assign tasks
function updateLearningTask(difficulty) {
  const taskIndex = Math.floor(Math.random() * tasks[difficulty].length);
  currentTask = tasks[difficulty][taskIndex];
  learningPrompt.textContent = currentTask;

  // Example: For numbers, assign numeric values to cells
  if (difficulty !== 'easy') {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = index % 9; // Assign numbers
    });
  }
}

// Modify difficulty buttons to include learning tasks

// Function to start the game with the selected difficulty
difficultyButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const level = e.target.dataset.level;

    // Show the game page and hide the home page
    homePage.style.display = 'none';
    gamePage.style.display = 'block';

    // Start the game with the selected difficulty
    if (level === 'easy') {
      updateLearningTask('easy');
      // startTimer(); // Start the timer
      startGame(easySpeed);
    } else if (level === 'intermediate') {
      updateLearningTask('intermediate');
      startGame(intermediateSpeed); // Intermediate speed
    } else if (level === 'hard') {
      updateLearningTask('hard');
      startGame(hardSpeed); // Hard speed
    }
    populateGridWithActiveContent(); // Populate grid with initial content
  });
});

// Function to populate the grid and show content in the active cell only
function populateGridWithActiveContent() {
  const cells = document.querySelectorAll('.cell');

  // Clear the previous active cell
  if (activeCellIndex !== null) {
    cells[activeCellIndex].textContent = ''; // Clear previous content
    cells[activeCellIndex].classList.remove('active');
    cells[activeCellIndex].style.fontSize = ''; // Reset font size
  }

  // Highlight a random active cell
  activeCellIndex = Math.floor(Math.random() * cells.length);
  activateCellWithContent(cells[activeCellIndex]);
}

function activateCellWithContent(activeCell) {
  // Populate the active cell with content
  activeCell.textContent = randomContent();

  // Dynamically adjust the font size to fit the box
  activeCell.style.fontSize = 'calc(1.5rem + 2vw)';
  activeCell.classList.add('active');
}

// Generate random content (number or alphabet) for the active cell
function randomContent() {
  const randomChoice = Math.random() > 0.5 ? 'number' : 'alphabet';
  const content =
    randomChoice === 'number'
      ? Math.floor(Math.random() * 10) // Random number (0-9)
      : alphabet[Math.floor(Math.random() * alphabet.length)]; // Random alphabet
  return content;
}

// Function to clear all cells and reset their state
function clearCells() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.textContent = ''; // Clear content
    cell.classList.remove('active');
    cell.style.fontSize = ''; // Reset font size
  });
}

// Function to start the interval
function startInterval(speed = 2000) {
  if (interval) clearInterval(interval); // Clear any existing interval
  // clearCells();

  interval = setInterval(() => {
    populateGridWithActiveContent();
  }, speed);
}

// Function to create a dynamic grid
function createGrid(size) {
  gridContainer.innerHTML = ''; // Clear the existing grid
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Generate grid cells
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(i));
    gridContainer.appendChild(cell);
  }
}

// Event listener to update grid size dynamically
gridSizeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    resetGame();
    const gridSize = parseInt(e.target.dataset.size);
    activeCellIndex = Math.floor(Math.random() * gridSize);
    createGrid(gridSize);
    populateGridWithActiveContent(); // Populate grid with initial content
  });
});

// Start the game
function startGame(speed) {
  gameSpeed = speed;
  if (interval) clearInterval(interval); // Clear any existing interval
  score = 0;
  updateScore();
  createGrid(4);

  interval = setInterval(() => {
    const cells = document.querySelectorAll('.cell');
    // Clear the previous active cell
    if (activeCellIndex !== null) {
      cells[activeCellIndex].textContent = '';
      cells[activeCellIndex].classList.remove('active');
    }
    // Activate a new random cell
    activeCellIndex = Math.floor(Math.random() * cells.length);
    cells[activeCellIndex].classList.add('active');
    activateCellWithContent(cells[activeCellIndex]);
  }, speed);
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score} / Total: ${totalTries}`;
}

// Show motivational messages
function showMotivation(message) {
  const prompt = document.createElement('div');
  prompt.textContent = message;
  prompt.style.position = 'fixed';
  prompt.style.top = '50%';
  prompt.style.left = '50%';
  prompt.style.transform = 'translate(-50%, -50%)';
  prompt.style.background = '#ffb703';
  prompt.style.padding = '20px';
  prompt.style.borderRadius = '10px';
  prompt.style.fontSize = '1.5rem';
  prompt.style.color = '#000';
  document.body.appendChild(prompt);

  setTimeout(() => {
    prompt.remove();
  }, 2000);
}

// Call this function after a correct tap
// showMotivation(`Great! You tapped '${gridContent[activeCellIndex]}'`);

// Initialize game
createGrid(4);
