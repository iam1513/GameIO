// Constants and Variables

const board = document.getElementById("board");
let highScoreBox = document.getElementById("highScoreBox");
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("sounds/food.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");
const backgroundMusic = new Audio("sounds/bgm.mp3");
const moveSound = new Audio("sounds/move.mp3");

let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 13 }]; // Initial position of snake
food = generateFoodPosition(); // Generate initial position for food

// backgroundMusic.play();
function playBackgroundMusic() {
  try {
    backgroundMusic.play();
  } catch (error) {
    console.error("Failed to play background music:", error);
  }
}

// Generate a random position for the food
function generateFoodPosition() {
  let a = 0; // Adjusted lower limit to allow food to appear at the border
  let b = 17; // Adjusted upper limit to allow food to appear at the border
  let x = Math.round(a + (b - a) * Math.random());
  let y = Math.round(a + (b - a) * Math.random());

  // Ensure the food does not appear on the snake's position
  for (let i = 0; i < snakeArr.length; i++) {
    if (x === snakeArr[i].x && y === snakeArr[i].y) {
      // If food position coincides with the snake, generate a new position
      return generateFoodPosition();
    }
  }

  return { x, y };
}

// It is the main function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

// Function for collision
function isCollision(snake) {
  // If snake bumps into itself.
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If snake bumps into the wall.
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

// Function to handle game engine
function gameEngine() {
  // If snake collides
  if (isCollision(snakeArr)) {
    gameOverSound.play();
    backgroundMusic.play();
    const myTimeout = setTimeout(soundpause, 5000);
    function soundpause() {
      gameOverSound.pause();
    }

    inputDir = { x: 0, y: 0 };
    alert("Game Over! , Press any key to play again. ");
    snakeArr = [{ x: 10, y: 13 }];
    backgroundMusic.play();
    score = 0;
  }

  // If snake eats the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("High Score", JSON.stringify(highscoreval));
      highScoreBox.innerHTML = "High Score: " + highscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food = generateFoodPosition(); // Generate new position for food
  }

  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display the snake and food
  board.innerHTML = ""; // Clear the board
  // Display the snake
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Game Logic

backgroundMusic.play();
let highscore = localStorage.getItem("High Score");
let highscoreval = 0;
console.log("Retrieved highscore:", highscore);
if (highscore === null || isNaN(parseInt(highscore))) {
  localStorage.setItem("High Score", JSON.stringify(highscoreval));
} else {
  highscoreval = parseInt(highscore);
  console.log("Parsed highscore:", highscoreval);
  highScoreBox.innerHTML = "High Score: " + highscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
