const game = document.getElementById('game');
    const paddle1 = document.getElementById('paddle1');
    const paddle2 = document.getElementById('paddle2');
    const ball = document.getElementById('ball');
    const score1Display = document.getElementById('score1');
    const score2Display = document.getElementById('score2');
    const highScoreDisplay = document.getElementById('highScore');

    let paddle1Y = 160;
    let paddle2Y = 160;
    let ballX = 395;
    let ballY = 195;
    let ballSpeedX = 2;
    let ballSpeedY = 2;
    let score1 = 0;
    let score2 = 0;
    let highScore = localStorage.getItem('highScore') || 0;

    highScoreDisplay.textContent = highScore;

    function movePaddles() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'w' && paddle1Y > 0) {
          paddle1Y -= 20;
        } else if (e.key === 's' && paddle1Y < 320) {
          paddle1Y += 20;
        }

        if (e.key === 'ArrowUp' && paddle2Y > 0) {
          paddle2Y -= 20;
        } else if (e.key === 'ArrowDown' && paddle2Y < 320) {
          paddle2Y += 20;
        }

        paddle1.style.top = `${paddle1Y}px`;
        paddle2.style.top = `${paddle2Y}px`;
      });
    }

    function moveBall() {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY <= 0 || ballY >= 390) {
        ballSpeedY = -ballSpeedY;
      }

      if (ballX <= 10 && ballY >= paddle1Y && ballY <= paddle1Y + 80) {
        ballSpeedX = -ballSpeedX;
      }

      if (ballX >= 780 && ballY >= paddle2Y && ballY <= paddle2Y + 80) {
        ballSpeedX = -ballSpeedX;
      }

      if (ballX < 0) {
        score2++;
        resetBall();
      }

      if (ballX > 800) {
        score1++;
        resetBall();
      }

      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;

      updateScores();
    }

    function resetBall() {
      ballX = 395;
      ballY = 195;
      ballSpeedX = -ballSpeedX;
    }

    function updateScores() {
      score1Display.textContent = score1;
      score2Display.textContent = score2;

      const currentHighScore = Math.max(score1, score2);
      if (currentHighScore > highScore) {
        highScore = currentHighScore;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
      }
    }

    function gameLoop() {
      moveBall();
      requestAnimationFrame(gameLoop);
    }

    movePaddles();
    gameLoop();
