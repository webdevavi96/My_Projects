const score = document.querySelector(".score");
const highScore = document.querySelector(".high-score");
let _score = 0;
let prevScore = 0;
score.innerText = `Your Score: ${_score}`;
highScore.innerText = `Your High Score: ${0}`;

prevScore = localStorage.getItem("high-score");
if (prevScore) highScore.innerText = `Your High Score: ${prevScore}`;

function updateScore(_score) {
  score.innerText = `Your score: ${_score}`;
  x = Math.max(0, Math.min(cs.width - size, x));
  y = Math.max(0, Math.min(cs.height - size, y));
}

function drawGame() {
  if (_gameOver) return;
  ctx.clearRect(0, 0, cs.width, cs.height);

  ctx.fillStyle = "red";
  for (const segment of snake) {
    ctx.fillRect(segment.x, segment.y, size, size);
  }

  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x, food.y, size, size);
}

function setDirection(xDir, yDir) {
  if (_gameOver) return;
  if (dx === -xDir && dy === -yDir) return;
  dx = xDir;
  dy = yDir;
}

function spawnFood() {
  do {
    food.x = Math.floor(Math.random() * (cs.width / size)) * size;
    food.y = Math.floor(Math.random() * (cs.height / size)) * size;
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
}

function update() {
  if (_gameOver) return;
  if (dx === 0 && dy === 0) return;

  const newHead = {
    x: x + dx,
    y: y + dy,
  };

  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= cs.width ||
    newHead.y >= cs.height
  ) {
    gameOver();
    return;
  }

  if (snake.some((e) => e.x === newHead.x && e.y === newHead.y)) {
    gameOver();
    return;
  }

  newHead.x = Math.max(0, Math.min(cs.width - size, newHead.x));
  newHead.y = Math.max(0, Math.min(cs.height - size, newHead.y));

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    _score++;
    updateScore(_score);
    spawnFood();
  } else {
    snake.pop();
  }

  x = newHead.x;
  y = newHead.y;
}

function gameOver() {
  _gameOver = true;

  dx = 0;
  dy = 0;
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, cs.width, cs.height);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", cs.width / 2, cs.height / 2);
  ctx.fillText("Refresh to restart", cs.width / 2, cs.height / 2 + 30);

  localStorage.setItem("high-score", _score);
}

const cs = document.querySelector("#canvas");
ctx = cs.getContext("2d");

const speed = 5;
const size = 5;
let x = 100;
let y = 100;
let dx = 0;
let dy = 0;

/* Game Controls */
const topButton = document.querySelector(".btn1");
const leftButton = document.querySelector(".btn2");
const rightButton = document.querySelector(".btn3");
const downButton = document.querySelector(".btn4");
let _gameOver = false;
let snake = [{ x: x, y: y }];

let food = {
  x: Math.floor(Math.random() * (cs.width / size)) * size,
  y: Math.floor(Math.random() * (cs.height / size)) * size,
};

topButton.addEventListener("click", (e) => {
  setDirection(0, -speed);
  updateScore(_score);
});

leftButton.addEventListener("click", (e) => {
  setDirection(-speed, 0);
  updateScore(_score);
});

rightButton.addEventListener("click", (e) => {
  setDirection(speed, 0);
  updateScore(_score);
});

downButton.addEventListener("click", (e) => {
  setDirection(0, speed);
  updateScore(_score);
});

window.addEventListener("keydown", (e) => {
  if (e.code == "ArrowUp") {
    setDirection(0, -speed);
    updateScore(_score);
  } else if (e.code == "ArrowDown") {
    setDirection(0, speed);
    updateScore(_score);
  } else if (e.code == "ArrowLeft") {
    setDirection(-speed, 0);
    updateScore(_score);
  } else if (e.code == "ArrowRight") {
    setDirection(speed, 0);
    updateScore(_score);
  } else return;
});

let lastTime = 0;
const STEP = 100; // ms (increase = slower snake)

function loop(time) {
  if (time - lastTime > STEP) {
    update();
    lastTime = time;
  }
  drawGame();
  requestAnimationFrame(loop);
}

loop(0);
