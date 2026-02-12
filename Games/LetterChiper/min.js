// window.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   e.returnValue = "Save your progress before reload";
// });

document.addEventListener("DOMContentLoaded", () => {
  const levels = {
    0: "THE CODE IS HIDDEN IN PLAIN SIGHT",
    1: "TRUST THE NUMBERS NOT THE NOISE",
    2: "EVERY SYMBOL HAS A PURPOSE",
    3: "DECODE BEFORE TIME RUNS OUT",
    4: "PATTERNS REVEAL THE TRUTH",
    5: "SHIFT YOUR THINKING",
    6: "THE MATRIX NEVER LIES",
    7: "FIND THE MISSING LETTER",
    8: "LOGIC BEATS LUCK",
    9: "THINK IN COORDINATES",
    10: "ROWS AND COLUMNS HOLD THE KEY",
    11: "BREAK THE HIDDEN CIPHER",
    12: "EVERY MOVE MATTERS",
    13: "SECRETS LIVE BETWEEN THE LINES",
    14: "DEEP THINKING WINS",
    15: "UNLOCK THE NEXT PATTERN",
    16: "MASTER THE GRID",
    17: "TIME IS YOUR ENEMY",
    18: "PRECISION OVER SPEED",
    19: "CRACK THE SEQUENCE",
    20: "LET THE LETTERS GUIDE YOU",
    21: "CHAOS HAS STRUCTURE",
    22: "FOLLOW THE HIDDEN PATH",
    23: "THE ANSWER IS SYSTEMATIC",
    24: "READ BETWEEN COORDINATES",
    25: "SOLVE THE UNKNOWN",
    26: "INTELLIGENCE IS POWER",
    27: "SEE WHAT OTHERS MISS",
    28: "LOGIC CREATES ORDER",
    29: "THE GRID REMEMBERS EVERYTHING",
    30: "UNRAVEL THE CODE",
    31: "STRATEGY BEATS GUESSWORK",
    32: "CONTROL THE MATRIX",
    33: "THINK TWO STEPS AHEAD",
    34: "DECISIONS DEFINE VICTORY",
    35: "PATTERN BEFORE ANSWER",
    36: "CONCENTRATION IS KEY",
    37: "BREAK THE LIMIT",
    38: "STRUCTURE BRINGS CLARITY",
    39: "CALCULATE EVERY MOVE",
    40: "THE GRID IS WATCHING",
    41: "DISCOVER THE SYSTEM",
    42: "FIND ORDER IN CHAOS",
    43: "SEQUENCE IS EVERYTHING",
    44: "THINK LIKE A DECODER",
    45: "THE PUZZLE EVOLVES",
    46: "TRACE THE PATTERN",
    47: "THE CODE AWAITS YOU",
    48: "ANALYZE ADAPT ACHIEVE",
    49: "YOU ARE CLOSE TO THE TRUTH",
  };
  let level = 0;
  const total_level = Object.keys(levels).length;
  const letters = "BCDFGHJKLMNPQRSTVWXY".split("");
  let gameOver = true;
  let timer = null;

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function generateLatinMatrix(set) {
    const matrix = [];
    for (let row = 0; row < 5; row++) {
      const newRow = [];
      for (let col = 0; col < 5; col++) {
        newRow.push(set[(row + col) % 5]);
      }
      matrix.push(newRow);
    }
    return matrix;
  }

  function createAllMatrices() {
    const shuffled = shuffle(letters);
    const matrices = [];

    for (let i = 0; i < 4; i++) {
      const group = shuffled.slice(i * 5, i * 5 + 5);
      matrices.push(generateLatinMatrix(group));
    }

    return matrices;
  }

  function renderInputs(message) {
    const inputBlock = document.querySelector(".input-block");
    inputBlock.innerHTML = "";

    const cleanMessage = message.replace(/\s/g, "");

    for (let i = 0; i < cleanMessage.length; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 3;
      input.inputMode = "numeric";
      input.classList.add("coord-input");

      input.addEventListener("input", (e) => {
        // Allow only digits
        e.target.value = e.target.value.replace(/\D/g, "");

        if (e.target.value.length === 3) {
          const next = e.target.nextElementSibling;
          if (next) next.focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && e.target.value === "") {
          const prev = e.target.previousElementSibling;
          if (prev) prev.focus();
        }
      });

      inputBlock.appendChild(input);
    }
  }

  function startGame() {
    if (!gameOver) return;

    gameOver = false;

    remainingTime = totalTime;
    renderMessage();
    renderInputs(levels[level]);
    updateTimerUI();

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timer);
        timerDisplay.textContent = "Time's Up!";
        endGame();
        return;
      }

      remainingTime--;
      updateTimerUI();
    }, 1000);
  }

  function endGame() {
    gameOver = true;
    clearInterval(timer);
    document.querySelector(".message").innerText = "___ ___ ___ ___";
  }

  function renderMessage() {
    const messageContainer = document.querySelector(".message");
    const newMessage = levels[level];
    if (newMessage == "") return;
    messageContainer.innerText = "";
    messageContainer.innerText = `${newMessage}`;
  }

  const root = document.querySelector("body");
  root.innerHTML = `
  <div class = "container">
  <header>
  <h1>
  Encrypt the message!
  </h1>
  </header>
    <main>
   <section>
   <div class="info">
   <p><span>Level</span>: ${level + 1}/${total_level}</p>
   <p class="time-info"></p>
   </div>

    <div class="game-controls">
    <button id="startBTN">Start Game</button>
    <button id="endBTN">Reset Game</button>
    </div>
    <div>
    <h2>Secret message is:</h2>
    <p class="message">____ ____ _____ _____</p>
    </div>
   </section>

   <section class="input-block"></section>

    <section>
    <div>
    <h2>HINTS:</h2>
    </div>
    <div class="scroll"><div class="matrix"></div></div>
    </section>
    </main>
  </div>
  `;

  document.querySelector("#startBTN").addEventListener("click", startGame);
  document.querySelector("#endBTN").addEventListener("click", endGame);

  let remainingTime = 180;
  const totalTime = 180;

  const timerDisplay = document.querySelector(".time-info");
  timerDisplay.textContent = "Time Left -- / --";

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  function updateTimerUI() {
    timerDisplay.textContent = `Time Left: ${formatTime(remainingTime)} / ${formatTime(totalTime)}`;
  }

  function renderSpecialMatrix() {
    const matrixContainer = document.querySelector(".matrix");
    const vipLetters = "AEIOUZ".split("");

    const wrapper = document.createElement("div");
    wrapper.classList.add("matrix-wrapper", "vip");

    const title = document.createElement("h3");
    title.textContent = "VIP Matrix";
    wrapper.appendChild(title);

    const table = document.createElement("table");
    const tr = document.createElement("tr");

    let index = 100;

    vipLetters.forEach((letter) => {
      const td = document.createElement("td");

      td.innerHTML = `
        <div class="coord">${index}</div>
        <div class="letter">${letter}</div>
      `;

      td.dataset.code = index;
      index++;

      tr.appendChild(td);
    });

    table.appendChild(tr);
    wrapper.appendChild(table);
    matrixContainer.appendChild(wrapper);
  }

  function renderMatrices() {
    const matrixContainer = document.querySelector(".matrix");
    const matrices = createAllMatrices();

    matrixContainer.innerHTML = "";

    matrices.forEach((matrix, matrixIndex) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("matrix-wrapper");

      const title = document.createElement("h3");
      title.textContent = `Matrix ${matrixIndex + 1}`;
      wrapper.appendChild(title);

      const table = document.createElement("table");

      matrix.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");

        row.forEach((cell, colIndex) => {
          const td = document.createElement("td");

          const uniqueNumber = matrixIndex * 25 + (rowIndex * 5 + colIndex);

          td.innerHTML = `
            <div class="coord">${uniqueNumber.toString().padStart(2, "0")}</div>
            <div class="letter">${cell}</div>
          `;

          td.dataset.code = uniqueNumber;
          tr.appendChild(td);
        });

        table.appendChild(tr);
      });

      wrapper.appendChild(table);
      matrixContainer.appendChild(wrapper);
    });
  }

  renderMatrices();
  renderSpecialMatrix();
  renderInputs(levels[level]);
});
