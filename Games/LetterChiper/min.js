// window.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   e.returnValue = "Save your progress before reload";
// });

document.addEventListener("DOMContentLoaded", () => {
  const levels = {
    0: "WELCOME",
    1: "THE CODE IS HIDDEN IN PLAIN SIGHT",
    2: "TRUST THE NUMBERS NOT THE NOISE",
    3: "EVERY SYMBOL HAS A PURPOSE",
    4: "DECODE BEFORE TIME RUNS OUT",
    5: "PATTERNS REVEAL THE TRUTH",
    6: "SHIFT YOUR THINKING",
    7: "THE MATRIX NEVER LIES",
    8: "FIND THE MISSING LETTER",
    9: "LOGIC BEATS LUCK",
    10: "THINK IN COORDINATES",
    11: "ROWS AND COLUMNS HOLD THE KEY",
    12: "BREAK THE HIDDEN CIPHER",
    13: "EVERY MOVE MATTERS",
    14: "SECRETS LIVE BETWEEN THE LINES",
    15: "DEEP THINKING WINS",
    16: "UNLOCK THE NEXT PATTERN",
    17: "MASTER THE GRID",
    18: "TIME IS YOUR ENEMY",
    19: "PRECISION OVER SPEED",
    20: "CRACK THE SEQUENCE",
    21: "LET THE LETTERS GUIDE YOU",
    22: "CHAOS HAS STRUCTURE",
    23: "FOLLOW THE HIDDEN PATH",
    24: "THE ANSWER IS SYSTEMATIC",
    25: "READ BETWEEN COORDINATES",
    26: "SOLVE THE UNKNOWN",
    27: "INTELLIGENCE IS POWER",
    28: "SEE WHAT OTHERS MISS",
    29: "LOGIC CREATES ORDER",
    30: "THE GRID REMEMBERS EVERYTHING",
    31: "UNRAVEL THE CODE",
    32: "STRATEGY BEATS GUESSWORK",
    33: "CONTROL THE MATRIX",
    34: "THINK TWO STEPS AHEAD",
    35: "DECISIONS DEFINE VICTORY",
    36: "PATTERN BEFORE ANSWER",
    37: "CONCENTRATION IS KEY",
    38: "BREAK THE LIMIT",
    39: "STRUCTURE BRINGS CLARITY",
    40: "CALCULATE EVERY MOVE",
    41: "THE GRID IS WATCHING",
    42: "DISCOVER THE SYSTEM",
    43: "FIND ORDER IN CHAOS",
    44: "SEQUENCE IS EVERYTHING",
    45: "THINK LIKE A DECODER",
    46: "THE PUZZLE EVOLVES",
    47: "TRACE THE PATTERN",
    48: "THE CODE AWAITS YOU",
    49: "ANALYZE ADAPT ACHIEVE",
    50: "YOU ARE CLOSE TO THE TRUTH",
  };
  
  const total_level = Object.keys(levels).length;
  const letters = "BCDFGHJKLMNPQRSTVWXY".split("");
  let gameOver = true;
  let timer = null;

  let level = 0;

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    user = {
      id: "user",
      progress: [],
    };
  } else {
    if (user.progress.length > 0) {
      const highestLevel = Math.max(...user.progress.map((p) => p.level));

      level = highestLevel + 1;
      console.log(user)
    }
  }

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
        e.target.value = e.target.value.replace(/\D/g, "");

        const code = e.target.value;

        if (code.length <= 1) {
          e.target.style.color = "red";
          return;
        } else if (code.length > 3) e.target.style.color = "red";

        const matchedLetter = document.querySelector(
          `.letter[data-code="${parseInt(code)}"]`,
        );

        if (matchedLetter) {
          const letter = highlightLetter(code);
          console.log(letter.innerText);
          if (letter && letter.innerText === cleanMessage[i]) {
            e.target.style.color = "rgb(67 255 0)";
            const next = e.target.nextElementSibling;
            if (next) next.focus();

            checkCompletion(cleanMessage);
          } else {
            e.target.style.color = "red";
          }
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

  function checkCompletion(cleanMessage) {
    const inputs = document.querySelectorAll(".coord-input");

    let decoded = "";

    inputs.forEach((input) => {
      const code = input.value;

      if (code.length < 2) return;

      const matchedLetter = document.querySelector(
        `.letter[data-code="${parseInt(code)}"]`,
      );

      if (matchedLetter) {
        decoded += matchedLetter.innerText;
      }
    });

    if (decoded === cleanMessage) {
      gameClear();
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

    remainingTime = totalTime;
    timerDisplay.textContent = "Time Left -- / --";

    document.querySelector(".message").innerText = "____ ____ _____ _____";

    document.querySelector(".input-block").innerHTML = "";
  }

  function gameClear() {
    const inputs = document.querySelectorAll(".coord-input");

    clearInterval(timer);

    let recordTime = totalTime - remainingTime;
    recordTime = formatTime(recordTime);

    remainingTime = totalTime;
    timerDisplay.textContent = "Time Left -- / --";

    let encryptedMessage = "";

    inputs.forEach((input) => {
      encryptedMessage += `${input.value} `;
    });

    document.querySelector(".message").textContent = encryptedMessage;
    document.querySelector(".input-block").innerHTML =
      `<p style="color: rgb(67 255 0);">Level Completed!</p>`;

    const newData = {
      level: level,
      original_message: levels[level],
      encrypted_message: encryptedMessage.trim(),
      time: recordTime,
      completed_at: new Date().toISOString(),
    };

    const existingIndex = user.progress.findIndex((p) => p.level === level);

    if (existingIndex !== -1) {
      user.progress[existingIndex] = { ...newData };
    } else {
      user.progress.push(newData);
    }

    localStorage.setItem("user", JSON.stringify(user));

    gameOver = true;
    setTimeout(() => {
      document.querySelector(".input-block").innerHTML = "";
      document.querySelector(".message").textContent = "";
      level += 1;
    }, 3000);
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
   <p><span>Level</span>: <span class="level_info"></span></p>
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
  document.querySelector(".level_info").innerText=`${level} / ${total_level}`
  
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
        <div class="coord" data-code="${index}">${index}</div>
        <div class="letter" data-code="${index}">${letter}</div>
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
            <div class="coord" data-code="${uniqueNumber}">${uniqueNumber.toString().padStart(2, "0")}</div>
            <div class="letter" data-code="${uniqueNumber}">${cell}</div>
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

  function highlightLetter(code) {
    document
      .querySelectorAll(".letter")
      .forEach((el) => el.classList.remove("active"));

    const matchedLetter = document.querySelector(
      `.letter[data-code="${code}"]`,
    );

    if (matchedLetter) {
      matchedLetter.classList.add("active");
    }
    return matchedLetter;
  }

  renderMatrices();
  renderSpecialMatrix();
});
