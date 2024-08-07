document.addEventListener("DOMContentLoaded", () => {
  let ball = document.getElementById("ball");
  let table = document.getElementById("table");
  let paddle = document.getElementById("paddle");
  let scoreDisplay = document.getElementById("score");
  let gameOverDisplay = document.getElementById("game-over");
  let finalScoreDisplay = document.getElementById("final-score");
  let restartButton = document.getElementById("restart-button");

  let ballX = 10; // Distance from left of the table
  let ballY = 10; // Distance from top of the table
  let dx = 2; // Displacement in x
  let dy = 2; // Displacement in y
  let score = 0;
  let interval = null;
  let gameEnded = false; // Flag to check if the game has ended

  ball.style.top = `${ballY}px`;
  ball.style.left = `${ballX}px`;

  function startGame() {
    gameEnded = false;
    interval = setInterval(function () {
      ballX += dx;
      ballY += dy;
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;

      if (
        ballX < paddle.offsetLeft + paddle.offsetWidth &&
        ballY > paddle.offsetTop &&
        ballY < paddle.offsetTop + paddle.offsetHeight
      ) {
        dx *= -1;
        score++;
        scoreDisplay.textContent = ` ${score}`;
        dx *= 1.1; // Increase speed
        dy *= 1.1; // Increase speed
      }

      if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) {
        dx *= -1;
      }
      if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) {
        dy *= -1;
      }

      if (ballX <= 0) {
        clearInterval(interval);
        gameOverDisplay.style.display = "flex";
        finalScoreDisplay.textContent = score;
        gameEnded = true;
      }
    }, 10);
  }

  startGame();

  let paddleY = 0;
  let pdy = 10; // Paddle displacement in y direction

  document.addEventListener("keydown", (event) => {
    if (gameEnded) return; // Stop the paddle from moving if the game has ended
    event.preventDefault(); // To prevent default behaviour of arrow keys
    if (
      event.keyCode === 40 &&
      paddleY < table.offsetHeight - paddle.offsetHeight
    ) {
      // Down arrow
      paddleY += pdy;
    } else if (event.keyCode === 38 && paddleY > 0) {
      // Up arrow
      paddleY -= pdy;
    }
    paddle.style.top = `${paddleY}px`;
  });

  document.addEventListener("mousemove", (event) => {
    if (gameEnded) return; // Stop the paddle from moving if the game has ended
    let mouseDistFromTop = event.clientY;
    let distOfTableFromTop = table.offsetTop;
    let mousePointControl =
      mouseDistFromTop - distOfTableFromTop - paddle.offsetHeight / 2;
    paddleY = mousePointControl;

    if (paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight) {
      return;
    } // If bottom of the paddle touches bottom of the table, return

    paddle.style.top = `${paddleY}px`;
  });

  restartButton.addEventListener("click", () => {
    ballX = 10;
    ballY = 10;
    dx = 2;
    dy = 2;
    score = 0;
    scoreDisplay.textContent = `${score}`;
    gameOverDisplay.style.display = "none";
    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;
    startGame();
  });
});
